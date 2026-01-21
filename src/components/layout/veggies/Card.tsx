"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { vegStore } from "../../../store/vegstore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const Card = () => {
  const { products, increment, decrement } = vegStore();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-8 justify-center m-5">
      {products.map((item, index) => {
        // Disabled product
        if (index === 1) {
          return (
            <div
              key={item.id}
              onClick={() => alert("Product not available")}
              className="bg-[#FBF9F6] border-[#A59786] w-60 rounded-2xl p-4 shadow-md relative cursor-not-allowed opacity-80 transition"
            >
              {item.bestSeller && (
                <span className="absolute top-3 left-3 bg-[#EF7F00] text-white text-xs px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}

              <span className="absolute top-1 right-2 bg-orange-400 text-white text-xs px-1.5 py-1 rounded-full text-center">
                {item.discount}% <br /> OFF
              </span>

              <div className="bg-white rounded-xl flex justify-center p-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>

              <div className="flex justify-center relative -mt-4 gap-3">
                {item.icon2 && (
                  <div className="w-8 h-8 rounded-full bg-[#FFF4E3] shadow flex items-center justify-center">
                    <Image
                      src={item.icon2}
                      alt=""
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="w-8 h-8 rounded-full border border-[#A59786] shadow flex items-center justify-center">
                  <Image
                    src={item.icon1}
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="text-center mt-2">
                <h3 className="text-black">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.weight}</p>
              </div>

              <div className="text-[#E27148] flex justify-center text-xl mt-3 font-semibold">
                <p>{item.msg}</p>
              </div>
            </div>
          );
        }

        // Normal products
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-[#FBF9F6] border-[#A59786] w-60 rounded-2xl p-4 shadow-md relative hover:scale-105 transition cursor-pointer">
              {item.bestSeller && (
                <span className="absolute top-3 left-3 bg-[#EF7F00] text-white text-xs px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}

              <span className="absolute top-1 right-2 bg-orange-400 text-white text-xs px-1.5 py-1 rounded-full text-center">
                {item.discount}% <br /> OFF
              </span>

              {/* Image */}
              <div className="bg-white rounded-xl flex justify-center p-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>

              {/* Icons */}
              <div className="flex justify-center relative -mt-4 gap-3">
                {item.icon2 && (
                  <div className="w-8 h-8 rounded-full bg-[#FFF4E3] shadow flex items-center justify-center">
                    <Image
                      src={item.icon2}
                      alt=""
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="w-8 h-8 rounded-full border border-[#A59786] shadow flex items-center justify-center">
                  <Image
                    src={item.icon1}
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center mt-4">
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.weight}</p>

                <div className="flex justify-center items-center gap-2 mt-2">
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.originalPrice}/-
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    ₹{item.price}/-
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div
                className="flex items-center justify-between mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decrement(item.id)}
                    className="border rounded-full px-1 py-1 hover:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>

                  <div className="border px-2 py-0.5 rounded-sm font-medium">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => increment(item.id)}
                    className="border rounded-full px-1 py-1 hover:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="flex items-center gap-2 border border-orange-500 px-3 py-2 rounded-2xl hover:bg-orange-50"
                >
                  <ShoppingCart size={16} /> Cart
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Card;
