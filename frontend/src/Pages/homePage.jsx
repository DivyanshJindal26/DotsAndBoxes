import React from "react";
import { motion } from "framer-motion";
import NavbarDemo from "../components/ui/navBar";

const GamePage = () => {
  const handlePlay = () => {
    // Add your game starting logic here (e.g., routing, state change, etc.)
    console.log("Play button clicked");
  };

  return (
    <div className="bg-black min-h-screen w-full text-white flex flex-col">
      <NavbarDemo />
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        {/* Animated Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-[12rem] font-bold text-[#FFD700] drop-shadow-lg">
            Dots & Boxes
          </h1>
        </motion.div>
        {/* Animatd Play Button */}
        <motion.button
          onClick={handlePlay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Play
        </motion.button>
      </div>
    </div>
  );
};

export default GamePage;
