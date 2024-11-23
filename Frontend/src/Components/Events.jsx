import React, { useState } from "react";
import poster1 from "../assets/2025.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Events = () => {
  const flowCharts = [
    {
      name: "Music",
      categories: [
        {
          title: "Beat Battle",
          details: {
            title: "Beat Battle 2024",
            description:
              "A high-energy music battle where participants showcase their beat-making skills",
            venue: "Main Auditorium",
            date: "March 15, 2024",
          },
          image: poster1,
        },
        {
          title: "Beat Solo",
          details: {
            title: "Beat Solo Competition",
            description:
              "Solo performers create live beats using instruments or digital tools",
            venue: "Music Room",
            date: "March 16, 2024",
          },
          image: poster1,
        },
        {
          title: "Beat Duet",
          details: {
            title: "Beat Duet Challenge",
            description:
              "Two performers collaborate to create unique musical beats",
            venue: "Performance Hall",
            date: "March 16, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Dance",
      categories: [
        {
          title: "Classic Solo",
          details: {
            title: "Classical Dance Solo",
            description:
              "Individual classical dance performances showcasing traditional art forms",
            venue: "Dance Arena",
            date: "March 17, 2024",
          },
          image: poster1,
        },
        {
          title: "Classic Group",
          details: {
            title: "Classical Group Performance",
            description: "Group performances of classical dance forms",
            venue: "Main Stage",
            date: "March 17, 2024",
          },
          image: poster1,
        },
        {
          title: "Western Mass Solo",
          details: {
            title: "Western Dance Solo",
            description: "Individual western dance performances",
            venue: "Dance Studio",
            date: "March 18, 2024",
          },
          image: poster1,
        },
        {
          title: "Western Mass Duet",
          details: {
            title: "Western Duet Dance",
            description: "Partner dance performances in western style",
            venue: "Main Hall",
            date: "March 19, 2024",
          },
          image: poster1,
        },
        {
          title: "Western Mass Group",
          details: {
            title: "Western Group Dance",
            description: "Group choreography in western dance styles",
            venue: "Main Stage",
            date: "March 19, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Drama",
      categories: [
        {
          title: "Skit",
          details: {
            title: "Drama Skit Competition",
            description: "Short dramatic performances by groups",
            venue: "Theater Hall",
            date: "March 20, 2024",
          },
          image: poster1,
        },
        {
          title: "Dialouge Damaka",
          details: {
            title: "Dialogue Performance",
            description: "Dramatic dialogue delivery competition",
            venue: "Mini Theater",
            date: "March 20, 2024",
          },
          image: poster1,
        },
        {
          title: "Abhinayam",
          details: {
            title: "Abhinayam - Expression Challenge",
            description: "Traditional theatrical expression competition",
            venue: "Drama Studio",
            date: "March 21, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Literature",
      categories: [
        {
          title: "Black Out Poetry",
          details: {
            title: "Blackout Poetry Contest",
            description: "Creative poetry making by redacting existing text",
            venue: "Library Hall",
            date: "March 22, 2024",
          },
          image: poster1,
        },
        {
          title: "Debate",
          details: {
            title: "Literary Debate",
            description: "Competitive debate on literary topics",
            venue: "Conference Room",
            date: "March 22, 2024",
          },
          image: poster1,
        },
        {
          title: "Metaphor mania",
          details: {
            title: "Metaphor Writing Challenge",
            description: "Creative writing focused on metaphors",
            venue: "Creative Writing Lab",
            date: "March 23, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Fashion",
      categories: [
        {
          title: "Ramp Walk",
          details: {
            title: "Fashion Show",
            description: "Professional ramp walk competition",
            venue: "Fashion Arena",
            date: "March 24, 2024",
          },
          image: poster1,
        },
        {
          title: "Themed Makeup",
          details: {
            title: "Creative Makeup Contest",
            description: "Themed makeup artistry competition",
            venue: "Makeup Studio",
            date: "March 24, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Painting",
      categories: [
        {
          title: "Rangoli",
          details: {
            title: "Traditional Rangoli Competition",
            description: "Floor art using colored powder",
            venue: "Art Gallery",
            date: "March 25, 2024",
          },
          image: poster1,
        },
        {
          title: "Theme Painting",
          details: {
            title: "Themed Art Competition",
            description: "Painting competition with specific themes",
            venue: "Art Studio",
            date: "March 25, 2024",
          },
          image: poster1,
        },
      ],
    },
    {
      name: "Film",
      categories: [
        {
          title: "Short Film Contest",
          details: {
            title: "Short Film Festival",
            description: "Competition for original short films",
            venue: "Film Theater",
            date: "March 26, 2024",
          },
          image: poster1,
        },
        {
          title: "Photography",
          details: {
            title: "Photography Exhibition",
            description: "Competitive photography showcase",
            venue: "Photo Gallery",
            date: "March 26, 2024",
          },
          image: poster1,
        },
      ],
    },
  ];

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (chartIndex, catIndex) => {
    const categoryId = `${chartIndex}-${catIndex}`;
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegisterPopup(true);
    setAcceptedTerms(false);
  };

  const handleRegistrationSubmit = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to register for events");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/events/${selectedEvent._id}/categories/${selectedEvent.categoryId}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      alert("Successfully registered for event!");
      setShowRegisterPopup(false);
      setSelectedEvent(null);
      setAcceptedTerms(false);
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Failed to register for event");
    }
  };

  const RegisterPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Register for {selectedEvent?.title}
          </h3>

          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-purple-300 mb-2">
              Terms and Conditions
            </h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>1. Participants must arrive 30 minutes before the event.</p>
              <p>2. All participants must carry their college ID cards.</p>
              <p>3. The decision of the judges will be final.</p>
              <p>4. No refunds will be provided after registration.</p>
              <p>5. Participants must follow all event-specific guidelines.</p>
              <p>
                6. Any form of malpractice will lead to immediate
                disqualification.
              </p>
              <p>7. Registration is non-transferable.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-gray-300 text-sm">
              I have read and agree to the terms and conditions
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRegistrationSubmit}
              disabled={!acceptedTerms}
              className="flex-1 bg-purple-500 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Registration
            </button>
            <button
              onClick={() => setShowRegisterPopup(false)}
              className="flex-1 bg-gray-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-center items-center pt-14">
        <h1 className="text-4xl font-bold text-purple-400">Events</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        {flowCharts.map((chart, chartIndex) => (
          <div key={chartIndex} className="mb-12">
            <div className="border-b-2 border-purple-500 mb-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                {chart.name}
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500"></div>

              <div className="space-y-8">
                {chart.categories.map((category, catIndex) => (
                  <div key={catIndex} className="flex items-start ml-8">
                    {/* Connector dot with pulse animation */}
                    <div className="absolute left-4 -ml-6 mt-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full relative">
                        <div className="absolute w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>

                    <div
                      className={`bg-gray-800 rounded-lg p-4 w-full cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-700 ${
                        expandedCategory === `${chartIndex}-${catIndex}`
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(chartIndex, catIndex)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-purple-300">
                          {category.title}
                        </h3>
                        <div
                          className={`transform transition-transform duration-300 ${
                            expandedCategory === `${chartIndex}-${catIndex}`
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          ▼
                        </div>
                      </div>

                      <div
                        className={`transition-all duration-500 ease-in-out ${
                          expandedCategory === `${chartIndex}-${catIndex}`
                            ? "max-h-[800px] opacity-100 mt-4"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="w-full md:w-1/3">
                            <img
                              src={category.image}
                              alt={category.title}
                              className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            />
                          </div>
                          <div className="flex-1 space-y-4">
                            <h4 className="text-xl text-purple-300 font-semibold">
                              {category.details.title}
                            </h4>
                            <p className="text-gray-300">
                              {category.details.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 text-sm">
                              <div className="flex items-center">
                                <IoLocationSharp className="text-purple-400" />
                                <span className="ml-2">
                                  {category.details.venue}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <IoCalendarClear className="text-purple-400" />
                                <span className="ml-2">
                                  {category.details.date}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleRegisterClick(category.details)
                              }
                              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                              Register Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showRegisterPopup && <RegisterPopup />}
    </div>
  );
};

export default Events;
