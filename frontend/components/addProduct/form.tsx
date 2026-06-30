// "use client";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { endPoints } from "@/api/endPoints/endPoints";
// import { AxiosInstance } from "@/api/axios/axios";
// import { useState } from "react";
// import { useRouter } from "next/navigation";


// const schema = yup.object({
//   name: yup
//     .string()
//     .required("Product name is required")
//     .min(3, "Minimum 3 characters"),

//   price: yup
//     .number()
//     .typeError("Price must be a number")
//     .positive("Price must be greater than 0")
//     .required("Price is required"),

//   category: yup.string().required("Category is required"),

//   stock: yup
//     .number()
//     .typeError("Stock must be a number")
//     .min(0, "Stock cannot be negative")
//     .required("Stock is required"),

//   image: yup.mixed(),

//   description: yup
//     .string()
//     .required("Description is required")
//     .min(10, "Description should be at least 10 characters"),
// });

// export default function AddProductForm() {
//   const router = useRouter()
//   const [preview, setPreview] = useState(
//     "https://via.placeholder.com/300x300?text=Product+Image",
//   );
//   const [selectedFile, setSelectedFile] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       formData.append("name", data.name);
//       formData.append("price", data.price);
//       formData.append("category", data.category);
//       formData.append("stock", data.stock);
//       formData.append("description", data.description);
//         if (selectedFile) {
//     formData.append("image", selectedFile);
//   }


//       const res = await AxiosInstance.post(endPoints.product.create, formData);

//       console.log(res.data);

//       alert("Product Created Successfully");
//       router.push('/home')
//       reset();
//     } catch (error) {
//       console.log(
//         "Error Creating Product:",
//         error.response?.data || error.message,
//       );
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
//           <div className="grid lg:grid-cols-2">
//             {/* LEFT SIDE */}
//             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 flex flex-col justify-center items-center text-white">
//               <h2 className="text-3xl font-bold mb-6">Product Preview</h2>

//               <div className="bg-white p-4 rounded-3xl shadow-xl">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="w-72 h-72 object-cover rounded-2xl"
//                 />
//               </div>

//               <p className="mt-6 text-center text-indigo-100 max-w-sm">
//                 Create a new product with image, category, stock, and pricing
//                 details.
//               </p>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="p-8 lg:p-10">
//               <div className="mb-8">
//                 <h1 className="text-4xl font-bold text-gray-800">
//                   Add New Product
//                 </h1>

//                 <p className="text-gray-500 mt-2">
//                   Fill in the details below to create a product.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//                 {/* Product Name */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">
//                     Product Name
//                   </label>

//                   <input
//                     type="text"
//                     {...register("name")}
//                     placeholder="Enter product name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//                   />

//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.name?.message}
//                   </p>
//                 </div>

//                 {/* Price + Stock */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block mb-2 text-sm font-semibold text-gray-700">
//                       Price
//                     </label>

//                     <input
//                       type="number"
//                       {...register("price")}
//                       placeholder="Enter price"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//                     />

//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.price?.message}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block mb-2 text-sm font-semibold text-gray-700">
//                       Stock Quantity
//                     </label>

//                     <input
//                       type="number"
//                       {...register("stock")}
//                       placeholder="Enter stock"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//                     />

//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.stock?.message}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">
//                     Category
//                   </label>

//                   <select
//                     {...register("category")}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//                   >
//                     <option value="">Select Category</option>

//                     <option value="Electronics">Electronics</option>

//                     <option value="Fashion">Fashion</option>

//                     <option value="Books">Books</option>

//                     <option value="Home">Home</option>
//                   </select>

//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.category?.message}
//                   </p>
//                 </div>

//                 {/* Upload Image */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">
//                     Product Image
//                   </label>

//                   <label className="flex items-center justify-center h-36 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:bg-indigo-50 transition">
//                     <div className="text-center">
//                       <p className="font-semibold text-indigo-600">
//                         Upload Product Image
//                       </p>

//                       <p className="text-sm text-gray-500">JPG, PNG, WEBP</p>
//                     </div>

//                     <input
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];

//                         if (file) {
//                           setSelectedFile(file);
//                           setPreview(URL.createObjectURL(file));
//                         }
//                       }}
//                     />
//                   </label>

//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.image?.message}
//                   </p>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-gray-700">
//                     Description
//                   </label>

//                   <textarea
//                     rows="5"
//                     {...register("description")}
//                     placeholder="Enter product description"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none resize-none transition"
//                   />

//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.description?.message}
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4 pt-4">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
//                   >
//                     {isSubmitting ? "Creating..." : "Create Product"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       reset();
//                       setPreview(
//                         "https://via.placeholder.com/300x300?text=Product+Image",
//                       );
//                     }}
//                     className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { endPoints } from "@/api/endPoints/endPoints";
import { AxiosInstance } from "@/api/axios/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .min(3, "Minimum 3 characters"),

  brand: yup
    .string()
    .required("Brand is required")
    .min(2, "Minimum 2 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  category: yup.string().required("Category is required"),

  stock: yup
    .number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),

  image: yup.mixed(),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters"),
});

export default function AddProductForm() {
  const router = useRouter();
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x300?text=Product+Image",
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("brand", data.brand); // ✅ ADDED
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("description", data.description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await AxiosInstance.post(
        endPoints.product.create,
        formData
      );

      console.log(res.data);

      alert("Product Created Successfully");
      router.push("/home");
      reset();
    } catch (error) {
      console.log(
        "Error Creating Product:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl font-bold mb-6">Product Preview</h2>

              <div className="bg-white p-4 rounded-3xl shadow-xl">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-72 h-72 object-cover rounded-2xl"
                />
              </div>

              <p className="mt-6 text-center text-indigo-100 max-w-sm">
                Create a new product with image, category, stock, and pricing
                details.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                  Add New Product
                </h1>

                <p className="text-gray-500 mt-2">
                  Fill in the details below to create a product.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* PRODUCT NAME */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Product Name
                  </label>

                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.name?.message}
                  </p>
                </div>

                {/* BRAND (ADDED) */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Brand
                  </label>

                  <input
                    type="text"
                    {...register("brand")}
                    placeholder="Enter brand name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.brand?.message}
                  </p>
                </div>

                {/* PRICE + STOCK */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Price
                    </label>

                    <input
                      type="number"
                      {...register("price")}
                      placeholder="Enter price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.price?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Stock Quantity
                    </label>

                    <input
                      type="number"
                      {...register("stock")}
                      placeholder="Enter stock"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.stock?.message}
                    </p>
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <select
                    {...register("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                  </select>

                  <p className="text-red-500 text-sm mt-1">
                    {errors.category?.message}
                  </p>
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Product Image
                  </label>

                  <label className="flex items-center justify-center h-36 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:bg-indigo-50 transition">
                    <div className="text-center">
                      <p className="font-semibold text-indigo-600">
                        Upload Product Image
                      </p>
                      <p className="text-sm text-gray-500">JPG, PNG, WEBP</p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>

                  <p className="text-red-500 text-sm mt-1">
                    {errors.image?.message}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    {...register("description")}
                    placeholder="Enter product description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none resize-none transition"
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.description?.message}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                  >
                    {isSubmitting ? "Creating..." : "Create Product"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setPreview(
                        "https://via.placeholder.com/300x300?text=Product+Image",
                      );
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
                  >
                    Reset
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