"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import axiosInstance from "@/libs/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { ActivePackage, LessonPackage } from "@/types/lesson-package";
import {
  detectTimezone,
  formatInstantInZone,
  formatInZone,
  getTimezoneList,
  isValidTimezone,
  timezoneLabel,
  todayInZone,
  utcToZone,
} from "@/libs/timezone";

interface FormFields {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  date: string;
  country: string;
}

const EMPTY_FORM: FormFields = {
  full_name: "",
  email: "",
  phone_number: "",
  message: "",
  date: "",
  country: "",
};

type LessonStatus = "pending" | "confirmed" | "cancelled";

interface UserLesson {
  id: number;
  date: string | null;
  time: string | null;
  duration: number | null;
  status: LessonStatus | null;
  meeting_link: string | null;
  timezone: string | null;
}

const STATUS_CONFIG: Record<LessonStatus, { label: string; bg: string; text: string }> = {
  confirmed: {
    label: "Confirmed",
    bg: "bg-success-soft",
    text: "text-success-ink",
  },
  pending: {
    label: "Pending",
    bg: "bg-warning-soft",
    text: "text-warning-ink",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-error-soft",
    text: "text-error-ink",
  },
};

// Lessons are shown in the timezone the student booked in (stored on the booking)
function lessonTimezone(lesson: UserLesson): string {
  return isValidTimezone(lesson.timezone) ? (lesson.timezone as string) : detectTimezone();
}

// A lesson's start as an instant (ms). Comparisons with "now" are zone-free.
function lessonStartMs(lesson: UserLesson): number {
  return lesson.date ? utcToZone(lesson.date, lesson.time, "utc").toMillis() : Number.POSITIVE_INFINITY;
}

// Package expiry is an instant; show its date in the zone the student is working in
function formatExpiry(iso: string, tz: string): string {
  return `${formatInstantInZone(iso, tz, "d LLL yyyy")} (${tz})`;
}

