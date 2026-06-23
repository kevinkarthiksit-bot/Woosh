"use client";

import { BookingPriceSummary } from "@/components/booking/BookingPriceSummary";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { AddOnsStep } from "@/components/booking/steps/AddOnsStep";
import { AddressStep } from "@/components/booking/steps/AddressStep";
import { ReviewStep } from "@/components/booking/steps/ReviewStep";
import { ScheduleStep } from "@/components/booking/steps/ScheduleStep";
import { ServiceStep } from "@/components/booking/steps/ServiceStep";
import { SuccessStep } from "@/components/booking/steps/SuccessStep";
import { VehicleStep } from "@/components/booking/steps/VehicleStep";
import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import {
  buildOrderPayload,
  computeSubtotal,
  computeWalletDeduction,
  getSlugBookingConfig,
} from "@/lib/api/mappers";
import { createOrder, validateCoupon } from "@/lib/api/orders";
import { getServices } from "@/lib/api/services";
import {
  buildSlotRange,
  getAvailableSlots,
  getAvailableTimesForDate,
  getSlotTimes,
} from "@/lib/api/slots";
import type { ApiAvailableSlot, ApiAvailableSlotsData, ApiService, ApiVehicle } from "@/lib/api/types";
import { addUserVehicle, getUserVehicles, getUserWallet } from "@/lib/api/users";
import {
  getFlowSteps,
  getPreviousStep,
  type BookingFlowStep,
  type BookingWizardStep,
} from "@/lib/booking/steps";
import { getServiceBySlug, type ServiceSlug } from "@/lib/services";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface BookingWizardProps {
  slug: ServiceSlug;
}

function createFreshBookingState() {
  return {
    step: "loading" as BookingWizardStep,
    services: [] as ApiService[],
    addOnServices: [] as ApiService[],
    selectedService: null as ApiService | null,
    selectedAddOnIds: [] as string[],
    vehicles: [] as ApiVehicle[],
    selectedVehicle: null as ApiVehicle | null,
    newVehicleModel: "",
    address: "",
    scheduledDate: "",
    scheduledTimeSlot: "",
    availableSlotsData: null as ApiAvailableSlotsData | null,
    fallbackSlotTimes: [] as ApiAvailableSlot[],
    useFallbackSlots: false,
    walletBalance: 0,
    useWallet: false,
    couponCode: "",
    couponDiscount: null as number | null,
    orderNumber: null as string | null,
    error: "",
    submitting: false,
    loadingServices: false,
    loadingAddOns: false,
    loadingVehicles: false,
    loadingSlots: false,
    savingVehicle: false,
  };
}

