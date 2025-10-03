"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Monitor, Gamepad2, Watch, HardDrive, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const deviceTypes = [
  { id: "smartphones", label: "Smartphones", icon: Smartphone },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "computer", label: "Computer", icon: Monitor },
  { id: "gaming-system", label: "Gaming System", icon: Gamepad2 },
  { id: "wearables", label: "Wearables", icon: Watch },
  { id: "other", label: "Other", icon: HardDrive },
];

const steps = [
  { number: 1, label: "Type", active: true },
  { number: 2, label: "Make/Model", active: false },
  { number: 3, label: "Repair", active: false },
  { number: 4, label: "Appointment", active: false },
  { number: 5, label: "Confirmation", active: false },
];

const deviceMakes = {
  smartphones: ["Apple", "Samsung", "Motorola", "Google", "LG", "OnePlus", "Other"],
  tablet: ["Apple", "Samsung", "Microsoft", "Amazon", "Lenovo", "Other"],
  computer: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "Other"],
  "gaming-system": ["Sony", "Microsoft", "Nintendo", "Other"],
  wearables: ["Apple", "Samsung", "Fitbit", "Garmin", "Other"],
  other: ["Other"]
};

const deviceModels = {
  Apple: {
    smartphones: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14"],
    tablet: ["iPad Pro 13-inch", "iPad Pro 11-inch", "iPad Air", "iPad", "iPad mini"],
    computer: ["MacBook Pro", "MacBook Air", "iMac", "Mac mini", "Mac Studio", "Mac Pro"]
  },
  Samsung: {
    smartphones: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy Note series", "Galaxy A series", "Galaxy Z Fold", "Galaxy Z Flip"],
    tablet: ["Galaxy Tab S9", "Galaxy Tab S8", "Galaxy Tab A", "Galaxy Tab Active"]
  },
  // Add more models as needed
  Other: {
    smartphones: ["Other Model"],
    tablet: ["Other Model"],
    computer: ["Other Model"],
    "gaming-system": ["Other Model"],
    wearables: ["Other Model"],
    other: ["Other Model"]
  }
};

const damageTypes = [
  { id: "screen-damage", label: "Screen Damage", placeholder: "📱" },
  { id: "battery-drains-fast", label: "Battery Drains Fast", placeholder: "🔋" },
  { id: "charging-issue", label: "Charging Issue", placeholder: "🔌" },
  { id: "rear-camera-issue", label: "Rear Camera Issue", placeholder: "📷" },
  { id: "front-camera-issue", label: "Front Camera Issue (Selfie)", placeholder: "🤳" },
  { id: "rear-camera-lens-damage", label: "Rear Camera Lens Damage", placeholder: "📸" },
  { id: "back-housing-glass-damage", label: "Back Housing / Glass Damage", placeholder: "📱" },
  { id: "water-liquid-damage", label: "Water / Liquid Damage", placeholder: "💧" },
  { id: "other", label: "Other", placeholder: "❓" },
];

// Mock available time slots - in production, this would come from Google Calendar API
const generateTimeSlots = (date: string) => {
  const slots = [
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM",
    "11:30 AM", "11:45 AM", "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM", "2:00 PM", "2:15 PM",
    "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM",
    "5:30 PM", "5:45 PM", "6:00 PM"
  ];

  // Mock logic: remove some random slots to simulate unavailable times
  const unavailableSlots = ["10:15 AM", "11:30 AM", "1:15 PM", "3:00 PM", "4:30 PM"];
  return slots.filter(slot => !unavailableSlots.includes(slot));
};

interface RepairFormProps {
  initialDevice?: string;
  initialBrand?: string;
  initialService?: string;
  initialStep?: number;
  standalone?: boolean;
}

