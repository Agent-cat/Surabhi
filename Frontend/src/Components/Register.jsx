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
    college: "kluniversity",
    collegeId: "",
    otherCollegeName: "",
  });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCollegeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      college: value,
      otherCollegeName: value === "kluniversity" ? "" : prev.otherCollegeName,
    }));
  };

  const handlePayment = async () => {
    try {
      // Initialize Razorpay payment
      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with actual key
        amount: 50000, // Amount in paise (500 INR)
        currency: "INR",
        name: "Surabhi Registration",
        description: "Registration Fee Payment",
        handler: async function (response) {
          // On successful payment, proceed with registration
          await handleSubmit(null, response.razorpay_payment_id);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        theme: {
          color: "#7C3AED",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleSubmit = async (e, paymentId = null) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.college === "other" && !paymentId) {
        handlePayment();
        return;
      }

      const dataToSubmit = {
        ...formData,
        paymentId: paymentId,
        college:
          formData.college === "other"
            ? formData.otherCollegeName
            : formData.college,
      };

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser(data);

      // Add a smooth transition before navigation
      const transitionOut = motion.animate(
        document.querySelector(".register-container"),
        { opacity: 0, y: -20 },
        { duration: 0.5 }
      );

      await transitionOut.finished;
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={intro3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="register-container bg-white/10 p-8 rounded-lg backdrop-blur-sm w-full max-w-md relative z-20"
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="college" className="block text-white mb-2">
              College
            </label>
            <select
              id="college"
              name="college"
              value={formData.college}
              onChange={handleCollegeChange}
              className="w-full px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
              required
              disabled={isLoading}
            >
              <option value="kluniversity">KL University</option>
              <option value="other">Other College</option>
            </select>
            {formData.college === "other" && (
              <>
                <input
                  type="text"
                  id="otherCollegeName"
                  name="otherCollegeName"
                  value={formData.otherCollegeName}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  className="w-full px-4 py-2 mt-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  required
                  disabled={isLoading}
                />
                <p className="mt-2 text-sm text-white">
                  Note: Non-KL University students are required to pay ₹500
                  registration fee
                </p>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300 disabled:opacity-50"
            disabled={isLoading || !isVideoLoaded}
          >
            {isLoading
              ? "Processing..."
              : formData.college === "other"
              ? "Proceed to Payment"
              : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
