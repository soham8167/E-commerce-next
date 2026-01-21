"use client";

import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useNavStore } from "../../store/store";

const Navbar = () => {
  const router = useRouter();
  const { isOpen, toggleMenu } = useNavStore();

  const links = [
    { label: "ABOUT BHOOMI", path: "/about" },
    { label: "COMBOS", path: "/combo" },
    { label: "FRUITS", path: "/fruit" },
    { label: "VEGGIES", path: "/veg" },
    { label: "EXOTIC", path: "/exotic" },
    { label: "SUBSCRIPTIONS", path: "/subscription" },
    { label: "RECIPES", path: "/recipe" },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    toggleMenu();
  };

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 cursor-pointer">
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-x-0 top-18 z-50 md:hidden">
          <ul className="mx-12 bg-white rounded-2xl shadow-xl flex flex-col gap-2 text-center text-sm font-semibold">
            {links.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="py-2 cursor-pointer hover:text-[#5E8E2D]"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-white text-sm font-medium">
        {links.map((item) => (
          <li
            key={item.path}
            onClick={() => router.push(item.path)}
            className="cursor-pointer hover:underline"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
