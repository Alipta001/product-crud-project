
"use client";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Link from "next/link";
import {
  FiSearch,
  FiTrash2,
  FiPlus,
  FiGrid,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter()


  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/80
        backdrop-blur-xl
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-xl
                shadow-lg
              "
            >
              A
            </div>

            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
               Dashboard
              </h1>

              <p className="text-xs text-gray-500 hidden sm:block">
                Inventory Management System
              </p>
            </div>

          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            <button
              onClick={() => {
               router.push('/home')
              }}
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                hover:bg-gray-100
                transition
                font-medium
              "
            >
              <FiGrid />
              Products
            </button>

            <Link
              href="/trash"
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-xl
                bg-amber-500
                hover:bg-amber-600
                text-white
                shadow-md
                transition
                font-medium
              "
            >
              <FiTrash2 />
              Trash
            </Link>

            <Link
              href="/addProduct"
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                hover:from-indigo-700
                hover:to-purple-700
                text-white
                shadow-md
                transition
                font-medium
              "
            >
              <FiPlus />
              Create Product
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
              lg:hidden
              p-2
              rounded-lg
              border
              border-gray-200
            "
          >
            {mobileMenu ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden pb-5">


            {/* Mobile Buttons */}
            <div className="grid grid-cols-1 gap-3">

              <button
                onClick={() => {
                    router.push('/home')
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                "
              >
                <FiGrid />
                All Products
              </button>

              <Link
                href="/trash"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-xl
                  bg-amber-500
                  text-white
                "
              >
                <FiTrash2 />
                Trash Products
              </Link>

              <Link
                href="/addProduct"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  text-white
                "
              >
                <FiPlus />
                Create Product
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}