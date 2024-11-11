import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import NRoutes from "./Routes/NRoutes";
import Footer from "./Components/Footer";
import { useLenis } from "./hooks/useLenis";
import Loading from "./Components/Loading";
import CursorFollower from "./Components/CursorFollower";
const App = () => {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 14500);

    return () => clearTimeout(timer);
  }, []);

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
