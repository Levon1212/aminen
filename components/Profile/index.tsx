"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import axiosInstance from "@/libs/axios";
import { toast } from "react-hot-toast";
import { getImagePath } from "@/libs/imageHelper";

type LessonStatus = "pending" | "confirmed" | "cancelled";

interface UserLesson {
  id: number;
  date: string | null;
  time: string | null;
  duration: number | null;
  status: LessonStatus | null;
  meeting_link: string | null;
}

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [data, setData] = useState({
    name: "",
    full_name: "",
    gender: "",
    country: "",
    city: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState<UserLesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLessonsLoading(true);
      axiosInstance
        .get<{ data: UserLesson[] }>("/profile/lessons")
        .then((res) => setLessons(res.data.data))
        .catch(() => {})
        .finally(() => setLessonsLoading(false));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        full_name: user.full_name || "",
        gender: user.gender || "",
        country: user.country || "",
        city: user.city || "",
        phone: user.phone || "",
      });
      if (user.avatar_url) {
        setPreview(getImagePath(user.avatar_url));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await axiosInstance.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      await refreshUser();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="rounded-lg bg-surface p-7.5 shadow-solid-8 xl:p-15">
      <h2 className="mb-10 text-3xl font-semibold text-ink">
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-line">
            {preview ? (
              <img src={preview} alt="Avatar Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-100 text-muted">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700">
            Change Avatar
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-ink">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-ink">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={data.full_name}
              onChange={handleChange}
              className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
            />
          </div>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-ink">
              Email (Read-only)
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full border-b border-line bg-transparent pb-3.5 text-muted outline-none"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-ink">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
            />
          </div>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-ink">
              Gender
            </label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full lg:w-1/2 flex gap-4">
             <div className="w-1/2">
                <label className="mb-2 block text-sm font-medium text-ink">
                    Country
                </label>
                <input
                    type="text"
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
                />
             </div>
             <div className="w-1/2">
                <label className="mb-2 block text-sm font-medium text-ink">
                    City
                </label>
                <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    className="w-full border-b border-line bg-transparent pb-3.5 focus:border-primary-600"
                />
             </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-primary-600 px-10 py-3 font-medium text-white hover:bg-primary-700"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="mt-12.5 border-t border-line pt-10">
        <h3 className="mb-6 text-xl font-semibold text-ink">
          Change Password
        </h3>
        {user.google_id && !user.avatar_url?.includes("password") ? (
          <div>
            <p className="mb-4 text-sm">
              Your account is linked with Google. You don&apos;t have a password set yet.
            </p>
            <button
              type="button"
              className="rounded-full border border-primary-600 bg-surface px-8 py-3 font-medium text-primary-600 hover:bg-primary-600 hover:text-white"
            >
              Set Initial Password
            </button>
          </div>
        ) : (
          <p className="text-sm">
            Password change functionality coming soon.
          </p>
        )}
      </div>

      <div className="mt-12.5 border-t border-line pt-10">
        <h3 className="mb-6 text-xl font-semibold text-ink">
          My Live Lessons
        </h3>
        {lessonsLoading ? (
          <p className="text-sm">Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p className="text-sm">
            You have no booked lessons yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex flex-col gap-3 rounded-lg border border-line p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-ink">
                    {lesson.date && lesson.time
                      ? new Date(`${lesson.date}T${lesson.time}Z`).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "—"}
                  </p>
                  <p className="text-sm">
                    Duration: {lesson.duration ? `${lesson.duration} min` : "—"}
                  </p>
                  <span
                    className={`mt-1 inline-block w-fit rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${
                      lesson.status === "confirmed"
                        ? "bg-success-soft text-success-ink"
                        : lesson.status === "cancelled"
                        ? "bg-error-soft text-error-ink"
                        : "bg-warning-soft text-warning-ink"
                    }`}
                  >
                    {lesson.status ?? "pending"}
                  </span>
                </div>
                <div className="shrink-0">
                  {lesson.meeting_link ? (
                    <a
                      href={lesson.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-success-ink px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-success-ink/90"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
                      </svg>
                      Join Meeting
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-5 py-2 text-xs font-medium text-muted">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Meeting link coming soon...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
