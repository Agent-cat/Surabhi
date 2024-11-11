import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Gallery from "../Components/Gallery";
import Events from "../Components/Events";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Team from "../Components/Team";
import ProtectedRoute from "../utils/ProtectedRoute";

const NRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
};

export default NRoutes;
