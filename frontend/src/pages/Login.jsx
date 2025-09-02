import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
   const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
   
    try{
         await login(data.email, data.password)
       
        
       
         navigate('/')
          
    }catch{
      console.log("Login Error", errors)
     
    }
   
    
     
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray=300 px-4 py-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 flex flex-col items-center w-full max-w-md min-h-[600px">
        <motion.div
          className="w-24 sm:w-32 mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <img src={logo} alt="logo" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base mb-6">
          Your ultimate destination for booking flights
        </p>

        {/* Login Form */}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* userName */}

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
              placeholder="Enter your Email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div className="h-5">
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password  */}

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
                    message: "Password must be atleast 8 characters",
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
          </div>
          <div className="h-5">
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Logging..." : "Sign In"}
          </motion.button>
        </form>

            
        
        {/* Register Link */}

        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an Account?
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors pl-2"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
