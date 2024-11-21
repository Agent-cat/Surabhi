import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // "pending", "approved", "rejected"

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/registrations${
          filter !== "all" ? `?status=${filter}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleApproval = async (userId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/registrations/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update registration");
      }

      // Refresh the registrations list
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating registration:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="pt-16 sm:pt-20"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Registration Dashboard
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            {["pending", "approved", "rejected"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === filterType
                    ? "bg-purple-600 text-white shadow-lg transform hover:scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-purple-500"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {registrations.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl text-purple-300 font-bold mb-1">
                      {user.fullName}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
                          user.paymentStatus
                        )}`}
                      >
                        {user.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-purple-200">
                        <span className="text-purple-400">Email:</span>{" "}
                        {user.email}
                      </p>
                      <p className="text-purple-200">
                        <span className="text-purple-400">College:</span>{" "}
                        {user.college}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-purple-200">
                        <span className="text-purple-400">ID:</span>{" "}
                        {user.collegeId}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-purple-200">
                          <span className="text-purple-400">Payment ID:</span>{" "}
                          {user.paymentId || "N/A"}
                        </p>
                        {user.paymentId && (
                          <button
                            onClick={() => copyToClipboard(user.paymentId)}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {user.paymentStatus === "pending" && (
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleApproval(user._id, "approved")}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(user._id, "rejected")}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg hover:from-red-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {user.paymentScreenshot && (
                <div className="mt-6">
                  <p className="text-purple-300 mb-3 font-medium">
                    Payment Screenshot:
                  </p>
                  <img
                    src={user.paymentScreenshot}
                    alt="Payment Proof"
                    className="w-full sm:max-w-md rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-500"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}

          {registrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-purple-300 text-lg">
                No registrations found for {filter} status
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
