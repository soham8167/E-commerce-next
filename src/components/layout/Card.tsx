"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useStore } from "../../store/store";
import Image from "next/image";
import made from "../../assets/images/made.svg";
import { motion } from "framer-motion";

const Card = () => {
  const { products, increment, decrement } = useStore();

  return (
    <>
      <div className="flex flex-wrap gap-16 justify-center m-16">
        {products.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#FBF9F6] w-60 rounded-2xl p-4 shadow-md relative"
          >
            {/* Badges */}
            {item.bestSeller && (
              <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}

            <span className="absolute top-3 right-3 bg-orange-400 text-white text-xs px-2 py-1 rounded-full text-center">
              {item.discount}% <br /> OFF
            </span>

            {/* Product Image */}
            <div className="bg-[#FBF9F6] rounded-xl flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                className="h-40 w-40 object-contain"
              />
            </div>

            {/* Made in badge */}
            <div className="flex justify-center relative mt-2">
              <Image src={made} alt="made" width={60} height={20} />
            </div>

            {/* Info */}
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

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decrement(item.id)}
                  className="border rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                >
                  <Minus size={12} />
                </button>

                <div className="border px-2 py-0.5 rounded-sm font-medium">
                  {item.quantity}
                </div>

                <button
                  onClick={() => increment(item.id)}
                  className="border rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>

              <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-3 py-2 rounded-2xl hover:bg-orange-500 hover:text-white transition">
                <ShoppingCart size={15} />
                Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View more */}
      <div className="flex justify-center mt-6">
        <button className="bg-[#00814E] text-lg sm:text-xl md:text-2xl px-6 py-3 rounded-full text-white mb-10">
          View more
        </button>
      </div>
    </>
  );
};

export default Card;
