import React from "react";
import NavbarDemo from "../components/ui/navBar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black min-h-screen w-full text-white">
      {/* Top Navigation Bar */}
      <NavbarDemo />

      {/* Main Content (Outlet renders child routes here) */}
      <main className="pt-[80px] flex justify-center items-start min-h-[calc(100vh-80px)]">
  <Outlet />
</main>

    </div>
  );
};

export default Layout;