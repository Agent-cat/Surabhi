import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NRoutes from "./Routes/NRoutes";
import Footer from "./Components/Footer";
import { useLenis } from "./hooks/useLenis";
import Loading from "./Components/Loading";
import CursorFollower from "./Components/CursorFollower";
import PaymentPage from "./Components/PaymentPage";

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 14500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <CursorFollower />
      {loading ? (
        <Loading />
      ) : (
        <div className="select-none">
          <Navbar />
          <NRoutes />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
