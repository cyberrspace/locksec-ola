"use client";

export default function ProfileDetails() {
  const profileData = [
    { label: "Title", value: "Mr" },
    { label: "First Name", value: "Joshua" },
    { label: "Last Name", value: "Triumphant" },
    { label: "Phone No", value: "07066638312" },
    { label: "Email", value: "Dontaskjoshua@gmail.com" },
    { label: "Address", value: "Block 2 Flat 4" },
    { label: "Type", value: "Business" },
    { label: "Join", value: "July 4 2023" },
  ];

  return (
    <section className="pt-6 px-4 sm:px-6 md:px-8 relative w-full max-w-md mx-auto">
      {/* Profile Info */}
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