export function BookingWizard({ slug }: BookingWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const bookPath = `/services/${slug}/book`;
  const staticService = getServiceBySlug(slug);
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { openAuthModal } = useAuthModal();
  const config = getSlugBookingConfig(slug);
  const flowSteps = getFlowSteps(slug);
  const needsSchedule = flowSteps.includes("schedule");
  const needsAddOns = flowSteps.includes("addons");

  const [step, setStep] = useState<BookingWizardStep>("loading");
  const [services, setServices] = useState<ApiService[]>([]);
  const [addOnServices, setAddOnServices] = useState<ApiService[]>([]);
  const [selectedService, setSelectedService] = useState<ApiService | null>(null);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<ApiVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<ApiVehicle | null>(null);
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [address, setAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState("");
  const [availableSlotsData, setAvailableSlotsData] = useState<ApiAvailableSlotsData | null>(null);
  const [fallbackSlotTimes, setFallbackSlotTimes] = useState<ApiAvailableSlot[]>([]);
  const [useFallbackSlots, setUseFallbackSlots] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingAddOns, setLoadingAddOns] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [savingVehicle, setSavingVehicle] = useState(false);

  const selectedAddOns = useMemo(
    () => addOnServices.filter((a) => selectedAddOnIds.includes(a._id)),
    [addOnServices, selectedAddOnIds],
  );

  const subtotal = useMemo(() => {
    if (!selectedService) return 0;
    return computeSubtotal(selectedService, selectedAddOns);
  }, [selectedService, selectedAddOns]);

  const walletDeduction = useMemo(() => {
    const afterCoupon = Math.max(0, subtotal - (couponDiscount ?? 0));
    return computeWalletDeduction(walletBalance, afterCoupon, useWallet);
  }, [subtotal, couponDiscount, walletBalance, useWallet]);

  const availableSlotsForDate = useMemo(() => {
    if (useFallbackSlots) return fallbackSlotTimes;
    return getAvailableTimesForDate(scheduledDate, availableSlotsData);
  }, [scheduledDate, availableSlotsData, useFallbackSlots, fallbackSlotTimes]);

  const vehicleModel = selectedVehicle?.vehicleModel ?? newVehicleModel.trim();

  const resetWizard = useCallback(() => {
    const fresh = createFreshBookingState();
    setStep(fresh.step);
    setServices(fresh.services);
    setAddOnServices(fresh.addOnServices);
    setSelectedService(fresh.selectedService);
    setSelectedAddOnIds(fresh.selectedAddOnIds);
    setVehicles(fresh.vehicles);
    setSelectedVehicle(fresh.selectedVehicle);
    setNewVehicleModel(fresh.newVehicleModel);
    setAddress(fresh.address);
    setScheduledDate(fresh.scheduledDate);
    setScheduledTimeSlot(fresh.scheduledTimeSlot);
    setAvailableSlotsData(fresh.availableSlotsData);
    setFallbackSlotTimes(fresh.fallbackSlotTimes);
    setUseFallbackSlots(fresh.useFallbackSlots);
    setWalletBalance(fresh.walletBalance);
    setUseWallet(fresh.useWallet);
    setCouponCode(fresh.couponCode);
    setCouponDiscount(fresh.couponDiscount);
    setOrderNumber(fresh.orderNumber);
    setError(fresh.error);
    setSubmitting(fresh.submitting);
    setLoadingServices(fresh.loadingServices);
    setLoadingAddOns(fresh.loadingAddOns);
    setLoadingVehicles(fresh.loadingVehicles);
    setLoadingSlots(fresh.loadingSlots);
    setSavingVehicle(fresh.savingVehicle);
  }, []);

  const loadServices = useCallback(async () => {
    setLoadingServices(true);
    setError("");
    try {
      const data = await getServices(config.category);
      if (data.length === 0) {
        setError("No live services found for this category. Try again later.");
        setStep("error");
        return;
      }
      setServices(data);
      setStep("service");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load services.");
      setStep("error");
    } finally {
      setLoadingServices(false);
    }
  }, [config.category]);

  const loadAddOns = useCallback(async () => {
    setLoadingAddOns(true);
    try {
      const data = await getServices("AddOn");
      setAddOnServices(data);
    } catch {
      setAddOnServices([]);
    } finally {
      setLoadingAddOns(false);
    }
  }, []);

  const loadVehicles = useCallback(async () => {
    if (!token || !user?.phone) return;
    setLoadingVehicles(true);
    try {
      const data = await getUserVehicles(user.phone, token);
      setVehicles(data);
      const preselected = data.find((v) => v.isSelected) ?? data[0];
      if (preselected) setSelectedVehicle(preselected);
    } catch {
      setVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  }, [token, user?.phone]);

  const loadWallet = useCallback(async () => {
    if (!token || !user?.phone) return;
    try {
      const wallet = await getUserWallet(user.phone, token);
      setWalletBalance(wallet.walletBalance ?? 0);
    } catch {
      setWalletBalance(0);
    }
  }, [token, user?.phone]);

  const loadAvailableSlots = useCallback(async () => {
    setLoadingSlots(true);
    setUseFallbackSlots(false);
    try {
      const range = buildSlotRange(new Date(), 14);
      const data = await getAvailableSlots(range.startDate, range.endDate);
      setAvailableSlotsData(data);
    } catch {
      try {
        const times = await getSlotTimes();
        setFallbackSlotTimes(times.map((t) => ({ id: t.time, time: t.time, order: t.order })));
        setUseFallbackSlots(true);
      } catch {
        setFallbackSlotTimes([]);
        setUseFallbackSlots(true);
      }
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (pathname !== bookPath) return;
    resetWizard();
    if (authLoading) return;
    if (!isAuthenticated) {
      openAuthModal(bookPath);
      return;
    }
    void loadServices();
  }, [pathname, bookPath, authLoading, isAuthenticated, openAuthModal, loadServices, resetWizard]);

  useEffect(() => {
    if (step === "addons" && needsAddOns && addOnServices.length === 0) {
      void loadAddOns();
    }
  }, [step, needsAddOns, addOnServices.length, loadAddOns]);

  useEffect(() => {
    if (step === "vehicle") {
      void loadVehicles();
    }
  }, [step, loadVehicles]);

  useEffect(() => {
    if (step === "review") {
      void loadWallet();
    }
  }, [step, loadWallet]);

  useEffect(() => {
    if (step === "schedule" && needsSchedule && !availableSlotsData && !useFallbackSlots) {
      void loadAvailableSlots();
    }
  }, [step, needsSchedule, availableSlotsData, useFallbackSlots, loadAvailableSlots]);

  useEffect(() => {
    if (scheduledDate && scheduledTimeSlot) {
      const stillAvailable = availableSlotsForDate.some((s) => s.time === scheduledTimeSlot);
      if (!stillAvailable) setScheduledTimeSlot("");
    }
  }, [scheduledDate, scheduledTimeSlot, availableSlotsForDate]);

  const goBack = (current: BookingFlowStep) => {
    setError("");
    const prev = getPreviousStep(slug, current);
    if (prev) setStep(prev);
  };

  const handleServiceContinue = () => {
    if (!selectedService) {
      setError("Select a service to continue.");
      return;
    }
    setError("");
    setStep(needsAddOns ? "addons" : "vehicle");
  };

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAddVehicle = async () => {
    if (!token || !user?.phone || !newVehicleModel.trim()) return;
    setSavingVehicle(true);
    setError("");
    try {
      const vehicle = await addUserVehicle(
        user.phone,
        { vehicleType: config.vehicleType, vehicleModel: newVehicleModel.trim() },
        token,
      );
      setVehicles((prev) => [...prev, vehicle]);
      setSelectedVehicle(vehicle);
      setNewVehicleModel("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save vehicle.");
    } finally {
      setSavingVehicle(false);
    }
  };

  const handleVehicleContinue = () => {
    if (!selectedVehicle && !newVehicleModel.trim()) {
      setError("Select or add a vehicle to continue.");
      return;
    }
    setError("");
    setStep("address");
  };

  const handleAddressContinue = () => {
    if (!address.trim()) {
      setError("Service address is required.");
      return;
    }
    setError("");
    setStep(needsSchedule ? "schedule" : "review");
  };

  const handleScheduleContinue = () => {
    if (!scheduledDate || !scheduledTimeSlot) {
      setError("Pick a date and time slot.");
      return;
    }
    setError("");
    setStep("review");
  };

  const handleApplyCoupon = async () => {
    if (!token || !user?.phone || !couponCode.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await validateCoupon(couponCode.trim(), subtotal, user.phone, token);
      if (result.valid) {
        setCouponDiscount(result.discountAmount ?? 0);
      } else {
        setCouponDiscount(null);
        setError(result.message ?? "Invalid coupon");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not validate coupon.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!token || !user?.phone || !selectedService) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = buildOrderPayload({
        slug,
        serviceId: selectedService._id,
        address: address.trim(),
        vehicleModel,
        phone: user.phone,
        name: user.name,
        scheduledDate: needsSchedule ? scheduledDate : undefined,
        scheduledTimeSlot: needsSchedule ? scheduledTimeSlot : undefined,
        couponCode: couponCode.trim() || undefined,
        addOnIds: selectedAddOnIds,
        walletUsedAmount: walletDeduction,
      });
      const order = await createOrder(payload, token);
      setOrderNumber(order.orderNumber ?? order._id);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!staticService) {
    return <p className="text-muted">Service not found.</p>;
  }

  if (authLoading || (step === "loading" && isAuthenticated)) {
    return <p className="text-muted">Loading booking…</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-card">
        <p className="text-body text-muted">Sign in with your phone to continue booking.</p>
        <Button onClick={() => openAuthModal(`/services/${slug}/book`)}>Login with OTP</Button>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="space-y-4 rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-700">{error}</p>
        <Button variant="secondary" onClick={() => router.push(`/services/${slug}`)}>
          Back to service
        </Button>
      </div>
    );
  }

  if (step === "success" && orderNumber) {
    return (
      <SuccessStep
        serviceTitle={staticService.title}
        orderNumber={orderNumber}
        onViewOrders={() => router.push("/account?tab=orders")}
        onGoHome={() => router.push("/")}
      />
    );
  }

  const showPriceSummary =
    selectedService && step !== "review" && flowSteps.includes(step as BookingFlowStep);

  return (
    <div className="space-y-6" data-testid="booking-wizard">
      <div className="rounded-2xl border border-black/8 bg-background-muted p-4">
        <p className="text-eyebrow text-cyan">Booking</p>
        <h1 className="font-display text-h2 text-foreground">{staticService.title}</h1>
        {flowSteps.includes(step as BookingFlowStep) ? (
          <div className="mt-4">
            <BookingStepper slug={slug} currentStep={step as BookingFlowStep} />
          </div>
        ) : null}
      </div>

      <div className="relative rounded-2xl border border-black/8 bg-white p-6 shadow-card">
        {step === "service" ? (
          <ServiceStep
            services={services}
            selectedId={selectedService?._id ?? null}
            onSelect={setSelectedService}
            onContinue={handleServiceContinue}
            error={error}
            loading={loadingServices}
          />
        ) : null}

        {step === "addons" ? (
          <AddOnsStep
            addOns={addOnServices}
            selectedIds={selectedAddOnIds}
            onToggle={handleAddOnToggle}
            onBack={() => goBack("addons")}
            onContinue={() => {
              setError("");
              setStep("vehicle");
            }}
            error={error}
            loading={loadingAddOns}
          />
        ) : null}

        {step === "vehicle" ? (
          <VehicleStep
            vehicles={vehicles}
            selectedVehicleId={selectedVehicle?._id ?? null}
            newVehicleModel={newVehicleModel}
            vehicleType={config.vehicleType}
            onSelectVehicle={setSelectedVehicle}
            onNewVehicleModelChange={setNewVehicleModel}
            onAddVehicle={handleAddVehicle}
            onBack={() => goBack("vehicle")}
            onContinue={handleVehicleContinue}
            error={error}
            loading={loadingVehicles}
            saving={savingVehicle}
          />
        ) : null}

        {step === "address" ? (
          <AddressStep
            address={address}
            onAddressChange={setAddress}
            onBack={() => goBack("address")}
            onContinue={handleAddressContinue}
            error={error}
          />
        ) : null}

        {step === "schedule" ? (
          <ScheduleStep
            scheduledDate={scheduledDate}
            scheduledTimeSlot={scheduledTimeSlot}
            availableSlots={availableSlotsForDate}
            fallbackToAllTimes={useFallbackSlots}
            onDateChange={setScheduledDate}
            onSlotChange={setScheduledTimeSlot}
            onBack={() => goBack("schedule")}
            onContinue={handleScheduleContinue}
            error={error}
            loading={loadingSlots}
          />
        ) : null}

        {step === "review" && selectedService ? (
          <ReviewStep
            service={selectedService}
            addOns={selectedAddOns}
            address={address}
            vehicleLabel={`${config.vehicleType} — ${vehicleModel}`}
            scheduledDate={needsSchedule ? scheduledDate : undefined}
            scheduledTimeSlot={needsSchedule ? scheduledTimeSlot : undefined}
            subtotal={subtotal}
            couponCode={couponCode}
            couponDiscount={couponDiscount}
            walletBalance={walletBalance}
            useWallet={useWallet}
            walletDeduction={walletDeduction}
            onCouponCodeChange={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
            onUseWalletChange={setUseWallet}
            onBack={() => goBack("review")}
            onConfirm={handleSubmit}
            error={error}
            submitting={submitting}
          />
        ) : null}

        {showPriceSummary ? (
          <BookingPriceSummary
            subtotal={subtotal}
            couponDiscount={couponDiscount}
            walletDeduction={walletDeduction}
          />
        ) : null}
      </div>

      <Link href={`/services/${slug}`} className="inline-block text-sm text-cyan hover:underline">
        ← Back to {staticService.shortTitle}
      </Link>
    </div>
  );
}
