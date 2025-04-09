import React from "react";

const ScoreCard = ({ playerScore, cpuScore }) => {
  return (
    <div className="flex items-center gap-8 px-6 py-3 bg-white/5 rounded-xl shadow-md border border-white/10 backdrop-blur-md text-sm font-mono">
      {/* Player */}
      <div className="flex items-center gap-2 text-green-300">
        <span className="text-lg">🧍‍♂️</span>
        <span className="font-bold text-xl">{playerScore}</span>
        <span className="text-xs opacity-70">You</span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/20" />

      {/* CPU */}
      <div className="flex items-center gap-2 text-red-300">
        <span className="text-lg">🤖</span>
        <span className="font-bold text-xl">{cpuScore}</span>
        <span className="text-xs opacity-70">CPU</span>
      </div>
    </div>
  );
};

export default ScoreCard;
