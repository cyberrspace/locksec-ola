"use client";

import { useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  address: string;
}

export default function UserPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUser(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-lg text-gray-700">
            Your Address: {user.address}
          </p>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}
