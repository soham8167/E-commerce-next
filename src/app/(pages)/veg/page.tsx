"use client";

import Card from "@/components/layout/veggies/Card";
import Catagory from "@/components/layout/veggies/Catatory";

export default function Veggies() {
  return (
    <div className="pt-20 flex flex-col items-center mt-20">

      <div
        className="w-full max-w-275 h-40 sm:h-50 md:h-60 lg:h-70 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: "url('/image/Rectangle 122.png')" }}
      />

      {/* Category Section */}
      <div className="w-full px-3">
        <Catagory />
      </div>

      {/* Card Section */}
      <div className="w-full mt-15">
        <Card />
      </div>
    </div>
  );
}
