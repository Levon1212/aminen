"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/libs/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";

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
}

const STATUS_CONFIG: Record<LessonStatus, { label: string; bg: string; text: string }> = {
  confirmed: {
    label: "Confirmed",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
  },
};

function formatLessonDate(date: string | null, time: string | null): string {
  if (!date) return "—";
  const timeStr = time ? (time.length === 5 ? `${time}:00` : time) : "00:00:00";
  return new Date(`${date}T${timeStr}Z`).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── My Upcoming Lessons Section ────────────────────────────────────────────

const MyUpcomingLessons = ({ lessons, loading }: { lessons: UserLesson[]; loading: boolean }) => {
  if (loading) {
    return (
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
          My Upcoming Live Lessons
        </h2>
        <div className="flex gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-36 w-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (lessons.length === 0) return null;

  const upcoming = lessons.filter((l) => l.status !== "cancelled");

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
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
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
              className="group relative overflow-hidden rounded-2xl border border-stroke bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 dark:border-strokedark dark:bg-blacksection"
            >
              {/* Decorative gradient strip */}
              <div
                className={`h-1.5 w-full ${
                  status === "confirmed"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                    : status === "cancelled"
                    ? "bg-gradient-to-r from-red-400 to-rose-500"
                    : "bg-gradient-to-r from-amber-400 to-orange-400"
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
                <p className="mb-1 text-sm font-semibold text-black dark:text-white leading-snug">
                  {formatLessonDate(lesson.date, lesson.time)}
                </p>

                {/* Duration */}
                <p className="mb-4 text-xs text-body-color dark:text-body-color-dark">
                  {lesson.duration ? `${lesson.duration} min` : "Duration TBD"}
                </p>

                {/* Meeting button */}
                {lesson.meeting_link ? (
                  <a
                    href={lesson.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
                    </svg>
                    Join Meeting
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
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

const LiveLessonForm = () => {
  const { user } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState<FormFields>(EMPTY_FORM);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessonPrice, setLessonPrice] = useState<string>("30");
  const [lessons, setLessons] = useState<UserLesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    setLessonsLoading(true);
    axiosInstance
      .get<{ data: UserLesson[] }>("/profile/lessons")
      .then((res) => setLessons(res.data.data))
      .catch(() => {})
      .finally(() => setLessonsLoading(false));
  }, [user]);

  if (!hasMounted) return null;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date().toLocaleDateString("en-CA");

  const fetchSlots = async (date: string) => {
    setSlotsLoading(true);
    setAvailableSlots([]);
    setSelectedTime("");
    try {
      const { data } = await axiosInstance.get<string[]>(
        `/bookings/available-slots?date=${date}&timezone=${encodeURIComponent(timezone)}`
      );
      setAvailableSlots(data);
      if (data.length === 0) {
        toast("No available slots for this date.", { icon: "📅" });
      }
    } catch {
      toast.error("Failed to load available slots.");
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFormData((prev) => ({ ...prev, date }));
    setDateError("");
    setAvailableSlots([]);
    setSelectedTime("");

    if (!date) return;

    const dow = new Date(`${date}T12:00:00`).getDay();
    if (dow === 0 || dow === 6) {
      setDateError("Please select a weekday (Monday – Friday).");
      return;
    }

    fetchSlots(date);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      toast.error("Please select a time slot.");
      return;
    }
    setLoading(true);

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
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]" />
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" className="dark:hidden" fill />
            <Image src="/images/shape/shape-dotted-dark.svg" alt="Dotted" className="hidden dark:block" fill />
          </div>

          {/* My upcoming lessons — only shown when logged in */}
          {user && (
            <MyUpcomingLessons lessons={lessons} loading={lessonsLoading} />
          )}

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
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
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
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
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
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
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee"
                    />
                    {dateError && (
                      <p className="mt-1 text-xs text-red-500">{dateError}</p>
                    )}
                  </div>
                  <div className="hidden w-full lg:block lg:w-1/2" />
                </div>

                {/* Row 4 — Time slots */}
                {slotsLoading && (
                  <p className="mb-7.5 text-sm text-black/60 dark:text-white/60">
                    Loading available slots…
                  </p>
                )}
                {!slotsLoading && availableSlots.length > 0 && (
                  <div className="mb-7.5">
                    <p className="mb-3 text-sm font-medium text-black dark:text-white">
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
                              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                              : "border-stroke bg-transparent text-black hover:border-black hover:bg-black hover:text-white dark:border-strokedark dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
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
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 xl:justify-between">
                  <button
                    disabled={loading}
                    aria-label="schedule lesson"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark disabled:opacity-50"
                  >
                    {loading ? "Processing Payment…" : `Schedule & Pay — $${lessonPrice}/hr`}
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
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Live Lessons
              </h2>

              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Personalized Learning
                </h3>
                <p>Book a one-on-one live lesson with our experienced Armenian language tutors.</p>
              </div>
              <div className="mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Flexible Scheduling
                </h3>
                <p>Choose a time that works best for you and start your journey to mastering Armenian.</p>
              </div>

              {/* Price display */}
              <div className="mt-8 rounded-xl border border-stroke bg-white/60 p-5 text-center shadow-sm dark:border-strokedark dark:bg-black/30 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-body-color dark:text-body-color-dark">
                  Price per session
                </p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-black dark:text-white">
                  ${lessonPrice}
                  <span className="ml-1 text-lg font-normal text-body-color dark:text-body-color-dark">/ hr</span>
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
