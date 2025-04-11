import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";

const ScoreCard = ({ playerScore, cpuScore }) => {
  return (
    <div className="flex items-center justify-center gap-10 px-10 py-5 rounded-2xl shadow-lg bg-white/5 text-white font-mono backdrop-blur">
      
      {/* Player */}
      <div className="flex flex-col items-center text-[#3B82F6]">

        <FaUser className="text-3xl mb-1" />
        <div className="text-lg font-semibold">You</div>
        <div className="text-4xl font-bold mt-1">{playerScore}</div>
      </div>

      {/* Divider */}
      <div className="w-[2px] h-14 bg-white/10 rounded-full" />

      {/* CPU */}
      <div className="flex flex-col items-center text-red-400">
        <FaRobot className="text-3xl mb-1" />
        <div className="text-lg font-semibold">CPU</div>
        <div className="text-4xl font-bold mt-1">{cpuScore}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
