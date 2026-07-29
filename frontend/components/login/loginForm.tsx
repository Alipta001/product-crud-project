// "use client";

// import { AxiosInstance } from "@/api/axios/axios";
// import { endPoints } from "@/api/endPoints/endPoints";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";

// export default function LoginForm() {
//     const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     console.log(data);
//     try{
//         const response = await AxiosInstance.post(endPoints.auth.login, {email:data.email, password:data.password});
//         console.log(response.data);
//         if(response.data.token){
//             localStorage.setItem("token", response.data.token);
//         }
//         alert("Login successful!");
//         router.push('/home')
//          return response.data;
//     }catch(error){
//     console.log("Status:", error.response?.status);
//     console.log("Data:", error.response?.data);
//     console.log("Full Error:", error);
//         console.error("Error occurred while logging in:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-slate-800">
//         Create Account
//       </h2>

//       <p className="mt-2 text-slate-500">
//         Enter your information below
//       </p>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-8 space-y-5"
//       >
//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Email Address
//           </label>

//           <input
//             type="email"
//             placeholder="john@example.com"
//             {...register("email", {
//               required: "Email is required",
//             })}
//             className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
//           />

//           {errors.email && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="••••••••"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Minimum 6 characters",
//               },
//             })}
//             className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
//           />

//           {errors.password && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
//         >
//           {isSubmitting ? "Please wait..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await AxiosInstance.post(endPoints.auth.login, {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        Cookies.set("token", response.data.token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          // expires: 7, // 7 days
        });
      }

      alert("Login successful!");
      router.push("/home");
      return response.data;
    } catch (error: any) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800">Log In</h2>
      <p className="mt-2 text-slate-500">Enter your information below</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{String(errors.email.message)}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{String(errors.password.message)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {isSubmitting ? "Please wait..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}