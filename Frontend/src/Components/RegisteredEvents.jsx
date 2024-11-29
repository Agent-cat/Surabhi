import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoLocationSharp, IoCalendarClear, IoTime } from "react-icons/io5";
import axios from "axios";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/events/registered",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching registered events:", error);
      setError(
        error.response?.data?.message || "Failed to fetch registered events"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const handleUnregister = async (eventId, categoryId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/unregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            eventId,
            categoryId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unregister from event");
      }

      // Refresh events list after successful unregistration
      fetchRegisteredEvents();
    } catch (error) {
      console.error("Error unregistering:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">
              Error: {error}. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
          My Registered Events
        </h1>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              You haven't registered for any events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div
                key={`${event._id}-${event.categoryId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-xl p-6"
              >
                <img
                  src={event.category.image}
                  alt={event.category.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {event.name} - {event.category.title}
                </h3>
                <div className="space-y-2 text-gray-300 mb-4">
                  <p className="flex items-center gap-2">
                    <IoLocationSharp />
                    {event.category.details.venue}
                  </p>
                  <p className="flex items-center gap-2">
                    <IoCalendarClear />
                    {event.category.details.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <IoTime />
                    {event.category.details.time}
                  </p>
                </div>
                <button
                  onClick={() => handleUnregister(event._id, event.categoryId)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Unregister
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
