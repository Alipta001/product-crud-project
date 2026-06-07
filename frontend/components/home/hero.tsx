"use client";

import { AxiosInstance, BaseURL } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProduct = async () => {
    try {
      const res = await AxiosInstance.get(endPoints.product.list);

      console.log("Products:", res.data);

      setProducts(res.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Soft Delete
  const handleSoftDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to soft delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await AxiosInstance.put(
        `${endPoints.product.softDelete}/${id}`
      );

      alert(res.data.message);

      getAllProduct();
    } catch (error) {
      console.log(
        "Error in Soft Delete:",
        error.response?.data || error.message
      );
    }
  };

  // Hard Delete
  const handleHardDelete = async (id) => {
    const confirmDelete = window.confirm(
      "This action cannot be undone. Delete permanently?"
    );

    if (!confirmDelete) return;

    try {
      const res = await AxiosInstance.delete(
        `${endPoints.product.hardDelete}/${id}`
      );

      alert(res.data.message);

      getAllProduct();
    } catch (error) {
      console.log(
        "Error in Hard Delete:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const totalProducts = products.length;

  const totalCategories = [
    ...new Set(products.map((item) => item.category)),
  ].length;

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.stock || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Product Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your products in one place
            </p>
          </div>

          <Link
            href="/addProduct"
            className="
              mt-5 md:mt-0
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              hover:from-indigo-700
              hover:to-purple-700
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              font-semibold
              transition
              hover:scale-105
            "
          >
            + Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm uppercase">
              Total Products
            </h3>

            <p className="text-4xl font-bold text-indigo-600 mt-2">
              {totalProducts}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm uppercase">
              Categories
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {totalCategories}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 text-sm uppercase">
              Total Stock
            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-2">
              {totalStock}
            </p>
          </div>

        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-lg">

            <h2 className="text-3xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Create your first product to start managing inventory.
            </p>

            <Link
              href="/addProduct"
              className="
                inline-block
                mt-6
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Add Product
            </Link>

          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (

              <div
                key={product._id}
                className="
                  bg-white/80
                  backdrop-blur-lg
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={`${BaseURL}/uploads/${product.image}`}
                    alt={product.name}
                    className="
                      w-full
                      h-60
                      object-cover
                      hover:scale-110
                      transition-transform
                      duration-500
                    "
                  />
                </div>

                <div className="p-5">

                  <div className="flex justify-between items-start gap-2">

                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>

                    <span
                      className="
                        bg-indigo-100
                        text-indigo-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      {product.category}
                    </span>

                  </div>

                  <p className="text-2xl font-bold text-green-600 mt-3">
                    ₹{product.price}
                  </p>

                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <span className="text-sm text-gray-600">
                      Stock:
                      <span className="font-bold ml-1">
                        {product.stock}
                      </span>
                    </span>

                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        bg-green-100
                        text-green-700
                      "
                    >
                      Active
                    </span>

                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <Link
                      href={`/editProducts/${product._id}`}
                      className="
                        text-center
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        py-2.5
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleHardDelete(product._id)
                      }
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-2.5
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        handleSoftDelete(product._id)
                      }
                      className="
                        col-span-2
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        py-2.5
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Soft Delete
                    </button>

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