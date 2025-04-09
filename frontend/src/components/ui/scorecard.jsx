import React from "react";

const ScoreCard = ({ playerScore, cpuScore }) => {
  return (
    <div className="flex items-center justify-center gap-10 px-8 py-4 rounded-2xl shadow-md text-white text-sm font-mono">
      {/* Player */}
      <div className="flex flex-col items-center text-green-400">
        <div className="text-2xl">🧍‍♂️</div>
        <div className="text-lg font-semibold mt-1">You</div>
        <div className="text-3xl font-bold mt-1">{playerScore}</div>
      </div>

      {/* Divider */}
      <div className="w-[2px] h-12 bg-white/10 rounded-full" />

      {/* CPU */}
      <div className="flex flex-col items-center text-red-400">
        <div className="text-2xl">🤖</div>
        <div className="text-lg font-semibold mt-1">CPU</div>
        <div className="text-3xl font-bold mt-1">{cpuScore}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
