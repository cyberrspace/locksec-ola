
"use client";

export default function ProfileDetails() {
  return (
    <section className="pt-6 relative">
      {/* Profile Info */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <p>Title</p>
          <p>Mr</p>
        </div>

        <div className="flex justify-between items-center">
          <p>First Name</p>
          <p>Joshua</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Last Name</p>
          <p>Triumphant</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Phone No</p>
          <p>07066638312</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Email</p>
          <p>Dontaskjoshua@gmail.com</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Address</p>
          <p>Block 2 Flat 4</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Type</p>
          <p>Business</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Join</p>
          <p>July 4 2023</p>
        </div>
      </div>

      {/* Line toward the base (visually lower) */}
      <div className="flex justify-center mt-64 mb-2">
        <div className="w-[148px] h-[5px] bg-[#000000] rounded-full" />
      </div>
    </section>
  );
}
