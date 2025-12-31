"use client";

import { useEffect, useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: string;
  createdAt: string;
}

export default function ProfileDetails() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/users/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setUser(result.data);
    };

    fetchProfile();
  }, []);

  const profileData = [
    { label: "Title", value: "Mr" },
    { label: "First Name", value: user?.firstName ?? "-" },
    { label: "Last Name", value: user?.lastName ?? "-" },
    { label: "Phone No", value: user?.phoneNumber ?? "-" },
    { label: "Email", value: user?.email ?? "-" },
    { label: "Address", value: user?.address ?? "-" },
    { label: "Type", value: user?.role ?? "-" },
    {
      label: "Join",
      value: user
        ? new Date(user.createdAt).toDateString()
        : "-",
    },
  ];

  return (
    <section className="pt-6 px-4 sm:px-6 md:px-8 relative w-full max-w-md mx-auto">
      <div className="space-y-4 text-[#1A1C1E] text-sm sm:text-base">
        {profileData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-2"
          >
            <p className="font-medium">{item.label}</p>
            <p className="text-gray-700">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
