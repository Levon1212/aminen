"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import axiosInstance from "@/libs/axios";
import { toast } from "react-hot-toast";
import { getImagePath } from "@/libs/imageHelper";

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
    <div className="animate_top rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15">
      <h2 className="mb-10 text-3xl font-semibold text-black dark:text-white">
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-stroke dark:border-strokedark">
            {preview ? (
              <img src={preview} alt="Avatar Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primaryho">
            Change Avatar
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={data.full_name}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
          </div>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Email (Read-only)
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full border-b border-stroke bg-transparent pb-3.5 text-gray-500 outline-none dark:border-strokedark"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
          </div>
        </div>

        <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
          <div className="w-full lg:w-1/2">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Gender
            </label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full lg:w-1/2 flex gap-4">
             <div className="w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Country
                </label>
                <input
                    type="text"
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
                />
             </div>
             <div className="w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    City
                </label>
                <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
                />
             </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-black px-10 py-3 font-medium text-white hover:bg-blackho dark:bg-btndark"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