function formatMoney(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

// ─── Packages Storefront ─────────────────────────────────────────────────────

const PackagesStorefront = ({
  packages,
  singlePrice,
  buyingId,
  onBuy,
}: {
  packages: LessonPackage[];
  singlePrice: number;
  buyingId: number | null;
  onBuy: (id: number) => void;
}) => {
  if (packages.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-ink">Lesson Packages</h2>
      <p className="mb-8 text-sm">
        Buy several lessons at once, then book them one at a time — no payment at each booking.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {packages.map((pkg) => {
          const fullPrice = singlePrice * pkg.lessons_count;
          const savings = fullPrice - pkg.price;
          const savingsPct = fullPrice > 0 ? Math.round((savings / fullPrice) * 100) : 0;
          return (
            <div
              key={pkg.id}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-1 text-sm">
                {pkg.lessons_count} live lessons · {pkg.lessons_count * 60} min total
              </p>
              {pkg.description && <p className="mt-3 text-sm">{pkg.description}</p>}

              <p className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
                {formatMoney(pkg.price)}
              </p>
              <p className="text-sm">{formatMoney(pkg.price_per_lesson)} per lesson</p>
              {savings > 0 && (
                <span className="mt-2 inline-block w-fit rounded-full bg-success-soft px-3 py-0.5 text-xs font-semibold text-success-ink">
                  Save {formatMoney(Math.round(savings * 100) / 100)} ({savingsPct}%)
                </span>
              )}
              <p className="mt-3 text-xs">Valid for {pkg.validity_days} days after purchase</p>

              <button
                type="button"
                onClick={() => onBuy(pkg.id)}
                disabled={buyingId !== null}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 text-sm font-medium text-white duration-300 ease-in-out hover:bg-primary-700 disabled:opacity-50"
              >
                {buyingId === pkg.id ? "Redirecting…" : "Buy package"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── My Upcoming Lessons Section ────────────────────────────────────────────

const MyUpcomingLessons = ({ lessons, loading }: { lessons: UserLesson[]; loading: boolean }) => {
  if (loading) {
    return (
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-ink xl:text-sectiontitle2">
          My Upcoming Live Lessons
        </h2>
        <div className="flex gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-36 w-72 animate-pulse rounded-2xl bg-primary-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (lessons.length === 0) return null;

  // Still upcoming until the lesson has ended (so "Join Meeting" stays available during it); soonest first
  const nowMs = DateTime.utc().toMillis();
  const upcoming = lessons
    .filter((l) => l.status !== "cancelled" && lessonStartMs(l) + (l.duration ?? 60) * 60_000 > nowMs)
    .sort((a, b) => lessonStartMs(a) - lessonStartMs(b));

  if (upcoming.length === 0) return null;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: -16 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-600/10 text-primary-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          My Upcoming Live Lessons
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {upcoming.map((lesson) => {
          const status = lesson.status ?? "pending";
          const cfg = STATUS_CONFIG[status];
          return (
            <div
              key={lesson.id}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              {/* Decorative gradient strip */}
              <div
                className={`h-1.5 w-full ${
                  status === "confirmed"
                    ? "bg-gradient-to-r from-success to-success-ink"
                    : status === "cancelled"
                    ? "bg-gradient-to-r from-error to-error-strong"
                    : "bg-gradient-to-r from-warning to-apricot"
                }`}
              />

              <div className="p-5">
                {/* Status badge */}
                <span
                  className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${cfg.bg} ${cfg.text}`}
                >
                  {cfg.label}
                </span>

                {/* Date / time */}
                <p className="mb-1 text-sm font-semibold text-ink leading-snug">
                  {formatInZone(lesson.date, lesson.time, lessonTimezone(lesson))}
                </p>
                <p className="mb-1 text-xs">{lessonTimezone(lesson)}</p>

                {/* Duration */}
                <p className="mb-4 text-xs">
                  {lesson.duration ? `${lesson.duration} min` : "Duration TBD"}
                </p>

                {/* Meeting button */}
                {lesson.meeting_link ? (
                  <a
                    href={lesson.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-success-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-success-ink/90"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
                    </svg>
                    Join Meeting
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-xs font-medium text-muted">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Meeting link coming soon...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ─── Main Form Component ─────────────────────────────────────────────────────

const PACKAGE_POLL_INTERVAL_MS = 3000;
const PACKAGE_POLL_ATTEMPTS = 10;

const LiveLessonForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState<FormFields>(EMPTY_FORM);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [timezone, setTimezone] = useState<string>(() => detectTimezone());
  const [loading, setLoading] = useState(false);
  const [lessonPrice, setLessonPrice] = useState<string>("30");
  const [lessons, setLessons] = useState<UserLesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [packages, setPackages] = useState<LessonPackage[]>([]);
  const [activePackage, setActivePackage] = useState<ActivePackage | null>(null);
  const [buyingId, setBuyingId] = useState<number | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  // Id of the latest slots request; older responses (e.g. for the previous timezone) are dropped
  const slotsRequest = useRef(0);

  // Browser-detected zone goes first; it is the default until the student changes it
  const timezoneOptions = useMemo(() => getTimezoneList(detectTimezone()), []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch packages for sale
  useEffect(() => {
    axiosInstance
      .get<{ data: LessonPackage[] }>("/lesson-packages")
      .then((res) => setPackages(res.data.data ?? []))
      .catch(() => {});
  }, []);

  const loadLessons = useCallback(() => {
    setLessonsLoading(true);
    axiosInstance
      .get<{ data: UserLesson[] }>("/profile/lessons")
      .then((res) => setLessons(res.data.data))
      .catch(() => {})
      .finally(() => setLessonsLoading(false));
  }, []);

  const loadActivePackage = useCallback(async (): Promise<ActivePackage | null> => {
    try {
      const res = await axiosInstance.get<{ data: ActivePackage | null }>("/profile/package");
      setActivePackage(res.data.data);
      return res.data.data;
    } catch {
      return null;
    }
  }, []);

  // Fetch the user's package balance. After a Stripe redirect the webhook may land a few
  // seconds later, so keep polling until the package shows up.
  useEffect(() => {
    if (!user) {
      setActivePackage(null);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const justPaid = params.get("package_purchase") === "success";
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async (attempt: number) => {
      const pkg = await loadActivePackage();
      if (cancelled || !justPaid) return;
      if (pkg) {
        setPaymentProcessing(false);
        toast.success("Your package is active — book your first lesson below.");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (attempt < PACKAGE_POLL_ATTEMPTS) {
        setPaymentProcessing(true);
        timer = setTimeout(() => poll(attempt + 1), PACKAGE_POLL_INTERVAL_MS);
      }
    };
    poll(1);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [user, loadActivePackage]);

  // Fetch dynamic price from settings
  useEffect(() => {
    axiosInstance
      .get<{ data: Record<string, string> }>("/settings")
      .then((res) => {
        const price = res.data.data?.live_lesson_price;
        if (price) setLessonPrice(price);
      })
      .catch(() => {});
  }, []);

  // Fetch user's booked lessons if authenticated
  useEffect(() => {
    if (!user) return;
    loadLessons();
  }, [user, loadLessons]);

  if (!hasMounted) return null;

  const today = todayInZone(timezone);

  // Slot labels are in `tz`, so they must be re-fetched whenever the timezone changes
  const fetchSlots = async (date: string, tz: string = timezone) => {
    const request = ++slotsRequest.current;
    setSlotsLoading(true);
    setAvailableSlots([]);
    setSelectedTime("");
    try {
      const { data } = await axiosInstance.get<string[]>(
        `/bookings/available-slots?date=${date}&timezone=${encodeURIComponent(tz)}`
      );
      if (request !== slotsRequest.current) return; // labels for a date/zone no longer selected
      setAvailableSlots(data);
      if (data.length === 0) {
        toast("No available slots for this date.", { icon: "📅" });
      }
    } catch {
      if (request === slotsRequest.current) toast.error("Failed to load available slots.");
    } finally {
      if (request === slotsRequest.current) setSlotsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFormData((prev) => ({ ...prev, date }));
    setAvailableSlots([]);
    setSelectedTime("");

    // No local weekend check: the teacher's Mon–Fri can fall on the student's Saturday or Sunday.
    // The API returns no slots for days the teacher doesn't work.
    if (!date) {
      slotsRequest.current++; // drop any in-flight response for the previous date
      setSlotsLoading(false);
      return;
    }

    fetchSlots(date);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tz = e.target.value;
    setTimezone(tz);
    setSelectedTime("");
    setAvailableSlots([]);
    if (formData.date) fetchSlots(formData.date, tz);
  };

  const selectedSummary =
    formData.date && selectedTime
      ? `${DateTime.fromISO(formData.date, { zone: "utc" }).toFormat("cccc d LLL")} ${selectedTime}, ${timezone}`
      : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyPackage = async (id: number) => {
    if (!user) {
      toast("Please sign in to buy a package.", { icon: "🔒" });
      router.push("/auth/signin?redirect=/live-lessons");
      return;
    }
    setBuyingId(id);
    try {
      const res = await axiosInstance.post("/checkout", { type: "package", id });
      window.location.href = res.data.url;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to start payment. Please try again.");
      if (error.response?.status === 409) loadActivePackage();
      setBuyingId(null);
    }
  };

  const handleBookWithPackage = async () => {
    try {
      const res = await axiosInstance.post("/private-lesson-schedules", {
        ...formData,
        time: selectedTime,
        timezone,
        use_package: true,
      });
      const left = res.data.lessons_remaining;
      toast.success(
        typeof left === "number"
          ? `Lesson booked! ${left} lesson${left === 1 ? "" : "s"} left in your package.`
          : "Lesson booked!"
      );
      setFormData(EMPTY_FORM);
      setSelectedTime("");
      setAvailableSlots([]);
      loadLessons();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("This slot was just taken — please pick another time.");
        if (formData.date) fetchSlots(formData.date);
      } else {
        toast.error(error.response?.data?.message || "Failed to book the lesson.");
      }
    } finally {
      // The balance changed either way (booked, or the package ran out / expired meanwhile)
      await loadActivePackage();
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      toast.error("Please select a time slot.");
      return;
    }
    setLoading(true);

    if (activePackage) {
      await handleBookWithPackage();
      return;
    }

    let scheduleId: number;
    try {
      const scheduleRes = await axiosInstance.post("/private-lesson-schedules", {
        ...formData,
        time: selectedTime,
        timezone,
      });
      scheduleId = scheduleRes.data.id;
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("This slot was just taken — please pick another time.");
        if (formData.date) fetchSlots(formData.date);
      } else {
        toast.error(error.response?.data?.message || "Failed to schedule lesson.");
      }
      setLoading(false);
      return;
    }

    try {
      const checkoutRes = await axiosInstance.post("/checkout", {
        type: "schedule",
        id: scheduleId,
      });
      window.location.href = checkoutRes.data.url;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to start payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <section id="live-lesson" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-primary-100/30" />
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" fill />
          </div>

          {/* My upcoming lessons — only shown when logged in */}
          {user && (
            <MyUpcomingLessons lessons={lessons} loading={lessonsLoading} />
          )}

          {paymentProcessing && !activePackage && (
            <div className="mb-10 rounded-xl border border-warning bg-warning-soft p-5 text-sm text-warning-ink">
              Payment is being processed — your package will appear here in a moment. If it
              doesn&apos;t, refresh the page shortly.
            </div>
          )}

          {activePackage ? (
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-success bg-success-soft p-5 text-success-ink">
              <p className="font-semibold">
                You have {activePackage.lessons_remaining} of {activePackage.lessons_total} lessons left
                {activePackage.package?.name ? ` in “${activePackage.package.name}”` : ""} · expires{" "}
                {formatExpiry(activePackage.expires_at, timezone)}
              </p>
              <p className="text-sm">Pick a time below — no payment needed.</p>
            </div>
          ) : (
            <PackagesStorefront
              packages={packages}
              singlePrice={Number(lessonPrice) || 0}
              buyingId={buyingId}
              onBuy={handleBuyPackage}
            />
          )}

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full rounded-lg bg-surface p-7.5 shadow-solid-8 md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-ink xl:text-sectiontitle2">
                Schedule a Live Lesson
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus:placeholder:text-ink focus-visible:outline-hidden lg:w-1/2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus:placeholder:text-ink focus-visible:outline-hidden lg:w-1/2"
                  />
                </div>

                {/* Row 2 */}
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus:placeholder:text-ink focus-visible:outline-hidden lg:w-1/2"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus:placeholder:text-ink focus-visible:outline-hidden lg:w-1/2"
                  />
                </div>

                {/* Row 3 — Date */}
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      min={today}
                      required
                      className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus-visible:outline-hidden"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="booking-timezone" className="mb-1 block text-xs font-medium">
                      Your timezone
                    </label>
                    <select
                      id="booking-timezone"
                      name="timezone"
                      value={timezone}
                      onChange={handleTimezoneChange}
                      className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600 focus-visible:outline-hidden"
                    >
                      {timezoneOptions.map((tz) => (
                        <option key={tz} value={tz}>
                          {timezoneLabel(tz)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4 — Time slots */}
                {slotsLoading && (
                  <p className="mb-7.5 text-sm text-muted">
                    Loading available slots…
                  </p>
                )}
                {!slotsLoading && availableSlots.length > 0 && (
                  <div className="mb-7.5">
                    <p className="mb-3 text-sm font-medium text-ink">
                      Select a time ({timezone}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                            selectedTime === slot
                              ? "border-primary-600 bg-primary-600 text-white"
                              : "border-line bg-transparent text-ink hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {selectedSummary && (
                      <p className="mt-4 text-sm font-semibold text-ink">
                        You&apos;re booking: {selectedSummary}
                      </p>
                    )}
                  </div>
                )}

                {/* Row 5 — Message */}
                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full border-b border-line bg-transparent focus:border-primary-600 focus:placeholder:text-ink focus-visible:outline-hidden"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 xl:justify-between">
                  <button
                    disabled={loading}
                    aria-label="schedule lesson"
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary-600 px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primary-700 disabled:opacity-50"
                  >
                    {activePackage
                      ? loading
                        ? "Booking…"
                        : "Book with package"
                      : loading
                      ? "Processing Payment…"
                      : `Schedule & Pay — $${lessonPrice}/hr`}
                    <svg className="fill-white" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-ink xl:text-sectiontitle2">
                Live Lessons
              </h2>

              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-ink">
                  Personalized Learning
                </h3>
                <p>Book a one-on-one live lesson with our experienced Armenian language tutors.</p>
              </div>
              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-ink">
                  Flexible Scheduling
                </h3>
                <p>Choose a time that works best for you and start your journey to mastering Armenian.</p>
              </div>

              {/* Price display */}
              <div className="mt-8 rounded-xl border border-line bg-surface/60 p-5 text-center shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest">
                  Price per session
                </p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink">
                  ${lessonPrice}
                  <span className="ml-1 text-lg font-normal">/ hr</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LiveLessonForm;
