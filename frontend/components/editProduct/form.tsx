"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { AxiosInstance, BaseURL } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

const schema = yup.object({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
  image: yup.mixed(),
  description: yup.string().required("Description is required"),
});

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getProduct = async () => {
    try {
      const res = await AxiosInstance.get(
        `${endPoints.product.details}/${id}`
      );

      const product = res.data.data;

      reset({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description,
      });

      if (product.image) {
        setPreview(`${BaseURL}/${product.image}`);
      }
    } catch (error) {
      console.log(
        "Error fetching product:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("description", data.description);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await AxiosInstance.put(
        `${endPoints.product.update}/${id}`,
        formData
      );

      alert("Product Updated Successfully");

      router.push("/");
    } catch (error) {
      console.log(
        "Update Error:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading Product...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Product Preview
              </h2>

              <div className="bg-white p-4 rounded-3xl shadow-lg">
                <img
                  src={
                    preview ||
                    "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt="Product Preview"
                  className="w-72 h-72 object-cover rounded-2xl"
                />
              </div>

              <p className="mt-6 text-center text-indigo-100 max-w-sm">
                Update product details, category, stock, price,
                description, and image.
              </p>
            </div>

            <div className="p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                  Edit Product
                </h1>

                <p className="text-gray-500 mt-2">
                  Update your product information.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Product Name
                  </label>

                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.name?.message}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Price
                    </label>

                    <input
                      type="number"
                      {...register("price")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.price?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Stock
                    </label>

                    <input
                      type="number"
                      {...register("stock")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.stock?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <select
                    {...register("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">
                      Electronics
                    </option>
                    <option value="Fashion">
                      Fashion
                    </option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                  </select>

                  <p className="text-red-500 text-sm mt-1">
                    {errors.category?.message}
                  </p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Change Product Image
                  </label>

                  <label className="flex items-center justify-center h-36 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:bg-indigo-50 transition">
                    <div className="text-center">
                      <p className="font-semibold text-indigo-600">
                        Upload New Image
                      </p>

                      <p className="text-sm text-gray-500">
                        JPG, PNG, WEBP
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      {...register("image")}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setPreview(
                            URL.createObjectURL(
                              e.target.files[0]
                            )
                          );
                        }
                      }}
                    />
                  </label>

                  <p className="text-red-500 text-sm mt-1">
                    {errors.image?.message}
                  </p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    {...register("description")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none resize-none transition"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.description?.message}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                  >
                    {isSubmitting
                      ? "Updating..."
                      : "Update Product"}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}