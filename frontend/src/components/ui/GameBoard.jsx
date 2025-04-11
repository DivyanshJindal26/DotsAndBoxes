import React, { useState, useEffect } from "react";

const Dot = ({ size = 16 }) => (
  <div
    className="rounded-full bg-[#FFFF33] shadow-[0_0_6px_#FFFF33] transition-transform duration-300 hover:scale-110"
    style={{ width: size, height: size }}
  ></div>
);



const Line = ({ orientation, onClick, isActive, color }) => {
  const isHorizontal = orientation === "horizontal";
  const randomAngle = Math.random() > 0.5 ? -45 : 45;

  const animationClass = isActive
    ? isHorizontal
      ? "[animation:line-horizontal-rotate_1.2s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
      : "[animation:line-vertical-rotate_1.2s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
    : "";

  const initialTransform = `rotate(${randomAngle}deg)`;

  const bgColor =
  color === "yellow"
    ? "bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]" // user - blue
    : "bg-[#EF4444] shadow-[0_0_6px_#EF4444]"; // computer - red

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 ease-out origin-center
        ${isHorizontal ? "h-1" : "w-1"}
        ${
          isActive
            ? `scale-100 ${bgColor} ${animationClass}`
            : "bg-gray-900 hover:bg-yellow-300 hover:scale-105"
        }`}
      style={{
        width: isHorizontal ? 48 : 8,
        height: isHorizontal ? 8 : 48,
        margin: isHorizontal ? undefined : "0 4px",
        borderRadius: 4,
        transform: isActive ? initialTransform : undefined,
      }}
    ></div>
  );
};

const DotsAndBoxes = ({ rows = 3, cols = 3, onScoreUpdate }) => {
  const [activeLines, setActiveLines] = useState(new Map());
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [completedBoxes, setCompletedBoxes] = useState(new Map());
  const [userScore, setUserScore] = useState(0);
const [computerScore, setComputerScore] = useState(0);


  const getAllPossibleLines = () => {
    const lines = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 1; c++) {
        lines.push({ orientation: "h", row: r, col: c });
      }
    }

    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols; c++) {
        lines.push({ orientation: "v", row: r, col: c });
      }
    }

    return lines;
  };

  const handleLineClick = (orientation, row, col) => {
    const key = JSON.stringify({ orientation, row, col });

    if (!isUserTurn || activeLines.has(key)) return;

    setActiveLines((prev) => {
      const updated = new Map(prev).set(key, "yellow");
      checkCompletedBoxes(updated, "yellow");
      return updated;
    });
    
    setIsUserTurn(false);
  };

  const checkCompletedBoxes = (linesMap, currentColor) => {
    const newCompletedBoxes = new Map(completedBoxes);
    let newBoxCount = 0;
  
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const top = JSON.stringify({ orientation: "h", row: r, col: c });
        const bottom = JSON.stringify({ orientation: "h", row: r + 1, col: c });
        const left = JSON.stringify({ orientation: "v", row: r, col: c });
        const right = JSON.stringify({ orientation: "v", row: r, col: c + 1 });
  
        const allPresent = [top, bottom, left, right].every((key) =>
          linesMap.has(key)
        );
  
        const key = `${r},${c}`;
        if (allPresent && !newCompletedBoxes.has(key)) {
          newCompletedBoxes.set(key, currentColor);
          newBoxCount++;
        }
      }
    }
  
    let updatedUserScore = userScore;
    let updatedCpuScore = computerScore;
  
    if (newBoxCount > 0) {
      if (currentColor === "yellow") {
        updatedUserScore = userScore + newBoxCount;
        setUserScore(updatedUserScore);
      } else if (currentColor === "blue") {
        updatedCpuScore = computerScore + newBoxCount;
        setComputerScore(updatedCpuScore);
      }
    }
  
    if (onScoreUpdate) {
      onScoreUpdate(updatedUserScore, updatedCpuScore);
    }
  
    setCompletedBoxes(newCompletedBoxes);
  };
  
  
  // Computer move effect
  useEffect(() => {
    if (!isUserTurn) {
      const timeout = setTimeout(() => {
        const allLines = getAllPossibleLines();
        const unclicked = allLines.filter(
          (line) => !activeLines.has(JSON.stringify(line))
        );

        if (unclicked.length > 0) {
          const randomLine =
            unclicked[Math.floor(Math.random() * unclicked.length)];
          const key = JSON.stringify(randomLine);
          setActiveLines((prev) => {
            const updated = new Map(prev).set(key, "blue");
            checkCompletedBoxes(updated, "blue");
            return updated;
          });
          
        }

        setIsUserTurn(true);
      }, 600); // delay for realism

      return () => clearTimeout(timeout);
    }
  }, [isUserTurn, activeLines]);


  return (
    <div className="inline-block p-4 rounded-xl text-white">
      <style>{`
        @keyframes line-horizontal-rotate {
          0% {
            transform: rotate(-45deg) translateX(-40%) scaleX(0.5);
            opacity: 0;
          }
          50% {
            transform: rotate(10deg) scaleX(1.1);
            opacity: 1;
          }
          100% {
            transform: rotate(0deg) translateX(0) scaleX(1);
          }
        }

        @keyframes line-vertical-rotate {
          0% {
            transform: rotate(45deg) translateY(-40%) scaleY(0.5);
            opacity: 0;
          }
          50% {
            transform: rotate(-10deg) scaleY(1.1);
            opacity: 1;
          }
          100% {
            transform: rotate(0deg) translateY(0) scaleY(1);
          }
        }
      `}</style>

      {Array.from({ length: rows * 2 - 1 }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex justify-center items-center">
          {Array.from({ length: cols * 2 - 1 }).map((_, colIdx) => {
            if (rowIdx % 2 === 0 && colIdx % 2 === 0) {
              return <Dot key={`dot-${rowIdx}-${colIdx}`} />;
            }

            if (rowIdx % 2 === 0 && colIdx % 2 !== 0) {
              const row = rowIdx / 2;
              const col = (colIdx - 1) / 2;
              const key = JSON.stringify({ orientation: "h", row, col });
              return (
                <Line
                  key={key}
                  orientation="horizontal"
                  onClick={() => handleLineClick("h", row, col)}
                  isActive={activeLines.has(key)}
                  color={activeLines.get(key)}
                />
              );
            }

            if (rowIdx % 2 !== 0 && colIdx % 2 === 0) {
              const row = (rowIdx - 1) / 2;
              const col = colIdx / 2;
              const key = JSON.stringify({ orientation: "v", row, col });
              return (
                <Line
                  key={key}
                  orientation="vertical"
                  onClick={() => handleLineClick("v", row, col)}
                  isActive={activeLines.has(key)}
                  color={activeLines.get(key)}
                />
              );
            }

            if (rowIdx % 2 !== 0 && colIdx % 2 !== 0) {
              const row = (rowIdx - 1) / 2;
              const col = (colIdx - 1) / 2;
              const key = `${row},${col}`;
              const boxColor = completedBoxes.get(key);
            
              return (
                <div
                  key={`box-${rowIdx}-${colIdx}`}
                  className={`transition-all duration-700 ease-in-out flex items-center justify-center
                    ${boxColor ? "scale-100 opacity-90" : "scale-75 opacity-0"}`}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
backgroundColor:
  boxColor === "yellow"
    ? "#3B82F6" // user - blue
    : boxColor === "blue"
    ? "#EF4444" // computer - red
    : "transparent",
boxShadow: boxColor
  ? `0 0 10px ${
      boxColor === "yellow" ? "#3B82F6" : "#EF4444"
    }, 0 0 20px ${
      boxColor === "yellow" ? "#3B82F6" : "#EF4444"
    }`
  : "none",

                    backdropFilter: boxColor ? "blur(4px)" : "none",
                    transformOrigin: "center",
                  }}
                />
              );
              
            }
            
          })}
        </div>
      ))}
    </div>
  );
};

export default DotsAndBoxes;
