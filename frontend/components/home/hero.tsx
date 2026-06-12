// "use client";

// import { AxiosInstance, BaseURL } from "@/api/axios/axios";
// import { endPoints } from "@/api/endPoints/endPoints";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function ProductDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllProduct = async () => {
//     try {
//       const res = await AxiosInstance.get(endPoints.product.list);

//       console.log("Products:", res.data);

//       setProducts(res.data.data || []);
//     } catch (error) {
//       console.error(
//         "Error fetching products:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Soft Delete
//   const handleSoftDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to soft delete this product?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await AxiosInstance.put(
//         `${endPoints.product.softDelete}/${id}`
//       );

//       alert(res.data.message);

//       getAllProduct();
//     } catch (error) {
//       console.log(
//         "Error in Soft Delete:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Hard Delete
//   const handleHardDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "This action cannot be undone. Delete permanently?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const res = await AxiosInstance.delete(
//         `${endPoints.product.hardDelete}/${id}`
//       );

//       alert(res.data.message);

//       getAllProduct();
//     } catch (error) {
//       console.log(
//         "Error in Hard Delete:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     getAllProduct();
//   }, []);

//   const totalProducts = products.length;

//   const totalCategories = [
//     ...new Set(products.map((item) => item.category)),
//   ].length;

//   const totalStock = products.reduce(
//     (sum, item) => sum + Number(item.stock || 0),
//     0
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

//           <p className="mt-4 text-lg font-medium text-gray-700">
//             Loading Products...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10">
//       <div className="max-w-7xl mx-auto px-5">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10">

//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//               Product Dashboard
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Manage all your products in one place
//             </p>
//           </div>

//           <Link
//             href="/addProduct"
//             className="
//               mt-5 md:mt-0
//               bg-gradient-to-r
//               from-indigo-600
//               to-purple-600
//               hover:from-indigo-700
//               hover:to-purple-700
//               text-white
//               px-6
//               py-3
//               rounded-xl
//               shadow-lg
//               font-semibold
//               transition
//               hover:scale-105
//             "
//           >
//             + Add Product
//           </Link>
//         </div>

//         {/* Stats */}
//         <div className="grid md:grid-cols-3 gap-6 mb-10">

//           <div className="bg-white rounded-3xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-sm uppercase">
//               Total Products
//             </h3>

//             <p className="text-4xl font-bold text-indigo-600 mt-2">
//               {totalProducts}
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-sm uppercase">
//               Categories
//             </h3>

//             <p className="text-4xl font-bold text-green-600 mt-2">
//               {totalCategories}
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl shadow-lg p-6">
//             <h3 className="text-gray-500 text-sm uppercase">
//               Total Stock
//             </h3>

//             <p className="text-4xl font-bold text-orange-600 mt-2">
//               {totalStock}
//             </p>
//           </div>

//         </div>

//         {products.length === 0 ? (
//           <div className="bg-white rounded-3xl p-20 text-center shadow-lg">

//             <h2 className="text-3xl font-bold text-gray-700">
//               No Products Found
//             </h2>

//             <p className="text-gray-500 mt-3">
//               Create your first product to start managing inventory.
//             </p>

//             <Link
//               href="/addProduct"
//               className="
//                 inline-block
//                 mt-6
//                 bg-indigo-600
//                 hover:bg-indigo-700
//                 text-white
//                 px-6
//                 py-3
//                 rounded-xl
//                 font-semibold
//               "
//             >
//               Add Product
//             </Link>

//           </div>
//         ) : (

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

//             {products.map((product) => (

//               <div
//                 key={product._id}
//                 className="
//                   bg-white/80
//                   backdrop-blur-lg
//                   rounded-3xl
//                   overflow-hidden
//                   shadow-lg
//                   hover:shadow-2xl
//                   hover:-translate-y-2
//                   transition-all
//                   duration-300
//                 "
//               >

//                 {/* Product Image */}
//                 <div className="overflow-hidden">
//                   <img
//                     src={`${BaseURL}/uploads/${product.image}`}
//                     alt={product.name}
//                     className="
//                       w-full
//                       h-60
//                       object-cover
//                       hover:scale-110
//                       transition-transform
//                       duration-500
//                     "
//                   />
//                 </div>

//                 <div className="p-5">

//                   <div className="flex justify-between items-start gap-2">

//                     <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
//                       {product.name}
//                     </h3>

//                     <span
//                       className="
//                         bg-indigo-100
//                         text-indigo-700
//                         px-3
//                         py-1
//                         rounded-full
//                         text-xs
//                         font-semibold
//                         whitespace-nowrap
//                       "
//                     >
//                       {product.category}
//                     </span>

//                   </div>

//                   <p className="text-2xl font-bold text-green-600 mt-3">
//                     ₹{product.price}
//                   </p>

//                   <p className="text-gray-500 mt-3 text-sm line-clamp-2">
//                     {product.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-4">

//                     <span className="text-sm text-gray-600">
//                       Stock:
//                       <span className="font-bold ml-1">
//                         {product.stock}
//                       </span>
//                     </span>

//                     <span
//                       className="
//                         px-3
//                         py-1
//                         rounded-full
//                         text-xs
//                         font-semibold
//                         bg-green-100
//                         text-green-700
//                       "
//                     >
//                       Active
//                     </span>

