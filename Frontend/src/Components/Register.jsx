import React, { useState } from "react";
import { motion } from "framer-motion";
import intro3 from "../assets/intro3.mp4";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    college: "Your College Name",
    collegeId: "Your College ID",
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
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
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
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
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
          <div>
            <label htmlFor="phoneNumber" className="block text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
          <div>
            <label htmlFor="college" className="block text-white mb-2">
              College
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
          <div>
            <label htmlFor="collegeId" className="block text-white mb-2">
              College ID
            </label>
            <input
              type="text"
              id="collegeId"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
