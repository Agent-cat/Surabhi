import React, { useState } from "react";
import { motion } from "framer-motion";
import intro3 from "../assets/intro3.mp4";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setToken(data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (you might want to show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={intro3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 p-8 rounded-lg backdrop-blur-sm w-full max-w-md relative z-20"
      >
        <h2 className="text-3xl font-saint-carell text-white text-center mb-8">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-white/60 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-white hover:text-gray-300">
            Register here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
