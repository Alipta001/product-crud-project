// "use client"
// import { AxiosInstance } from "@/api/axios/axios";
// import { endPoints } from "@/api/endPoints/endPoints";
// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar({setSearchedProducts}) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const handleSearch = async() =>{
//     try{
//       const response = await AxiosInstance.get(`${endPoints.product.search}?name=${searchQuery}`);
//       console.log("Search Results:", response.data);
//       setSearchedProducts(response.data)
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };
//   return (
//     <nav className="bg-white shadow-md border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
//             A
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Admin Panel
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="px-4 py-2 bg-transparent outline-none w-72"
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button 
//             className="bg-indigo-600 text-white px-5 py-2 hover:bg-indigo-700 transition-all"
//             onClick={handleSearch}
//           >
//             Search
//           </button>
//         </div>

//         {/* Navigation */}
//         <div>
//           <ul className="flex items-center gap-4">
//             <li>
//               <Link
//                 href="/addProduct"
//                 className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium"
//               >
//                 Create Product
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/home"
//                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-medium"
//               >
//                 All Products
//               </Link>
//             </li>
//           </ul>
//         </div>

//       </div>
//     </nav>
//   );
// }


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

export default function HomeNavbar({
  setProducts,
  getAllProducts,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

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

          {/* Search Bar Desktop */}
         {/* Search Bar Desktop */}
<div className="hidden lg:flex w-full max-w-lg mx-6">

  <div
    className="
      flex
      items-center
      w-full
      bg-white
      border
      border-gray-200
      rounded-xl
      overflow-hidden
      shadow-sm
    "
  >

    <div className="px-3 text-gray-400">
      <FiSearch size={16} />
    </div>

    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) =>
        setSearchQuery(e.target.value)
      }
      onKeyDown={(e) =>
        e.key === "Enter" && handleSearch()
      }
      className="
        flex-1
        py-2.5
        text-sm
        outline-none
        bg-transparent
      "
    />

    <button
      onClick={handleSearch}
      className="
        px-5
        py-2.5
        bg-gradient-to-r
        from-indigo-600
        to-purple-600
        text-white
        text-sm
        font-medium
        hover:opacity-90
        transition
      "
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

            {/* Search */}
            <div
              className="
                flex
                items-center
                bg-white
                border
                border-gray-200
                rounded-xl
                overflow-hidden
                shadow-sm
                mb-4
              "
            >

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
                className="
                  flex-1
                  py-3
                  outline-none
                "
              />

              <button
                onClick={handleSearch}
                className="
                  px-4
                  py-3
                  bg-indigo-600
                  text-white
                "
              >
                Search
              </button>

            </div>

            {/* Mobile Buttons */}
            <div className="grid grid-cols-1 gap-3">

              <button
                onClick={() => {
                  setSearchQuery("");
                  getAllProducts();
                  setMobileMenu(false);
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