//                   </div>

//                   {/* Action Buttons */}
//                   <div className="grid grid-cols-2 gap-3 mt-5">

//                     <Link
//                       href={`/editProducts/${product._id}`}
//                       className="
//                         text-center
//                         bg-blue-500
//                         hover:bg-blue-600
//                         text-white
//                         py-2.5
//                         rounded-xl
//                         font-medium
//                         transition
//                       "
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       onClick={() =>
//                         handleHardDelete(product._id)
//                       }
//                       className="
//                         bg-red-500
//                         hover:bg-red-600
//                         text-white
//                         py-2.5
//                         rounded-xl
//                         font-medium
//                         transition
//                       "
//                     >
//                       Delete
//                     </button>

//                     <button
//                       onClick={() =>
//                         handleSoftDelete(product._id)
//                       }
//                       className="
//                         col-span-2
//                         bg-yellow-500
//                         hover:bg-yellow-600
//                         text-white
//                         py-2.5
//                         rounded-xl
//                         font-medium
//                         transition
//                       "
//                     >
//                       Soft Delete
//                     </button>

//                   </div>

//                 </div>
//               </div>

//             ))}

//           </div>

//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { AxiosInstance, BaseURL } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Link from "next/link";
import {
FiEdit,
FiTrash2,
FiPackage,
FiGrid,
FiLayers,
} from "react-icons/fi";

export default function Hero({
products,
loading,
getAllProducts,
}) {
const handleSoftDelete = async (id) => {
try {
await AxiosInstance.put(
`${endPoints.product.softDelete}/${id}`
);


  getAllProducts();
} catch (error) {
  console.log(error);
}


};

const totalProducts = products.length;

const totalCategories = [
...new Set(products.map((item) => item.category)),
].length;

const totalStock = products.reduce(
(sum, item) => sum + Number(item.stock || 0),
0
);

if (loading) {
return ( <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 via-white to-indigo-100"> <div className="text-center"> <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

      <p className="mt-4 text-lg font-medium text-gray-700">
        Loading Products...
      </p>
    </div>
  </div>
);

}

return ( <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10"> <div className="max-w-7xl mx-auto px-5">

    {/* Header */}
    <div className="flex flex-col lg:flex-row justify-between items-center mb-12">

      <div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Product Dashboard
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Manage inventory, products and stock levels
        </p>

      </div>

      <div
        className="
          mt-6 lg:mt-0
          bg-white
          px-8
          py-5
          rounded-3xl
          shadow-lg
          border
          border-gray-100
        "
      >
        <p className="text-sm text-gray-500">
          Active Products
        </p>

        <p className="text-4xl font-bold text-indigo-600">
          {products.length}
        </p>
      </div>

    </div>

    {/* Stats Section */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-md
          border
          border-gray-100
          hover:shadow-xl
          transition
        "
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              Total Products
            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-2">
              {totalProducts}
            </h2>
          </div>

          <FiPackage
            size={40}
            className="text-indigo-500"
          />

        </div>
      </div>

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-md
          border
          border-gray-100
          hover:shadow-xl
          transition
        "
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              Categories
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {totalCategories}
            </h2>
          </div>

          <FiGrid
            size={40}
            className="text-green-500"
          />

        </div>
      </div>

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-md
          border
          border-gray-100
          hover:shadow-xl
          transition
        "
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              Total Stock
            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              {totalStock}
            </h2>
          </div>

          <FiLayers
            size={40}
            className="text-orange-500"
          />

        </div>
      </div>

    </div>

    {/* Empty State */}
    {products.length === 0 ? (
      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-20
          text-center
        "
      >
        <h2 className="text-3xl font-bold text-gray-700">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-3">
          Create your first product to get started.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

          <div
            key={product._id}
            className="
              group
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
              border
              border-gray-100
              flex
              flex-col
              h-full
            "
          >

            {/* Product Image */}
            <div className="relative overflow-hidden">

              <img
                src={
                  product.image
                    ? `${BaseURL}/uploads/${product.image}`
                    : "/no-image.png"
                }
                alt={product.name}
                className="
                  w-full
                  h-56
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/30
                  to-transparent
                "
              />

              <span
                className="
                  absolute
                  top-4
                  right-4
                  bg-indigo-600
                  text-white
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  shadow
                "
              >
                {product.category}
              </span>

            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">

              <h3 className="font-bold text-xl text-gray-800 line-clamp-1">
                {product.name}
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{product.price}
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-3
                  line-clamp-3
                  min-h-[72px]
                "
              >
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center">

                <div>
                  <p className="text-xs text-gray-400">
                    Available Stock
                  </p>

                  <p className="font-bold text-lg">
                    {product.stock}
                  </p>
                </div>

                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>

              </div>

              {/* Buttons */}
              <div className="mt-auto pt-6">

                <div className="grid grid-cols-2 gap-3">

                  <Link
                    href={`/editProducts/${product._id}`}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-center
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-500
                      to-blue-600
                      text-white
                      font-medium
                      hover:shadow-lg
                      transition
                    "
                  >
                    <FiEdit />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleSoftDelete(product._id)
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-red-500
                      to-red-600
                      text-white
                      font-medium
                      hover:shadow-lg
                      transition
                    "
                  >
                    <FiTrash2 />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
    )}

  </div>
</section>

);
}
