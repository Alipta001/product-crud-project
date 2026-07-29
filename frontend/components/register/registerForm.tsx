
"use client";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await AxiosInstance.post(
        endPoints.auth.register,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.success) {
        alert("Registration Successful!");
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div>

      <h2 className="text-4xl font-bold text-slate-800">
        Create Account
      </h2>

      <p className="mt-3 text-slate-500">
        Start managing your products in minutes.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password ||
                "Passwords do not match",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            py-3
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.02]
            transition-all
            duration-300
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Sign In
          </Link>
        </p>

      </form>
    </div>
  );
}
