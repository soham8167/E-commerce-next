"use client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { vegcardStore } from "../../../store/vegCardStore";
import Image from "next/image";

const Veggiescard = () => {
  const { products, increment, decrement } = vegcardStore();

  return (
    <>
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 max-w-7xl mx-auto auto-rows-max">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-[#FBF9F6] rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow relative flex flex-col h-full w-full"
            >
              {item.bestSeller && (
                <span className="absolute top-2 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Best Seller
                </span>
              )}

              <span className="absolute top-2 right-3 bg-orange-400 text-white text-xs px-1.5 py-1 rounded-full text-center z-10 w-10">
                {item.discount}% <br /> OFF
              </span>

              <div className="bg-white rounded-xl p-3 flex justify-center items-center h-32 mb-4 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-28 object-contain"
                />
              </div>

              <div className="text-center flex-grow">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {item.weight}
                </p>

                <div className="flex justify-center items-center gap-2 mt-3 flex-wrap">
                  <span className="line-through text-gray-400 text-xs md:text-sm">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-green-600 font-bold text-sm md:text-base">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4 flex-shrink-0">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <Minus size={14} />
                  </button>
                  <div className="border border-gray-300 px-3 py-1 rounded text-sm font-medium min-w-10 text-center">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => increment(item.id)}
                    className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button className="flex items-center justify-center gap-2 border border-orange-500 text-orange-500 px-3 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors text-sm font-medium w-full">
                  <ShoppingCart size={16} />
                  Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Veggiescard;
