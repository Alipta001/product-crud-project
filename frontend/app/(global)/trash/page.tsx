"use client";

import { useEffect, useState } from "react";
import { AxiosInstance, BaseURL } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import {
  FiTrash2,
  FiRotateCcw,
  FiAlertTriangle,
} from "react-icons/fi";

export default function TrashPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrashProducts = async () => {
    try {
      const res = await AxiosInstance.get(
        endPoints.product.trash
      );

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrashProducts();
  }, []);

  const handleRestore = async (id) => {
    try {
      await AxiosInstance.put(
        `${endPoints.product.restore}/${id}`
      );

      getTrashProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete permanently?"
    );

    if (!confirmDelete) return;

    try {
      await AxiosInstance.delete(
        `${endPoints.product.hardDelete}/${id}`
      );

      getTrashProducts();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Trash Products...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-red-500
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <FiTrash2 size={28} />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-gray-800">
                Trash Bin
              </h1>

              <p className="text-gray-500 mt-2">
                Manage deleted products
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="mb-10">

          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-6
              border
              border-gray-100
            "
          >
            <h3 className="text-gray-500 uppercase text-sm">
              Deleted Products
            </h3>

            <p className="text-5xl font-bold text-red-500 mt-2">
              {products.length}
            </p>
          </div>

        </div>

        {products.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              p-20
              shadow-lg
              text-center
            "
          >

            <FiAlertTriangle
              size={80}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-3xl font-bold text-gray-700 mt-5">
              Trash is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              No deleted products found.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (

              <div
                key={product._id}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  flex
                  flex-col
                "
              >

                {/* Image */}
                <div className="relative">

                  <img
                    src={`${BaseURL}/uploads/${product.image}`}
                    alt={product.name}
                    className="
                      w-full
                      h-60
                      object-cover
                    "
                  />

                  <span
                    className="
                      absolute
                      top-4
                      right-4
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                    "
                  >
                    Deleted
                  </span>

                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">

                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ₹{product.price}
                  </p>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  <div className="mt-3 flex justify-between">

                    <span
                      className="
                        bg-indigo-100
                        text-indigo-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                      "
                    >
                      {product.category}
                    </span>

                    <span className="font-semibold">
                      Stock: {product.stock}
                    </span>

                  </div>

                  <div className="mt-auto pt-5 space-y-3">

                    <button
                      onClick={() =>
                        handleRestore(product._id)
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        py-3
                        rounded-xl
                        font-medium
                      "
                    >
                      <FiRotateCcw />
                      Restore Product
                    </button>

                    <button
                      onClick={() =>
                        handlePermanentDelete(
                          product._id
                        )
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-3
                        rounded-xl
                        font-medium
                      "
                    >
                      <FiTrash2 />
                      Delete Permanently
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