export function RepairForm({ initialDevice = "", initialBrand = "", initialService = "", initialStep = 1, standalone = false }: RepairFormProps = {}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedDevice, setSelectedDevice] = useState<string>(initialDevice);
  const [selectedMake, setSelectedMake] = useState<string>(initialBrand);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedDamages, setSelectedDamages] = useState<string[]>(initialService ? [initialService] : []);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    description: ""
  });
  const [appointmentMode, setAppointmentMode] = useState<"appointment" | "quote">("appointment");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form state when props change
  useEffect(() => {
    if (initialDevice && standalone) {
      setSelectedDevice(initialDevice);
      setCurrentStep(initialStep);
    }
    if (initialBrand && standalone) {
      setSelectedMake(initialBrand);
    }
    if (initialService && standalone) {
      setSelectedDamages([initialService]);
    }
  }, [initialDevice, initialBrand, initialService, initialStep, standalone]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setSelectedMake(""); // Reset make when device changes
    setSelectedModel(""); // Reset model when device changes

    if (!standalone) {
      // Redirect to dedicated form page with selected device
      router.push(`/denton-tx/repair-form?device=${deviceId}`);
    } else {
      // Auto-advance to step 2 when device is selected on standalone page
      setTimeout(() => {
        setCurrentStep(2);
        console.log("Moving to step 2 with device:", deviceId);
      }, 200); // Small delay for visual feedback
    }
  };

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(""); // Reset model when make changes
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    // Auto-advance to step 3 when model is selected
    setTimeout(() => {
      setCurrentStep(3);
      console.log("Moving to step 3 with make/model:", selectedMake, model);
    }, 200);
  };

  const handleDamageToggle = (damageId: string) => {
    setSelectedDamages(prev =>
      prev.includes(damageId)
        ? prev.filter(id => id !== damageId)
        : [...prev, damageId]
    );
  };

  const handleStep3Next = () => {
    if (selectedDamages.length > 0) {
      setCurrentStep(4);
      console.log("Moving to step 4 with damages:", selectedDamages);
    }
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStep4Next = () => {
    const { firstName, lastName, phone, email } = customerInfo;
    if (firstName && lastName && phone && email) {
      setCurrentStep(5);
      console.log("Moving to step 5 with customer info:", customerInfo);
    }
  };

  const submitRepairRequest = async (requestType: 'quote' | 'appointment') => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const deviceLabel = deviceTypes.find(d => d.id === selectedDevice)?.label;

      const requestData = {
        deviceType: deviceLabel || selectedDevice,
        make: selectedMake,
        model: selectedModel,
        issues: selectedDamages,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        email: customerInfo.email,
        description: customerInfo.description,
        requestType,
        ...(requestType === 'appointment' && {
          appointmentDate: selectedDate,
          appointmentTime: selectedTime
        })
      };

      const response = await fetch('/api/repair-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }

      setIsSubmitted(true);
      console.log('Request submitted successfully:', result);

    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDeviceType = () => {
    setCurrentStep(1);
    setSelectedDevice("");
    setSelectedMake("");
    setSelectedModel("");
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.number === currentStep
                    ? 'bg-primary text-white'
                    : step.number < currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span className={`text-xs mt-1 ${
                step.number === currentStep ? 'text-primary font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-16 mx-2 ${
                  step.number < currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <Card className="shadow-xl border-0 w-full">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What type of device needs repair?
          </h2>
          <p className="text-gray-600">
            Select your device type to get started
          </p>
        </div>

        {/* Device Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {deviceTypes.map((device) => {
            const Icon = device.icon;
            const isSelected = selectedDevice === device.id;

            return (
              <div
                key={device.id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
                onClick={() => handleDeviceSelect(device.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <Icon
                    className={`h-12 w-12 ${
                      isSelected ? 'text-primary' : 'text-gray-600'
                    }`}
                  />
                  <span className={`font-semibold text-lg ${
                    isSelected ? 'text-primary' : 'text-gray-700'
                  }`}>
                    {device.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>


      </CardContent>
    </Card>
  );

  const renderStep2 = () => {
    const availableMakes = deviceMakes[selectedDevice as keyof typeof deviceMakes] || [];
    const availableModels = selectedMake && deviceModels[selectedMake as keyof typeof deviceModels]
      ? deviceModels[selectedMake as keyof typeof deviceModels][selectedDevice as keyof typeof deviceModels[keyof typeof deviceModels]] || []
      : [];

    return (
      <Card className="shadow-xl border-0 w-full">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Select Make / Model
            </h2>
            <p className="text-gray-600">
              Choose your device's make and model
            </p>
          </div>


          {/* Make Selection */}
          <div className="mb-6 max-w-md mx-auto">
            <label className="block text-sm font-medium mb-3">
              Select Your Make
            </label>
            <Select value={selectedMake} onValueChange={handleMakeSelect}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Please choose an option" />
              </SelectTrigger>
              <SelectContent>
                {availableMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div className="mb-8 max-w-md mx-auto">
            <label className="block text-sm font-medium mb-3">
              Select Your Model
            </label>
            <Select
              value={selectedModel}
              onValueChange={handleModelSelect}
              disabled={!selectedMake}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Please choose an option" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Choose Another Device Type Link */}
          <div className="text-center">
            <button
              onClick={handleBackToDeviceType}
              className="text-primary hover:text-primary/80 underline text-sm font-medium"
            >
              Choose another device type
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStep3 = () => (
    <Card className="shadow-xl border-0 w-full">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What is the issue with your device?
          </h2>
          <p className="text-gray-600">
            Select all issues that apply to your device
          </p>
        </div>

        {/* Choose another Make/Model Link */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentStep(2)}
            className="text-primary hover:text-primary/80 underline text-sm font-medium"
          >
            Choose another Make/Model
          </button>
        </div>

        {/* Damage Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
          {damageTypes.map((damage) => {
            const isSelected = selectedDamages.includes(damage.id);

            return (
              <div
                key={damage.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
                onClick={() => handleDamageToggle(damage.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {/* Placeholder Image */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    isSelected ? 'bg-primary/20' : 'bg-gray-100'
                  }`}>
                    {damage.placeholder}
                  </div>

                  {/* Label */}
                  <span className={`font-medium text-xs ${
                    isSelected ? 'text-primary' : 'text-gray-700'
                  }`}>
                    {damage.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleStep3Next}
            disabled={selectedDamages.length === 0}
            size="lg"
            className="btn-primary brand-shadow px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => {
    const isFormValid = customerInfo.firstName && customerInfo.lastName &&
                       customerInfo.phone && customerInfo.email;
    const remainingChars = 300 - customerInfo.description.length;

    return (
      <Card className="shadow-xl border-0 w-full">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let Us Fix It!
            </h2>
            <p className="text-gray-600">
              Please provide your contact information to complete your repair request
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">
                  <span className="text-primary">*</span> First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={customerInfo.firstName}
                  onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                  className="mt-2 h-12"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">
                  <span className="text-primary">*</span> Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={customerInfo.lastName}
                  onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                  className="mt-2 h-12"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                <span className="text-primary">*</span> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="mt-2 h-12"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                <span className="text-primary">*</span> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="mt-2 h-12"
                placeholder="Enter your email address"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  <span className="text-primary">*</span> Tell Us About Your Device's Problem
                </Label>
                <span className="text-sm text-primary">
                  {remainingChars} characters left
                </span>
              </div>
              <Textarea
                id="description"
                value={customerInfo.description}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    handleCustomerInfoChange('description', e.target.value);
                  }
                }}
                className="mt-2 min-h-[120px] resize-none"
                placeholder="Please describe the issue with your device in detail..."
              />
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="text-red-600">⚠️</div>
                  <div>
                    <p className="text-red-800 font-medium">Error submitting request</p>
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Display */}
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="text-green-600">✅</div>
                  <div>
                    <p className="text-green-800 font-medium">Request submitted successfully!</p>
                    <p className="text-green-600 text-sm">We'll contact you shortly to discuss your repair.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-center text-sm text-gray-600 mt-6">
              *By submitting this request, I understand that I may receive an email, text or phone call regarding my request. You can unsubscribe at any time.
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleStep4Next}
                disabled={!isFormValid || isSubmitting || isSubmitted}
                size="lg"
                className="btn-primary brand-shadow px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? 'REQUEST SUBMITTED' : 'CONTINUE TO CONFIRMATION'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStep5 = () => {
    const availableTimeSlots = generateTimeSlots(selectedDate);
    const deviceLabel = deviceTypes.find(d => d.id === selectedDevice)?.label;
    const selectedIssues = selectedDamages.map(id =>
      damageTypes.find(d => d.id === id)?.label
    ).join(', ');

    if (appointmentMode === "quote") {
      return (
        <Card className="shadow-xl border-0 w-full">
          <CardContent className="p-8">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAppointmentMode("appointment")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    appointmentMode === "appointment"
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setAppointmentMode("quote")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    appointmentMode === "quote"
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Get Quote Only
                </button>
              </div>
            </div>

            {/* Quote Request Confirmation */}
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Quote Request Submitted!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Thank you for your quote request. We'll review your device information and contact you shortly with an estimate.
              </p>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-lg mb-4">Request Summary:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Device:</span> {deviceLabel}</p>
                  <p><span className="font-medium">Make:</span> {selectedMake}</p>
                  <p><span className="font-medium">Model:</span> {selectedModel}</p>
                  <p><span className="font-medium">Issues:</span> {selectedIssues}</p>
                  <p><span className="font-medium">Name:</span> {customerInfo.firstName} {customerInfo.lastName}</p>
                  <p><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
                  <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                We typically respond to quote requests within 2-4 hours during business hours.
              </p>

              <Button
                onClick={() => {
                  if (!isSubmitting) {
                    submitRepairRequest('quote');
                  }
                }}
                disabled={isSubmitting}
                size="lg"
                className="btn-primary brand-shadow"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUOTE REQUEST'}
              </Button>

              <Button
                onClick={() => setCurrentStep(4)}
                variant="outline"
                size="lg"
                disabled={isSubmitting}
              >
                Back to Contact Info
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="shadow-xl border-0 w-full">
        <CardContent className="p-8">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setAppointmentMode("appointment")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  appointmentMode === "appointment"
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => setAppointmentMode("quote")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  appointmentMode === "quote"
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Get Quote Only
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Make an Appointment
            </h2>
          </div>

          {/* Promotional Banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 text-center">
            <p className="text-primary font-semibold">
              📱 ✚ ❌ Book today and save up to $10 ❌ ✚ 📱
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Date & Time Selection */}
            <div>
              {/* Date Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  When do you want to come in?
                </Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(""); // Reset time when date changes
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12"
                />
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Pick a time
                </Label>
                <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-sm border rounded-lg transition-all ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Appointment Summary */}
            <div className="lg:border-l lg:pl-8">
              <h3 className="font-semibold text-lg mb-6">Appointment</h3>

              {/* Device Details */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Device Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="font-medium">Brand:</span> {selectedMake}</p>
                  <p><span className="font-medium">Device:</span> {selectedModel}</p>
                  <p><span className="font-medium">Issues:</span> {selectedIssues}</p>
                </div>
              </div>

              {/* Location & Time */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Where</h4>
                    <p className="text-sm text-gray-600">
                      {siteConfig.name}<br />
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">When</h4>
                    <p className="text-sm text-gray-600">
                      {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString()}<br />
                      {selectedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white rounded-full p-2">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">SAME-DAY SERVICE</p>
                    <p className="text-xs text-gray-600">Fast repairs with 60+ day warranty on all services.*</p>
                    <p className="text-xs text-primary">*Most repairs completed same day.</p>
                  </div>
                </div>
              </div>

              {/* Marketing Checkboxes */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-offers" defaultChecked />
                  <Label htmlFor="email-offers" className="text-xs">
                    Yes, email me coupons and special offers from {siteConfig.name}.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="text-offers" />
                  <Label htmlFor="text-offers" className="text-xs">
                    Yes, text me coupons and special offers from {siteConfig.name}.
                  </Label>
                </div>
              </div>

              {/* Error Display */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="text-red-600">⚠️</div>
                    <div>
                      <p className="text-red-800 font-medium">Error booking appointment</p>
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Display */}
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="text-green-600">✅</div>
                    <div>
                      <p className="text-green-800 font-medium">Appointment booked successfully!</p>
                      <p className="text-green-600 text-sm">We'll send you a confirmation email shortly.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button
                onClick={() => {
                  if (selectedTime && !isSubmitting) {
                    submitRepairRequest('appointment');
                  }
                }}
                disabled={!selectedTime || isSubmitting || isSubmitted}
                size="lg"
                className="w-full btn-primary brand-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? 'APPOINTMENT CONFIRMED' : isSubmitting ? 'SUBMITTING...' : 'CONFIRM APPOINTMENT →'}
              </Button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 mt-4">
                *By submitting this request, I understand that I may receive an email, text or phone call regarding my request. You can unsubscribe at any time. Savings vary by location and repair or service rendered.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (standalone) {
    return (
      <section className="py-8 lg:py-16">
        <div className="wide-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderProgressBar()}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="wide-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Get Your Device Repaired Today
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quick & easy repair request in just a few steps
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {renderProgressBar()}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </motion.div>
      </div>
    </section>
  );
}