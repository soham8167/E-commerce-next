"use client";

import logo from "../../assets/images/logo.png";
import a1 from "../../assets/images/path690.svg";
import a2 from "../../assets/images/path694.svg";
import a3 from "../../assets/images/path700.svg";
import a4 from "../../assets/images/path704.svg";
import a5 from "../../assets/images/image 97.svg";
import a6 from "../../assets/images/image 98.svg";
import a7 from "../../assets/images/image 99.svg";
import a8 from "../../assets/images/image 100.svg";
import a9 from "../../assets/images/path800.svg";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 px-4 sm:px-6 py-10 mt-10">

      {/* top decoration */}
      <div className="flex justify-center relative -top-10">
        <Image src={a9} alt="decor" />
      </div>

      {/* mailing list */}
      <div className="text-center mb-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">JOIN OUR MAILING LIST</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="px-4 py-2 border rounded-md w-full sm:w-64"
          />
          <button className="bg-[#7C6345] text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* footer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

        {/* column 1 */}
        <div>
          <Image src={logo} alt="logo" className="mb-4 w-32 mx-auto sm:mx-0" />
          <p className="text-sm text-[#7C6345]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="text-sm text-[#7C6345] mt-2">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        {/* column 2 */}
        <div className="flex flex-col gap-2">
          <p className="text-[#7C6345]">About Us</p>
          <p className="text-[#7C6345]">Careers</p>
          <p className="text-[#7C6345]">Social</p>
          <p className="text-[#7C6345]">Boxes</p>
          <p className="text-[#7C6345]">Fruits</p>
        </div>

        {/* column 3 */}
        <div className="flex flex-col gap-2">
          <p
            className="text-[#7C6345] cursor-pointer"
            onClick={() => router.push("/privacy")}
          >
            Privacy Policy
          </p>
          <p className="text-[#7C6345]">Terms & Conditions</p>
          <p className="text-[#7C6345]">Refund Policy</p>
          <p className="text-[#7C6345]">Faqs</p>
        </div>

        {/* column 4 */}
        <div>
          <p className="text-[#7C6345]">Contact us on</p>
          <h4 className="text-[#7C6345] font-bold text-lg">1111111111</h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 justify-center sm:justify-start">
            <p className="text-[#7C6345]">Follow our Journey</p>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {[a1, a2, a3, a4].map((icon, idx) => (
                <div key={idx} className="border bg-white rounded-full p-2">
                  <Image src={icon} alt={`icon-${idx}`} width={16} height={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            {[a5, a6, a7, a8].map((img, idx) => (
              <Image key={idx} src={img} alt={`img-${idx}`} width={32} height={32} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
