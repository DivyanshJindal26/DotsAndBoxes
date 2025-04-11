import React, { useState, useEffect } from "react";
import NavbarDemo from "../components/ui/navBar.jsx";
import NavbarDotsOnly from "../components/ui/navBarRes.jsx"; // import the minimal navbar
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        // If it has touch points OR doesn't support mousemove (basic heuristics)
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  return (
    <div className="bg-black min-h-screen w-full text-white">
      {/* Top Navigation Bar */}
      {isTouchDevice ? <NavbarDotsOnly /> : <NavbarDemo />}

      {/* Main Content (Outlet renders child routes here) */}
      <main className="pt-[80px] flex justify-center items-start min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
