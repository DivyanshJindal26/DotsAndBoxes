import React, { useState, useEffect, useRef } from "react";

import GameBoard from "../components/ui/GameBoard.jsx";
import BackgroundBeams from "../components/ui/background-beams.jsx";
import ScoreCard from "../components/ui/scorecard.jsx";

const Play = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [scale, setScale] = useState(1);

  const containerRef = useRef(null);

  // Adjust scale based on available screen height
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const navbarHeight = 80; // height of your navbar
      const neededHeight = 900; // slightly larger layout
      const baseScale = 1.05;   // default scale is a bit bigger
  
      const availableHeight = viewportHeight - navbarHeight;
      const newScale = Math.min(baseScale, availableHeight / neededHeight);
      setScale(newScale);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden pt-[80px]">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams className="w-full h-full opacity-30" />
      </div>

      <div className="flex justify-center items-center z-10 relative w-full h-full px-4">
        <div
          ref={containerRef}
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
          className="transition-transform duration-300"
        >
          <div className="flex flex-col items-center gap-12 sm:gap-20 w-full max-w-5xl">
            {/* GameBoard */}
            <GameBoard
              rows={5}
              cols={5}
              onScoreUpdate={(player, cpu) => {
                setPlayerScore(player);
                setCpuScore(cpu);
              }}
            />

            {/* ScoreCard */}
            <div className="w-full flex justify-center">
              <ScoreCard playerScore={playerScore} cpuScore={cpuScore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
