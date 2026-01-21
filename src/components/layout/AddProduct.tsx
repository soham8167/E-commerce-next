"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import img2 from "../../assets/images/Group 112.png";
import img3 from "../../assets/images/Group 113.png";

const AddProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {/* SECTION BACKGROUND */}
      <div
        className="bg-cover bg-center py-16 px-4"
        style={{
          backgroundImage: "url('/image/Rectangle 115-DFt98VWB.png')",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Value Added Products
        </h2>

        <div className="flex flex-col lg:flex-row justify-center gap-6">

          {/* CARD 1 */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 
                       bg-cover bg-center w-full sm:w-[26rem] md:w-[30rem]"
            style={{
              backgroundImage: "url('/image/Rectangle 168.png')",
            }}
          >
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-[#EF7F00]">FARM FRESH</h3>
              <h2 className="text-4xl font-bold text-black">GOLD</h2>

              <p className="text-gray-700 mt-4 text-sm sm:text-base">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur.
              </p>

              <button className="bg-[#FBF9F6] text-[#00814E] px-5 py-2 rounded-full mt-6 font-semibold">
                Shop Now!
              </button>
            </div>

            <Image
              src={img2}
              alt="Gold Product"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          {/* CARD 2 */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 
                       bg-cover bg-center w-full sm:w-[26rem] md:w-[30rem]"
            style={{
              backgroundImage: "url('/image/Rectangle 169.png')",
            }}
          >
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">FARM FRESH</h3>
              <h2 className="text-4xl font-bold text-black">PREMIUM</h2>

              <p className="text-white mt-4 text-sm sm:text-base">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur.
              </p>

              <button className="bg-[#FBF9F6] text-[#00814E] px-5 py-2 rounded-full mt-6 font-semibold">
                Shop Now!
              </button>
            </div>

            <Image
              src={img3}
              alt="Premium Product"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default AddProduct;
