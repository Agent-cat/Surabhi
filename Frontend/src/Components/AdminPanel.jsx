import React, { useState, useEffect, useCallback } from "react";

const EventModal = React.memo(
  ({
    eventForm,
    setEventForm,
    handleEventSubmit,
    closeEventModal,
    editingEvent,
  }) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-gray-800 rounded-xl w-full max-w-2xl my-8 mx-4 relative">
          <button
            onClick={closeEventModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <form onSubmit={handleEventSubmit} className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 pr-8 mb-4">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-purple-300 mb-2">Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">
                  Description
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg p-2.5 text-white h-24 resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 mb-2">Venue</label>
                  <input
                    type="text"
                    value={eventForm.venue}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, venue: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-purple-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-300 mb-2">Time</label>
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, time: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={eventForm.image}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, image: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  value={eventForm.termsandconditions}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      termsandconditions: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg p-2.5 text-white h-24 resize-y min-h-[96px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-purple-500 text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
              <button
                type="button"
                onClick={closeEventModal}
                className="flex-1 bg-gray-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

const CategoryModal = React.memo(
  ({
    categoryForm,
    setCategoryForm,
    handleCategorySubmit,
    closeCategoryModal,
  }) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-gray-800 rounded-xl w-full max-w-md my-8 mx-4 relative">
          <button
            onClick={closeCategoryModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <form onSubmit={handleCategorySubmit} className="p-6">
            <h3 className="text-2xl font-bold text-purple-400 pr-8 mb-4">
              Add New Category
            </h3>

            <div className="mb-6">
              <label className="block text-purple-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryForm.categoryName}
                onChange={(e) =>
                  setCategoryForm({ categoryName: e.target.value })
                }
                className="w-full bg-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Enter category name"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-purple-500 text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Category
              </button>
              <button
                type="button"
                onClick={closeCategoryModal}
                className="flex-1 bg-gray-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // "pending", "approved", "rejected"
  const [view, setView] = useState("registrations"); // "registrations" or "events"
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    image: "",
    termsandconditions: "",
  });
  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
  });

  const closeEventModal = useCallback(() => {
    setShowEventModal(false);
    setEventForm({
      title: "",
      description: "",
      venue: "",
      date: "",
      time: "",
      image: "",
      termsandconditions: "",
    });
    setEditingEvent(null);
  }, []);

  const closeCategoryModal = useCallback(() => {
    setShowCategoryModal(false);
    setCategoryForm({ categoryName: "" });
  }, []);

  useEffect(() => {
    if (view === "registrations") {
      fetchRegistrations();
    } else {
      fetchEvents();
    }
  }, [filter, view]);

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

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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

  const handleDeleteEvent = async (categoryId, eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${categoryId}/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete event");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEventSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const eventData = {
          title: eventForm.title,
          details: {
            description: eventForm.description,
            venue: eventForm.venue,
            date: eventForm.date,
            time: eventForm.time,
          },
          image: eventForm.image,
          termsandconditions: eventForm.termsandconditions,
        };

        const response = await fetch(
          editingEvent
            ? `http://localhost:5000/api/events/${selectedCategory}/events/${editingEvent._id}`
            : `http://localhost:5000/api/events/${selectedCategory}/events`,
          {
            method: editingEvent ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(eventData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save event");
        }

        await fetchEvents();
        closeEventModal();
      } catch (error) {
        console.error("Error saving event:", error);
        alert("Failed to save event. Please try again.");
      }
    },
    [eventForm, selectedCategory, editingEvent, closeEventModal]
  );

  const handleAddEvent = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setEditingEvent(null);
    setEventForm({
      title: "",
      description: "",
      venue: "",
      date: "",
      time: "",
      image: "",
      termsandconditions: "",
    });
    setShowEventModal(true);
  }, []);

  const handleEditEvent = useCallback((category, event) => {
    setSelectedCategory(category._id);
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.details.description,
      venue: event.details.venue,
      date: event.details.date,
      time: event.details.time,
      image: event.image,
      termsandconditions: event.termsandconditions,
    });
    setShowEventModal(true);
  }, []);

  const handleAddCategory = () => {
    setCategoryForm({ categoryName: "" });
    document.body.style.overflow = "hidden";
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Submitting category:", categoryForm); // Debug log

      try {
        const response = await fetch(
          "http://localhost:5000/api/events/category",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(categoryForm),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create category");
        }

        const data = await response.json();
        console.log("Category created:", data); // Debug log

        await fetchEvents(); // Refresh the categories
        closeCategoryModal();
        setCategoryForm({ categoryName: "" }); // Reset form
      } catch (error) {
        console.error("Error creating category:", error);
        alert(error.message || "Failed to create category. Please try again.");
      }
    },
    [categoryForm, closeCategoryModal]
  );

  const handleUpdateCategory = useCallback(async (categoryId, newName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/category/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            categoryName: newName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      await fetchEvents();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  }, []);

  const handleDeleteCategory = useCallback(async (categoryId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? All events in this category will be deleted."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      await fetchEvents();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8">
      <div className="pt-16 sm:pt-20"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Admin Dashboard
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setView("registrations")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === "registrations"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-purple-500"
              }`}
            >
              Registrations
            </button>
            <button
              onClick={() => setView("events")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === "events"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-purple-500"
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {view === "registrations" ? (
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
                        <div className="flex items-center gap-2">
                          <p className="text-purple-200">
                            <span className="text-purple-400">ID:</span>{" "}
                            {user.collegeId}
                          </p>
                          <button
                            onClick={() => copyToClipboard(user.collegeId)}
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
                        </div>
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
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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
        ) : (
          <div className="grid gap-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAddCategory}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Add Category
              </button>
            </div>
            {events.map((category) => (
              <div
                key={category._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-purple-300 font-bold">
                    {category.categoryName}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600"
                      onClick={() => handleAddEvent(category._id)}
                    >
                      Add Event
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete Category
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.Events.map((event) => (
                    <div
                      key={event._id}
                      className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-purple-200 font-medium">
                          {event.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {event.details.venue} | {event.details.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(category, event)}
                          className="p-2 text-purple-300 hover:text-purple-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteEvent(category._id, event._id)
                          }
                          className="p-2 text-red-400 hover:text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showEventModal && (
        <EventModal
          eventForm={eventForm}
          setEventForm={setEventForm}
          handleEventSubmit={handleEventSubmit}
          closeEventModal={closeEventModal}
          editingEvent={editingEvent}
        />
      )}
      {showCategoryModal && (
        <CategoryModal
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          handleCategorySubmit={handleCategorySubmit}
          closeCategoryModal={closeCategoryModal}
        />
      )}
    </div>
  );
};

export default AdminPanel;
