import React, { useState } from "react";

import GameBoard from "../components/ui/GameBoard.jsx";
import BackgroundBeams from "../components/ui/background-beams.jsx";
import ScoreCard from "../components/ui/scorecard.jsx";

const Play = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  return (
    <div className="relative bg-black min-h-screen w-full text-white overflow-hidden">
  {/* Background Beams */}
  <div className="absolute inset-0 z-0">
    <BackgroundBeams className="w-full h-full opacity-30" />
  </div>

  <main className="pt-[40px] flex justify-center items-start min-h-[calc(100vh-80px)] z-10 relative mt-30">
    <div className="flex flex-col items-center gap-40 mt-4">
      {/* GameBoard */}
      <div className="scale-180 sm:scale-150">
        <GameBoard
          rows={4}
          cols={5}
          onScoreUpdate={(player, cpu) => {
            setPlayerScore(player);
            setCpuScore(cpu);
          }}
        />
      </div>

      {/* ScoreCard */}
      <ScoreCard playerScore={playerScore} cpuScore={cpuScore} />
    </div>
  </main>
</div>

  );
};

export default Play;
