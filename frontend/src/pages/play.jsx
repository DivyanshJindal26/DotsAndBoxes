import React, { useState } from "react";

import GameBoard from "../components/ui/GameBoard.jsx";
import BackgroundBeams from "../components/ui/background-beams.jsx";
import ScoreCard from "../components/ui/scorecard.jsx";

const Play = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams className="w-full h-full opacity-30" />
      </div>

      <div className="flex justify-center items-start z-10 relative w-full">
      <div className="flex flex-col items-center gap-20 sm:gap-24 md:gap-32 lg:gap-40 mt-4 px-4 sm:px-8 pb-16 w-full max-w-5xl">

          
          {/* GameBoard */}
          <div className="mt-20 transform scale-[1.2] sm:scale-[1.4] md:scale-[1.5] lg:scale-[1.8] transition-transform duration-300">
            <GameBoard
              rows={5}
              cols={5}
              onScoreUpdate={(player, cpu) => {
                setPlayerScore(player);
                setCpuScore(cpu);
              }}
            />
          </div>

          {/* ScoreCard */}
          <div className="w-full flex justify-center">
            <ScoreCard playerScore={playerScore} cpuScore={cpuScore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
