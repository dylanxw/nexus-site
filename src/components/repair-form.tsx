"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Monitor, Gamepad2, Watch, HardDrive, ArrowRight, Package } from "lucide-react";
import { siteConfig } from "@/config/site";

// Icon mapping for dynamic devices
const iconMap: Record<string, any> = {
  Smartphone,
  Tablet,
  Monitor,
  Laptop: Monitor,
  Gamepad2,
  Watch,
  Package,
  HardDrive
};

const steps = [
  { number: 1, label: "Type", active: true },
  { number: 2, label: "Make/Model", active: false },
  { number: 3, label: "Repair", active: false },
  { number: 4, label: "Appointment", active: false },
  { number: 5, label: "Confirmation", active: false },
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
  initialDevices?: any[];
  initialModelIssues?: Record<string, any[]>;
  standalone?: boolean;
}

export function RepairForm({ initialDevice = "", initialBrand = "", initialService = "", initialStep = 1, initialDevices = [], initialModelIssues = {}, standalone = false }: RepairFormProps = {}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedDevice, setSelectedDevice] = useState<string>(initialDevice);
  const [selectedMake, setSelectedMake] = useState<string>(initialBrand);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [customMake, setCustomMake] = useState<string>("");
  const [customModel, setCustomModel] = useState<string>("");
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
  const [availableSlots, setAvailableSlots] = useState<{ time: string; value: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsFetchedForDate, setSlotsFetchedForDate] = useState<string | null>(null);

  // Dynamic data from database
  const [deviceTypes, setDeviceTypes] = useState<any[]>(() => {
    // Initialize devices immediately if provided
    if (initialDevices && initialDevices.length > 0) {
      return initialDevices.map((device: any) => ({
        id: device.value,
        label: device.label,
        icon: iconMap[device.icon] || Package,
        brands: device.brands
      }));
    }
    return [];
  });
  const [damageTypes, setDamageTypes] = useState<any[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(!initialDevices.length);
  const [loadingIssues, setLoadingIssues] = useState(false);

  // Only fetch devices if not provided initially
  useEffect(() => {
    if (initialDevices.length === 0) {
      fetchDevices();
    }
  }, []); // Empty dependency array - only run once on mount

  // Fetch issues when model changes
  useEffect(() => {
    if (selectedModel && currentStep >= 3) {
      fetchIssues(selectedModel);
    }
  }, [selectedModel, currentStep]);

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

  const fetchDevices = async () => {
    setLoadingDevices(true);
    try {
      const response = await fetch('/api/repair-form/devices');
      const data = await response.json();
      if (response.ok && data.devices) {
        // Transform to match expected format
        const formattedDevices = data.devices.map((device: any) => ({
          id: device.value,
          label: device.label,
          icon: iconMap[device.icon] || Package,
          brands: device.brands
        }));
        setDeviceTypes(formattedDevices);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoadingDevices(false);
    }
  };

  const fetchIssues = async (modelId: string) => {
    // Check if we have pre-fetched data
    if (initialModelIssues[modelId]) {
      const formattedIssues = initialModelIssues[modelId].map((issue: any) => ({
        id: issue.value,
        label: issue.label,
        placeholder: issue.emoji
      }));
      setDamageTypes(formattedIssues);
      setLoadingIssues(false);
      return;
    }

    // Fallback: fetch from API if not pre-loaded
    setLoadingIssues(true);
    try {
      const response = await fetch(`/api/repair-form/issues?model=${modelId}`);
      const data = await response.json();
      if (response.ok && data.issues) {
        // Transform to match expected format
        const formattedIssues = data.issues.map((issue: any) => ({
          id: issue.value,
          label: issue.label,
          placeholder: issue.emoji
        }));
        setDamageTypes(formattedIssues);
      } else {
        console.error('Error fetching issues:', data.error);
        setDamageTypes([]);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setDamageTypes([]);
    } finally {
      setLoadingIssues(false);
    }
  };

  // Fetch available time slots when date changes or when entering step 5
  useEffect(() => {
    if (currentStep === 5 && appointmentMode === 'appointment' && selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, currentStep, appointmentMode]);

  const fetchAvailableSlots = async (date: string) => {
    // Skip if already fetching or already have data for this date
    if (loadingSlots || slotsFetchedForDate === date) {
      console.log('Skipping fetch - already loaded for', date);
      return;
    }

    setLoadingSlots(true);
    // Don't clear slots immediately - better UX

    try {
      const response = await fetch(`/api/calendar/availability?date=${date}`);
      const data = await response.json();

      if (response.ok && data.slots) {
        setAvailableSlots(data.slots);
        setSlotsFetchedForDate(date);
      } else {
        console.error('Failed to fetch availability:', data.error);
        setSubmitError('Unable to load available time slots. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setSubmitError('Unable to load available time slots. Please try again.');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setSelectedMake(""); // Reset make when device changes
    setSelectedModel(""); // Reset model when device changes

    if (!standalone) {
      // Redirect to dedicated form page with selected device
      router.push(`/denton-tx/repair-form?device=${deviceId}`);
    } else {
      // Auto-advance to step 2 immediately
      setCurrentStep(2);
      console.log("Moving to step 2 with device:", deviceId);
    }
  };

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(""); // Reset model when make changes
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    // Start fetching issues immediately for faster load
    fetchIssues(model);
    // Auto-advance to step 3 immediately (no delay)
    setCurrentStep(3);
    console.log("Moving to step 3 with make/model:", selectedMake, model);
  };

  const handleStep2Next = () => {
    // For "Other" device type, validate custom inputs
    if (selectedDevice === 'other') {
      if (customMake && customModel) {
        setCurrentStep(3);
      }
    } else {
      // Regular device types need make and model selected
      if (selectedMake && selectedModel) {
        setCurrentStep(3);
      }
    }
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
      // Prefetch calendar slots for today's date while user fills out contact info
      fetchAvailableSlots(selectedDate);
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
      const isOtherDevice = selectedDevice === 'other';

      const requestData = {
        deviceType: deviceLabel || selectedDevice,
        make: isOtherDevice ? customMake : selectedMake,
        model: isOtherDevice ? customModel : selectedModel,
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

      // Redirect to confirmation page for appointments
      if (requestType === 'appointment' && result.redirect) {
        setTimeout(() => {
          router.push(result.redirect);
        }, 1500); // Brief delay to show success message
      }

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
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center justify-center overflow-x-auto px-2 lg:px-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm lg:text-base font-medium ${
                  step.number === currentStep
                    ? 'bg-primary text-white'
                    : step.number < currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <span className={`text-[10px] lg:text-xs mt-1 hidden sm:block ${
                step.number === currentStep ? 'text-primary font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-6 sm:w-12 lg:w-16 mx-1 lg:mx-2 ${
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
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
            What type of device needs repair?
          </h2>
          <p className="text-sm lg:text-base text-gray-600">
            Select your device type to get started
          </p>
        </div>

        {/* Loading State */}
        {loadingDevices ? (
          <div className="flex items-center justify-center py-8 lg:py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-b-2 border-primary mx-auto mb-3 lg:mb-4"></div>
              <p className="text-xs lg:text-sm text-gray-600">Loading device types...</p>
            </div>
          </div>
        ) : deviceTypes.length === 0 ? (
          <div className="text-center py-8 lg:py-12">
            <p className="text-sm lg:text-base text-gray-600">No device types available. Please contact support.</p>
          </div>
        ) : (
          /* Device Selection Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
            {deviceTypes.map((device) => {
              const Icon = device.icon;
              const isSelected = selectedDevice === device.id;

              return (
                <div
                  key={device.id}
                  className={`p-3 sm:p-4 lg:p-6 border-2 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDeviceSelect(device.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 lg:space-y-3">
                    <Icon
                      className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${
                        isSelected ? 'text-primary' : 'text-gray-600'
                      }`}
                    />
                    <span className={`font-semibold text-sm sm:text-base lg:text-lg ${
                      isSelected ? 'text-primary' : 'text-gray-700'
                    }`}>
                      {device.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </CardContent>
    </Card>
  );

  const renderStep2 = () => {
    const isOtherDevice = selectedDevice === 'other';
    const selectedDeviceData = deviceTypes.find(d => d.id === selectedDevice);
    const availableBrands = selectedDeviceData?.brands || [];
    const selectedBrandData = availableBrands.find((b: any) => b.value === selectedMake);
    const availableModels = selectedBrandData?.models || [];

    return (
      <Card className="shadow-xl border-0 w-full">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
              {isOtherDevice ? 'Describe Your Device' : 'Select Make / Model'}
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              {isOtherDevice ? 'Enter your device details' : 'Choose your device\'s make and model'}
            </p>
          </div>

          {isOtherDevice ? (
            <>
              {/* Custom Make Input */}
              <div className="mb-4 lg:mb-6 max-w-md mx-auto px-2">
                <label className="block text-xs lg:text-sm font-medium mb-2 lg:mb-3">
                  Device Make / Brand
                </label>
                <Input
                  type="text"
                  value={customMake}
                  onChange={(e) => setCustomMake(e.target.value)}
                  placeholder="e.g., Sony, Canon, DJI"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>

              {/* Custom Model Input */}
              <div className="mb-6 lg:mb-8 max-w-md mx-auto px-2">
                <label className="block text-xs lg:text-sm font-medium mb-2 lg:mb-3">
                  Device Model
                </label>
                <Input
                  type="text"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="e.g., Alpha 7 IV, EOS R5, Mavic 3"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
            </>
          ) : (
            <>
              {/* Make Selection */}
              <div className="mb-4 lg:mb-6 max-w-md mx-auto px-2">
                <label className="block text-xs lg:text-sm font-medium mb-2 lg:mb-3">
                  Select Your Make
                </label>
                <SearchableSelect
                  value={selectedMake}
                  onValueChange={handleMakeSelect}
                  options={availableBrands.map((brand: any) => ({
                    value: brand.value,
                    label: brand.label
                  }))}
                  placeholder="Please choose an option"
                  searchPlaceholder="Search brands..."
                  emptyText="No brand found."
                  className="text-sm lg:text-base"
                />
              </div>

              {/* Model Selection */}
              <div className="mb-6 lg:mb-8 max-w-md mx-auto px-2">
                <label className="block text-xs lg:text-sm font-medium mb-2 lg:mb-3">
                  Select Your Model
                </label>
                <SearchableSelect
                  value={selectedModel}
                  onValueChange={handleModelSelect}
                  options={availableModels.map((model: any) => ({
                    value: model.value,
                    label: model.label
                  }))}
                  placeholder="Please choose an option"
                  searchPlaceholder="Search models..."
                  emptyText="No model found."
                  disabled={!selectedMake}
                  className="text-sm lg:text-base"
                />
              </div>
            </>
          )}

          {/* Next Button for Other device type */}
          {isOtherDevice && (
            <div className="mb-4 lg:mb-6 max-w-md mx-auto px-2">
              <Button
                onClick={handleStep2Next}
                disabled={!customMake || !customModel}
                size="lg"
                className="w-full text-sm lg:text-base"
              >
                Continue to Repair Issues →
              </Button>
            </div>
          )}

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
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
            What is the issue with your device?
          </h2>
          <p className="text-sm lg:text-base text-gray-600">
            Select all issues that apply to your device
          </p>
        </div>

        {/* Choose another Make/Model Link */}
        <div className="mb-6 lg:mb-8 px-2">
          <button
            onClick={() => setCurrentStep(2)}
            className="text-primary hover:text-primary/80 underline text-xs lg:text-sm font-medium"
          >
            Choose another Make/Model
          </button>
        </div>

        {/* Damage Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
          {damageTypes.map((damage) => {
            const isSelected = selectedDamages.includes(damage.id);

            return (
              <div
                key={damage.id}
                className={`p-2 sm:p-3 lg:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
                onClick={() => handleDamageToggle(damage.id)}
              >
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-1.5 lg:space-y-2">
                  {/* Placeholder Image */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl lg:text-2xl ${
                    isSelected ? 'bg-primary/20' : 'bg-gray-100'
                  }`}>
                    {damage.placeholder}
                  </div>

                  {/* Label */}
                  <span className={`font-medium text-[9px] sm:text-[10px] lg:text-xs leading-tight ${
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
        <div className="flex justify-center px-2">
          <Button
            onClick={handleStep3Next}
            disabled={selectedDamages.length === 0}
            size="lg"
            className="btn-primary brand-shadow px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Next Step
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
              Let Us Fix It!
            </h2>
            <p className="text-sm lg:text-base text-gray-600 px-2">
              Please provide your contact information to complete your repair request
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto space-y-4 lg:space-y-6 px-2">
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs lg:text-sm font-medium">
                  <span className="text-primary">*</span> First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={customerInfo.firstName}
                  onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                  className="mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs lg:text-sm font-medium">
                  <span className="text-primary">*</span> Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={customerInfo.lastName}
                  onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                  className="mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone" className="text-xs lg:text-sm font-medium">
                <span className="text-primary">*</span> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-xs lg:text-sm font-medium">
                <span className="text-primary">*</span> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base"
                placeholder="Enter your email address"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5 lg:mb-2">
                <Label htmlFor="description" className="text-xs lg:text-sm font-medium">
                  <span className="text-primary">*</span> Tell Us About Your Device's Problem
                </Label>
                <span className="text-xs lg:text-sm text-primary">
                  {remainingChars} left
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
                className="mt-1.5 lg:mt-2 min-h-[100px] lg:min-h-[120px] resize-none text-sm lg:text-base"
                placeholder="Please describe the issue with your device in detail..."
              />
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 lg:p-4 mt-4 lg:mt-6">
                <div className="flex items-center gap-2">
                  <div className="text-red-600 text-lg lg:text-xl">⚠️</div>
                  <div>
                    <p className="text-red-800 font-medium text-sm lg:text-base">Error submitting request</p>
                    <p className="text-red-600 text-xs lg:text-sm">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Display */}
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 lg:p-4 mt-4 lg:mt-6">
                <div className="flex items-center gap-2">
                  <div className="text-green-600 text-lg lg:text-xl">✅</div>
                  <div>
                    <p className="text-green-800 font-medium text-sm lg:text-base">Request submitted successfully!</p>
                    <p className="text-green-600 text-xs lg:text-sm">We'll contact you shortly to discuss your repair.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-center text-xs lg:text-sm text-gray-600 mt-4 lg:mt-6 px-2">
              *By submitting this request, I understand that I may receive an email, text or phone call regarding my request. You can unsubscribe at any time.
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-3 lg:pt-4">
              <Button
                onClick={handleStep4Next}
                disabled={!isFormValid || isSubmitting || isSubmitted}
                size="lg"
                className="btn-primary brand-shadow px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitted ? 'REQUEST SUBMITTED' : 'CONTINUE TO CONFIRMATION'}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Helper function to convert 24-hour time to 12-hour format
  const formatTimeTo12Hour = (time24: string): string => {
    if (!time24) return '';
    const [hour, minute] = time24.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const renderStep5 = () => {
    const deviceLabel = deviceTypes.find(d => d.id === selectedDevice)?.label;

    // Get the model name from the nested structure
    const selectedDeviceData = deviceTypes.find(d => d.id === selectedDevice);
    const selectedBrandData = selectedDeviceData?.brands.find((b: any) => b.value === selectedMake);
    const selectedModelData = selectedBrandData?.models.find((m: any) => m.value === selectedModel);
    const modelName = selectedModelData?.name || selectedModel;

    const selectedIssues = selectedDamages.map(id =>
      damageTypes.find(d => d.id === id)?.label
    ).join(', ');

    // Format the selected time for display
    const formattedTime = formatTimeTo12Hour(selectedTime);

    if (appointmentMode === "quote") {
      return (
        <Card className="shadow-xl border-0 w-full">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Mode Toggle - Only show if not yet submitted */}
            {!isSubmitted && (
              <div className="flex justify-center mb-6 lg:mb-8">
                <div className="inline-flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                  <button
                    onClick={() => setAppointmentMode("appointment")}
                    className="px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all text-gray-600 hover:text-gray-900 flex-1 sm:flex-initial"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setAppointmentMode("quote")}
                    className="px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all bg-primary text-white shadow-sm flex-1 sm:flex-initial"
                  >
                    Get Quote Only
                  </button>
                </div>
              </div>
            )}

            {/* Quote Request Review */}
            <div className="text-center max-w-2xl mx-auto px-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
                Review Your Quote Request
              </h2>
              <p className="text-sm lg:text-base text-gray-600 mb-6 lg:mb-8">
                We'll prepare a detailed estimate for your repair and contact you shortly
              </p>

              {/* Summary */}
              <div className="grid md:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                {/* Device Information */}
                <div className="bg-gray-50 rounded-lg p-4 lg:p-6 text-left">
                  <h3 className="font-semibold text-base lg:text-lg mb-3 lg:mb-4">Device Information</h3>
                  <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm">
                    <p><span className="font-medium">Device:</span> {deviceLabel}</p>
                    <p><span className="font-medium">Make:</span> {selectedMake}</p>
                    <p><span className="font-medium">Model:</span> {modelName}</p>
                    <p><span className="font-medium">Issues:</span> {selectedIssues}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4 lg:p-6 text-left">
                  <h3 className="font-semibold text-base lg:text-lg mb-3 lg:mb-4">Contact Information</h3>
                  <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm">
                    <p><span className="font-medium">Name:</span> {customerInfo.firstName} {customerInfo.lastName}</p>
                    <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                    <p><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6 mb-4 lg:mb-6 text-left">
                <h3 className="font-semibold text-base lg:text-lg mb-2 lg:mb-3 text-blue-900">What Happens Next?</h3>
                <ol className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">1.</span>
                    <span>Our technician will review your device information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">2.</span>
                    <span>We'll prepare a detailed quote for the repairs needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">3.</span>
                    <span>You'll receive a call or email with the estimate within <strong>2-4 hours during business hours</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">4.</span>
                    <span>Once approved, you can schedule an appointment or drop off your device</span>
                  </li>
                </ol>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-100 rounded-lg p-3 lg:p-4 mb-4 lg:mb-6">
                <p className="text-xs lg:text-sm font-medium text-gray-700 mb-1">Our Business Hours:</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900">{siteConfig.hours.display}</p>
              </div>

              {/* Error Display */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="text-green-600 text-2xl">✓</div>
                    <div className="text-left">
                      <p className="text-green-800 font-medium">Quote request submitted successfully!</p>
                      <p className="text-green-600 text-sm">Check your email for confirmation. We'll contact you within 2-4 hours during business hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!isSubmitted ? (
                  <>
                    <Button
                      onClick={() => setCurrentStep(4)}
                      variant="outline"
                      size="lg"
                      disabled={isSubmitting}
                      className="order-2 sm:order-1"
                    >
                      Back to Contact Info
                    </Button>

                    <Button
                      onClick={() => {
                        if (!isSubmitting) {
                          submitRepairRequest('quote');
                        }
                      }}
                      disabled={isSubmitting}
                      size="lg"
                      className="btn-primary brand-shadow order-1 sm:order-2"
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUOTE REQUEST'}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => window.location.href = '/'}
                    size="lg"
                    className="btn-primary brand-shadow"
                  >
                    Return to Home
                  </Button>
                )}
              </div>
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
                className="px-6 py-2 rounded-md text-sm font-medium transition-all bg-primary text-white shadow-sm"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setAppointmentMode("quote")}
                className="px-6 py-2 rounded-md text-sm font-medium transition-all text-gray-600 hover:text-gray-900"
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
                    setSlotsFetchedForDate(null); // Reset cache when date changes
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
                {loadingSlots ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm text-gray-600">Loading available times...</p>
                    </div>
                  </div>
                ) : availableSlots.length === 0 ? (
                  (() => {
                    // Check if selected date is Sunday
                    const selectedDateObj = new Date(selectedDate + 'T00:00:00');
                    const isSunday = selectedDateObj.getDay() === 0;

                    return isSunday ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <p className="text-blue-800 font-medium mb-2">🗓️ We're Closed on Sundays</p>
                        <p className="text-sm text-blue-700 mb-3">
                          Please select another date to book your appointment.
                        </p>
                        <div className="bg-white border border-blue-300 rounded-lg p-4 mt-4">
                          <p className="text-sm font-semibold text-blue-900 mb-2">Need Emergency Repair?</p>
                          <p className="text-sm text-blue-700 mb-3">
                            For urgent repairs that can't wait, please call us:
                          </p>
                          <a
                            href={siteConfig.phoneHref}
                            className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                          >
                            {siteConfig.phoneFormatted}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <p className="text-yellow-800 font-medium mb-2">No appointments available</p>
                        <p className="text-sm text-yellow-700">
                          We're fully booked for this date. Please select another date or call us at{' '}
                          <a href={siteConfig.phoneHref} className="underline font-medium">
                            {siteConfig.phoneFormatted}
                          </a>
                        </p>
                      </div>
                    );
                  })()
                ) : (
                  <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => setSelectedTime(slot.value)}
                        className={`p-3 text-sm border rounded-lg transition-all ${
                          selectedTime === slot.value
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
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
                  <p><span className="font-medium">Device:</span> {modelName}</p>
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
                      {formattedTime}
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