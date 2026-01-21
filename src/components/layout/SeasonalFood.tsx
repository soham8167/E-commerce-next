"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useSeasonalStore } from "../../store/store";
import { motion } from "framer-motion";
import Image from "next/image";

import made from "../../assets/images/made.svg";

const SeasonalFood = () => {
  const { products, increment, decrement } = useSeasonalStore();

  return (
    <div className="flex flex-wrap gap-8 justify-center m-5">
      {products.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-[#FBF9F6] w-60 rounded-2xl p-4 shadow-md relative"
        >
          {/* Best Seller */}
          {item.bestSeller && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
              Best Seller
            </span>
          )}

          {/* Discount */}
          <span className="absolute top-3 right-3 bg-orange-400 text-white text-xs px-2 py-1 rounded-full text-center z-10">
            {item.discount}% <br /> OFF
          </span>

          {/* Product Image */}
          <div className="flex justify-center mt-6">
            <Image
              src={item.image}
              alt={item.title}
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* Made in India */}
          <div className="flex justify-center mt-2">
            <Image src={made} alt="made in india" width={60} height={24} />
          </div>

          {/* Text */}
          <div className="text-center mt-4">
            <h3 className="font-medium text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.weight}</p>

            <div className="flex justify-center items-center gap-2 mt-2">
              <span className="line-through text-gray-400 text-sm">
                ₹{item.originalPrice}/-
              </span>
              <span className="text-green-500 font-bold text-lg">
                ₹{item.price}/-
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrement(item.id)}
                className="border rounded-full px-2 py-1 hover:bg-gray-100"
              >
                <Minus size={12} />
              </button>

              <div className="border px-2 py-0.5 rounded-sm font-medium">
                {item.quantity}
              </div>

              <button
                onClick={() => increment(item.id)}
                className="border rounded-full px-2 py-1 hover:bg-gray-100"
              >
                <Plus size={12} />
              </button>
            </div>

            <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-3 py-2 rounded-2xl hover:bg-orange-500 hover:text-white">
              <ShoppingCart size={15} />
              Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SeasonalFood;
