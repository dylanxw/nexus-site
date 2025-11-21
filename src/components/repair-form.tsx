"use client";

import { useState, useEffect, useRef } from "react";
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
import { RepairFormAnalytics } from "@/lib/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWithTimeout, TimeoutError } from "@/lib/fetch-with-timeout";

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
  const [formErrors, setFormErrors] = useState({
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
  const [csrfToken, setCsrfToken] = useState<string>('');
  const formStartTime = useRef<number>(Date.now());

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

  // Restore form state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('repairFormState');
      if (saved) {
        const state = JSON.parse(saved);
        const age = Date.now() - (state.timestamp || 0);

        // Only restore if less than 1 hour old
        if (age < 3600000) {
          console.log('Restoring saved form state');
          if (state.selectedDevice) setSelectedDevice(state.selectedDevice);
          if (state.selectedMake) setSelectedMake(state.selectedMake);
          if (state.selectedModel) setSelectedModel(state.selectedModel);
          if (state.customMake) setCustomMake(state.customMake);
          if (state.customModel) setCustomModel(state.customModel);
          if (state.selectedDamages) setSelectedDamages(state.selectedDamages);
          if (state.customerInfo) setCustomerInfo(state.customerInfo);
          if (state.appointmentMode) setAppointmentMode(state.appointmentMode);
          if (state.selectedDate) setSelectedDate(state.selectedDate);
          if (state.currentStep && !initialStep) setCurrentStep(state.currentStep);
        } else {
          // Clear expired state
          localStorage.removeItem('repairFormState');
        }
      }
    } catch (error) {
      console.error('Failed to restore form state:', error);
      localStorage.removeItem('repairFormState');
    }
  }, []);

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetchWithTimeout('/api/csrf-token', {
          timeout: 10000, // 10 second timeout for CSRF token
        });
        const data = await response.json();
        if (data.token) {
          setCsrfToken(data.token);
        }
      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error('CSRF token request timed out:', error.message);
        } else {
          console.error('Failed to fetch CSRF token:', error);
        }
        // Don't show error to user for CSRF token fetch, it will be caught on submit
      }
    };

    fetchCSRFToken();

    // Track form started
    RepairFormAnalytics.formStarted();
  }, []);

  // Track form abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isSubmitted && currentStep > 1 && currentStep < 5) {
        const timeSpent = Date.now() - formStartTime.current;
        RepairFormAnalytics.stepAbandoned(currentStep, timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitted, currentStep]);

  // Browser back button integration - sync step with URL
  useEffect(() => {
    // Update URL when step changes
    const url = new URL(window.location.href);
    const urlStep = url.searchParams.get('step');

    // Only update if different from current URL
    if (urlStep !== currentStep.toString()) {
      url.searchParams.set('step', currentStep.toString());
      window.history.pushState({ step: currentStep }, '', url.toString());
    }
  }, [currentStep]);

  // Listen for back/forward button clicks
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        const targetStep = Number(event.state.step);
        // Only allow going back to valid steps
        if (targetStep >= 1 && targetStep <= 5) {
          setCurrentStep(targetStep);
        }
      } else {
        // If no state, check URL params
        const url = new URL(window.location.href);
        const urlStep = url.searchParams.get('step');
        if (urlStep) {
          const targetStep = Number(urlStep);
          if (targetStep >= 1 && targetStep <= 5) {
            setCurrentStep(targetStep);
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize step from URL on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlStep = url.searchParams.get('step');

    if (urlStep && !initialStep) {
      const targetStep = Number(urlStep);
      if (targetStep >= 1 && targetStep <= 5) {
        setCurrentStep(targetStep);
      }
    }
  }, [initialStep]);

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

  // Auto-save form state to localStorage
  useEffect(() => {
    // Don't save if form is already submitted
    if (isSubmitted) return;

    try {
      const formState = {
        currentStep,
        selectedDevice,
        selectedMake,
        selectedModel,
        customMake,
        customModel,
        selectedDamages,
        customerInfo,
        appointmentMode,
        selectedDate,
        timestamp: Date.now(),
      };

      localStorage.setItem('repairFormState', JSON.stringify(formState));
    } catch (error) {
      console.error('Failed to save form state:', error);
    }
  }, [
    currentStep,
    selectedDevice,
    selectedMake,
    selectedModel,
    customMake,
    customModel,
    selectedDamages,
    customerInfo,
    appointmentMode,
    selectedDate,
    isSubmitted,
  ]);

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
      const response = await fetchWithTimeout(`/api/calendar/availability?date=${date}`, {
        timeout: 15000, // 15 second timeout for calendar availability
      });
      const data = await response.json();

      if (response.ok && data.slots) {
        setAvailableSlots(data.slots);
        setSlotsFetchedForDate(date);
      } else {
        console.error('Failed to fetch availability:', data.error);
        setSubmitError('Unable to load available time slots. Please try again.');
      }
    } catch (error) {
      if (error instanceof TimeoutError) {
        console.error('Calendar availability request timed out:', error.message);
        setSubmitError('Calendar is taking longer than expected to load. Please try again or call us directly.');
      } else {
        console.error('Error fetching availability:', error);
        setSubmitError('Unable to load available time slots. Please try again.');
      }
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setSelectedMake(""); // Reset make when device changes
    setSelectedModel(""); // Reset model when device changes

    // Track device selection
    const deviceLabel = deviceTypes.find(d => d.id === deviceId)?.label || deviceId;
    RepairFormAnalytics.deviceSelected(deviceLabel);
    RepairFormAnalytics.stepCompleted(1, { device_type: deviceLabel });

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

    // Track make/model selection
    RepairFormAnalytics.makeModelSelected(selectedMake, model);
    RepairFormAnalytics.stepCompleted(2, { make: selectedMake, model });

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
      // Track issue selection
      RepairFormAnalytics.issueSelected(selectedDamages);
      RepairFormAnalytics.stepCompleted(3, { issues: selectedDamages });

      setCurrentStep(4);
      console.log("Moving to step 4 with damages:", selectedDamages);
      // Prefetch calendar slots for today's date while user fills out contact info
      fetchAvailableSlots(selectedDate);
    }
  };

  // Phone number formatter - formats as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format based on length
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    }
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation - must be exactly 10 digits
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  // Name validation - must be at least 2 characters and only letters
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    return nameRegex.test(name.trim());
  };

  // Basic sanitization - prevent obvious XSS attempts
  const sanitizeInput = (value: string): string => {
    // Remove < and > to prevent HTML tags
    return value.replace(/[<>]/g, '');
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    let processedValue = value;
    let error = "";

    // Format phone number as user types
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);

      // Only validate if user has started typing
      if (processedValue.length > 0) {
        const cleaned = processedValue.replace(/\D/g, '');
        if (cleaned.length > 0 && cleaned.length < 10) {
          error = "Phone number must be 10 digits";
        } else if (cleaned.length === 10 && !validatePhone(processedValue)) {
          error = "Invalid phone number";
        }
      }
    }
    // Validate and sanitize email
    else if (field === 'email') {
      processedValue = value.toLowerCase().trim();
      if (processedValue.length > 0 && !validateEmail(processedValue)) {
        error = "Please enter a valid email address";
      }
    }
    // Validate and sanitize first and last name
    else if (field === 'firstName' || field === 'lastName') {
      processedValue = sanitizeInput(value);
      if (processedValue.length > 0 && !validateName(processedValue)) {
        error = "Name must be at least 2 letters and contain only letters";
        RepairFormAnalytics.validationError(field, error);
      }
    }
    // Sanitize description
    else if (field === 'description') {
      processedValue = sanitizeInput(value);
    }

    // Update customer info
    setCustomerInfo(prev => ({
      ...prev,
      [field]: processedValue
    }));

    // Update error state
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleStep4Next = () => {
    const { firstName, lastName, phone, email } = customerInfo;

    // Check if all fields are filled
    if (!firstName || !lastName || !phone || !email) {
      return;
    }

    // Check if there are any validation errors
    const hasErrors = Object.values(formErrors).some(error => error !== "");
    if (hasErrors) {
      return;
    }

    // Final validation check
    if (!validateName(firstName) || !validateName(lastName) ||
        !validatePhone(phone) || !validateEmail(email)) {
      return;
    }

    // Track step completion
    RepairFormAnalytics.stepCompleted(4, { has_description: !!customerInfo.description });

    setCurrentStep(5);
    console.log("Moving to step 5 with customer info:", customerInfo);
  };

  // Track last submission time to prevent duplicates
  const lastSubmitTime = useRef<number>(0);
  const submissionCount = useRef<number>(0);

  const submitRepairRequest = async (requestType: 'quote' | 'appointment') => {
    // Prevent duplicate submissions within 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) {
      console.log('Duplicate submission prevented - please wait');
      setSubmitError('Please wait a moment before submitting again.');
      return;
    }

    // Check CSRF token
    if (!csrfToken) {
      setSubmitError('Security token missing. Please refresh the page and try again.');
      return;
    }

    lastSubmitTime.current = now;
    submissionCount.current += 1;

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

      const response = await fetchWithTimeout('/api/repair-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(requestData),
        timeout: 30000, // 30 second timeout for form submission
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error types
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again in a few minutes.');
        } else if (response.status === 403) {
          throw new Error('Security verification failed. Please refresh the page and try again.');
        } else if (result.error?.includes('calendar')) {
          throw new Error('Unable to book calendar slot. Please call us to schedule at ' + siteConfig.phoneFormatted);
        } else if (result.error?.includes('email')) {
          throw new Error('Booking saved but confirmation email failed. We\'ll contact you shortly.');
        } else {
          throw new Error(result.error || 'Failed to submit request. Please try again or call us.');
        }
      }

      setIsSubmitted(true);
      console.log('Request submitted successfully:', result);

      // Track successful submission
      RepairFormAnalytics.formSubmitted(requestType, {
        device_type: deviceLabel || selectedDevice,
        make: isOtherDevice ? customMake : selectedMake,
        model: isOtherDevice ? customModel : selectedModel,
        issue_count: selectedDamages.length,
        booking_number: result.bookingNumber,
      });

      // Clear form data on success
      localStorage.removeItem('repairFormState');

      // Redirect to confirmation page for appointments
      if (requestType === 'appointment' && result.redirect) {
        setTimeout(() => {
          router.push(result.redirect);
        }, 1500); // Brief delay to show success message
      }

    } catch (error) {
      console.error('Error submitting request:', error);

      let errorMessage: string;
      if (error instanceof TimeoutError) {
        errorMessage = 'Request is taking longer than expected. Please wait a moment or call us directly at ' + siteConfig.phoneFormatted;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Failed to submit request. Please call us at ' + siteConfig.phoneFormatted;
      }

      // Track form error
      RepairFormAnalytics.formError(errorMessage, 5);

      setSubmitError(errorMessage);
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
    <div className="mb-6 lg:mb-8" role="group" aria-label="Form progress">
      <div
        className="flex items-center justify-center overflow-x-auto px-2 lg:px-4"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={`Step ${currentStep} of 5: ${steps[currentStep - 1]?.label}`}
      >
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
                aria-current={step.number === currentStep ? 'step' : undefined}
                aria-label={`Step ${step.number}: ${step.label} ${
                  step.number === currentStep ? '(current)' :
                  step.number < currentStep ? '(completed)' : '(upcoming)'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-[10px] lg:text-xs mt-1 hidden sm:block ${
                  step.number === currentStep ? 'text-primary font-medium' : 'text-gray-500'
                }`}
                aria-hidden="true"
              >
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

        {/* Loading State with Skeleton */}
        {loadingDevices ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-3 sm:p-4 lg:p-6 border-2 border-gray-200 rounded-lg lg:rounded-xl">
                <div className="flex flex-col items-center space-y-1.5 sm:space-y-2 lg:space-y-3">
                  <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-lg" />
                  <Skeleton className="h-4 sm:h-5 lg:h-6 w-16 sm:w-20 lg:w-24 rounded" />
                </div>
              </div>
            ))}
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
                  onChange={(e) => setCustomMake(sanitizeInput(e.target.value))}
                  placeholder="e.g., Sony, Canon, DJI"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                  maxLength={100}
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
                  onChange={(e) => setCustomModel(sanitizeInput(e.target.value))}
                  placeholder="e.g., Alpha 7 IV, EOS R5, Mavic 3"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                  maxLength={100}
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

        {/* Damage Selection Grid with Loading Skeleton */}
        {loadingIssues ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="p-2 sm:p-3 lg:p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex flex-col items-center space-y-1 sm:space-y-1.5 lg:space-y-2">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg" />
                  <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : damageTypes.length === 0 ? (
          <div className="text-center py-8 lg:py-12 mb-6 lg:mb-8">
            <p className="text-sm lg:text-base text-gray-600">No issues available for this model.</p>
          </div>
        ) : (
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
                    <span className={`font-medium text-[11px] sm:text-xs lg:text-sm leading-tight ${
                      isSelected ? 'text-primary' : 'text-gray-700'
                    }`}>
                      {damage.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
    const hasErrors = Object.values(formErrors).some(error => error !== "");
    const isFormValid = customerInfo.firstName && customerInfo.lastName &&
                       customerInfo.phone && customerInfo.email && !hasErrors &&
                       validateName(customerInfo.firstName) && validateName(customerInfo.lastName) &&
                       validatePhone(customerInfo.phone) && validateEmail(customerInfo.email);
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
                  className={`mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base ${
                    formErrors.firstName ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your first name"
                  aria-label="First Name"
                  aria-required="true"
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                />
                {formErrors.firstName && (
                  <p id="firstName-error" className="text-red-600 text-xs mt-1" role="alert">{formErrors.firstName}</p>
                )}
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
                  className={`mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base ${
                    formErrors.lastName ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your last name"
                  aria-label="Last Name"
                  aria-required="true"
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                />
                {formErrors.lastName && (
                  <p id="lastName-error" className="text-red-600 text-xs mt-1" role="alert">{formErrors.lastName}</p>
                )}
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
                className={`mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base ${
                  formErrors.phone ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="(555) 555-5555"
                aria-label="Phone Number"
                aria-required="true"
                aria-invalid={!!formErrors.phone}
                aria-describedby={formErrors.phone ? 'phone-error' : undefined}
              />
              {formErrors.phone && (
                <p id="phone-error" className="text-red-600 text-xs mt-1" role="alert">{formErrors.phone}</p>
              )}
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
                className={`mt-1.5 lg:mt-2 h-10 lg:h-12 text-sm lg:text-base ${
                  formErrors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="your@email.com"
                aria-label="Email Address"
                aria-required="true"
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'email-error' : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="text-red-600 text-xs mt-1" role="alert">{formErrors.email}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5 lg:mb-2">
                <Label htmlFor="description" className="text-xs lg:text-sm font-medium">
                  Tell Us About Your Device's Problem
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
                    onClick={() => {
                      setAppointmentMode("appointment");
                      RepairFormAnalytics.modeToggled("appointment");
                    }}
                    className="px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all text-gray-600 hover:text-gray-900 flex-1 sm:flex-initial"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => {
                      setAppointmentMode("quote");
                      RepairFormAnalytics.modeToggled("quote");
                    }}
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
                onClick={() => {
                  setAppointmentMode("appointment");
                  RepairFormAnalytics.modeToggled("appointment");
                }}
                className="px-6 py-2 rounded-md text-sm font-medium transition-all bg-primary text-white shadow-sm"
              >
                Book Appointment
              </button>
              <button
                onClick={() => {
                  setAppointmentMode("quote");
                  RepairFormAnalytics.modeToggled("quote");
                }}
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

          {/* Promotional Banner - Compact */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 mb-6 text-center">
            <p className="text-primary font-semibold text-sm">
              <span className="text-xs uppercase tracking-wide opacity-80">Limited Time:</span> Book Today & Save Up To $10
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <Skeleton key={i} className="h-10 sm:h-12 rounded-lg" />
                    ))}
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
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Same-Day Service</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Fast repairs with <span className="font-semibold text-green-700">60+ day warranty</span> on all services.
                    </p>
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

        {/* Screen reader announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {submitError && <p>Error: {submitError}</p>}
          {Object.values(formErrors).filter(Boolean).length > 0 && (
            <p>Form has {Object.values(formErrors).filter(Boolean).length} errors. Please review and correct them.</p>
          )}
        </div>

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