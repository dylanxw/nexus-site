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

const scheduleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  deviceType: z.string().min(1, "Please select a device type"),
  issue: z.string().min(5, "Please describe the issue"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleModal({ open, onOpenChange }: ScheduleModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: "",
      phone: "",
      deviceType: "",
      issue: "",
      preferredTime: "",
    },
  });

  async function onSubmit(data: ScheduleFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "schedule",
          ...data,
        }),
      });

      if (response.ok) {
        toast.success("Appointment request submitted! We'll call you to confirm.");
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
          <DialogTitle>Schedule a Repair</DialogTitle>
          <DialogDescription>
            Fill out the form below and we&apos;ll call you to confirm your appointment.
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
            <label htmlFor="deviceType" className="text-sm font-medium">
              Device Type *
            </label>
            <select
              id="deviceType"
              {...form.register("deviceType")}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="">Select device type</option>
              <option value="iPhone">iPhone</option>
              <option value="Android Phone">Android Phone</option>
              <option value="iPad">iPad</option>
              <option value="Android Tablet">Android Tablet</option>
              <option value="Mac">Mac</option>
              <option value="PC">PC</option>
              <option value="Game Console">Game Console</option>
              <option value="Other">Other</option>
            </select>
            {form.formState.errors.deviceType && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.deviceType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="issue" className="text-sm font-medium">
              What&apos;s the issue? *
            </label>
            <Textarea
              id="issue"
              {...form.register("issue")}
              placeholder="Describe what&apos;s wrong with your device"
              rows={3}
            />
            {form.formState.errors.issue && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.issue.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="preferredTime" className="text-sm font-medium">
              Preferred Time *
            </label>
            <select
              id="preferredTime"
              {...form.register("preferredTime")}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="">Select preferred time</option>
              <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
              <option value="Evening (4 PM - 6 PM)">Evening (4 PM - 6 PM)</option>
              <option value="Anytime">Anytime</option>
            </select>
            {form.formState.errors.preferredTime && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.preferredTime.message}
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
              {isLoading ? "Submitting..." : "Schedule Repair"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}