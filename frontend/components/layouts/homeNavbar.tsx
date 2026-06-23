"use client";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiTrash2,
  FiPlus,
  FiGrid,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";

export default function HomeNavbar({
  setProducts,
  getAllProducts,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        getAllProducts();
        return;
      }

      const response = await AxiosInstance.get(
        `${endPoints.product.search}?name=${searchQuery}`
      );

      setProducts(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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

          {/* Desktop Search */}
          <div className="hidden lg:flex w-full max-w-lg mx-6">
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-3 text-gray-400">
                <FiSearch size={16} />
              </div>

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch()
                }
                className="flex-1 py-2.5 text-sm outline-none bg-transparent"
              />

              <button
                onClick={handleSearch}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            <button
              onClick={() => {
                setSearchQuery("");
                getAllProducts();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition font-medium"
            >
              <FiGrid />
              Products
            </button>

            <Link
              href="/trash"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-md transition font-medium"
            >
              <FiTrash2 />
              Trash
            </Link>

            <Link
              href="/addProduct"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition font-medium"
            >
              <FiPlus />
              Create Product
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-md transition font-medium"
            >
              <FiLogOut />
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-2 rounded-lg border border-gray-200"
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

            {/* Mobile Search */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4">
              <div className="px-3 text-gray-400">
                <FiSearch />
              </div>

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="flex-1 py-3 outline-none"
              />

              <button
                onClick={handleSearch}
                className="px-4 py-3 bg-indigo-600 text-white"
              >
                Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">

              <button
                onClick={() => {
                  setSearchQuery("");
                  getAllProducts();
                  setMobileMenu(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 bg-white"
              >
                <FiGrid />
                All Products
              </button>

              <Link
                href="/trash"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-white"
              >
                <FiTrash2 />
                Trash Products
              </Link>

              <Link
                href="/addProduct"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                <FiPlus />
                Create Product
              </Link>

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white"
              >
                <FiLogOut />
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}