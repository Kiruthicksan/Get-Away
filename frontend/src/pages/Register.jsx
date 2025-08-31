import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      contactNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 flex flex-col items-center w-full max-w-md min-h-[600px]">
        {/* Logo */}
        <motion.div
          className="w-24 sm:w-32 mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <img src={logo} alt="logo" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">
          Welcome
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base mb-6">
          Your ultimate destination for booking flights
        </p>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              {...register("userName", {
                required: "User Name is Required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
              })}
              placeholder="Enter your name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="h-5">
              {errors.userName && (
                <p className="text-xs text-red-500">{errors.userName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid Email Address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="h-5">
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password with eye icon */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Create a new password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </span>
            </div>
            <div className="h-5">
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              {...register("contactNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="h-5">
              {errors.contactNumber && (
                <p className="text-xs text-red-500">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        {/* Sign in link */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
