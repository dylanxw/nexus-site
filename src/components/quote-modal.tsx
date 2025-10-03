"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  device: z.string().min(1, "Please specify your device"),
  condition: z.string().min(1, "Please describe the condition"),
  issue: z.string().min(5, "Please describe the issue"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      device: "",
      condition: "",
      issue: "",
    },
  });

  async function onSubmit(data: QuoteFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "quote",
          ...data,
        }),
      });

      if (response.ok) {
        toast.success("Quote request submitted! We'll call you with an estimate.");
        form.reset();
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit request");
      }
    } catch {
      toast.error("Failed to submit request. Please call us directly at 940-600-1012.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Tell us about your device and we&apos;ll provide you with an upfront repair estimate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name *
            </label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Your full name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              placeholder="(940) 555-0123"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="device" className="text-sm font-medium">
              Device *
            </label>
            <Input
              id="device"
              {...form.register("device")}
              placeholder="e.g., iPhone 14, MacBook Pro, PlayStation 5"
            />
            {form.formState.errors.device && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.device.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="condition" className="text-sm font-medium">
              Device Condition *
            </label>
            <select
              id="condition"
              {...form.register("condition")}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="">Select condition</option>
              <option value="Excellent">Excellent (works perfectly, minor cosmetic issues)</option>
              <option value="Good">Good (works with some issues)</option>
              <option value="Fair">Fair (major functionality issues)</option>
              <option value="Poor">Poor (doesn&apos;t turn on or major damage)</option>
            </select>
            {form.formState.errors.condition && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.condition.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="issue" className="text-sm font-medium">
              What needs to be repaired? *
            </label>
            <Textarea
              id="issue"
              {...form.register("issue")}
              placeholder="Describe the problem in detail (e.g., cracked screen, won&apos;t charge, water damage)"
              rows={4}
            />
            {form.formState.errors.issue && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.issue.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Submitting..." : "Get Quote"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}