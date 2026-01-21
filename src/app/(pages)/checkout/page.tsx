"use client";

import Image from "next/image";
import i1 from "@/assets/images/i1.svg";
import i2 from "@/assets/images/i2.png";
import i3 from "@/assets/images/i3.png";
import i4 from "@/assets/images/i4.png";
import { useCartStore } from "@/store/cardStore";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [selectedAddress, setSelectedAddress] = useState("home");

  const subtotal = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * i.quantity,
    0,
  );

  const discount = 0;
  const delivery = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax - discount;

  const addresses = [
    { id: "home", label: "Home", value: "Kolkata, 700000" },
    { id: "office", label: "Office", value: "Mumbai, 400000" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 md:py-16 mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 md:mb-12 ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Complete your order and proceed to payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-6">
              {/* DELIVERY ADDRESS SECTION */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={i1}
                      alt="address"
                      width={20}
                      height={24}
                      className="w-5 h-6"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="w-5 h-5 text-green-600 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {addr.label}
                        </p>
                        <p className="text-sm text-gray-500">{addr.value}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <button className="w-full py-3 px-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors">
                  + Add New Address
                </button>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Order Notes
                  </label>
                  <textarea
                    placeholder="Add any special instructions for your order"
                    className="w-full border-2 border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none h-24"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD SECTION */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 border border-slate-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Cash on Delivery */}
                  <label
                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      selectedPayment === "cod"
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPayment === "cod"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="absolute top-4 left-4 w-5 h-5 cursor-pointer"
                    />
                    <div className="flex flex-col items-center text-center pt-2">
                      <Image
                        src={i2}
                        alt="cod"
                        width={40}
                        height={40}
                        className="mb-3"
                      />
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay when you receive
                      </p>
                    </div>
                  </label>

                  {/* Wallet */}
                  <label
                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      selectedPayment === "wallet"
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={selectedPayment === "wallet"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="absolute top-4 left-4 w-5 h-5 cursor-pointer"
                    />
                    <div className="flex flex-col items-center text-center pt-2">
                      <Image
                        src={i3}
                        alt="wallet"
                        width={40}
                        height={40}
                        className="mb-3"
                      />
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        Bhoomi Wallet
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        ₹1050 Available
                      </p>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      selectedPayment === "card"
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="absolute top-4 left-4 w-5 h-5 cursor-pointer"
                    />
                    <div className="flex flex-col items-center text-center pt-2">
                      <Image
                        src={i4}
                        alt="card"
                        width={40}
                        height={40}
                        className="mb-3"
                      />
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        Debit/Credit Card
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        All cards accepted
                      </p>
                    </div>
                  </label>
                </div>

                {selectedPayment === "wallet" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-900">
                      You'll use{" "}
                      <span className="font-semibold">
                        ₹{Math.min(1050, total)}
                      </span>{" "}
                      from your wallet for this order.
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-3 px-4 border-2 border-slate-200 text-gray-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm md:text-base">
                    + Add Funds
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all text-sm md:text-base">
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 sticky top-24">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    Estimated Delivery
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    1st January 2025
                  </p>
                </div>

                <div className="space-y-4 pb-4 border-b-2 border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-green-600">
                        -₹{discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-gray-900">
                      {delivery === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${delivery.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold text-gray-900">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 mb-8 pb-6 border-b-2 border-slate-100">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <button className="w-full py-4 px-6 border-2 border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors text-base md:text-lg">
                  Continue Shopping
                </button>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
