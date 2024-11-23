import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Gallery from "../Components/Gallery";
import Events from "../Components/Events";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Team from "../Components/Team";
import ProtectedRoute from "../utils/ProtectedRoute";
import PaymentPage from "../Components/PaymentPage";
import AdminPanel from "../Components/AdminPanel";
import RegisteredEvents from "../Components/RegisteredEvents";

const NRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/team" element={<Team />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route
        path="/registered-events"
        element={
          <ProtectedRoute>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default NRoutes;
