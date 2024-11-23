import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoLocationSharp, IoCalendarClear, IoTime } from "react-icons/io5";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events/registered",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching registered events:", error);
      setError("Failed to load registered events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (eventId, categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/categories/${categoryId}/unregister`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchRegisteredEvents();
      }
    } catch (error) {
      console.error("Error unregistering:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
                key={`${event.eventId}-${event.categoryId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20"
              >
                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  {event.category.details.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {event.category.details.description}
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Venue: {event.category.details.venue}</p>
                  <p>Date: {event.category.details.date}</p>
                  <p>Time: {event.category.timeSlot}</p>
                </div>
                <button
                  onClick={() =>
                    handleUnregister(event.eventId, event.categoryId)
                  }
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
