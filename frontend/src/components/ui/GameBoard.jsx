import React, { useState } from "react";

const Dot = ({ size = 16 }) => (
  <div
    className="rounded-full bg-[#FFFF33] shadow-[0_0_6px_#FFFF33] transition-transform duration-300 hover:scale-110"
    style={{ width: size, height: size }}
  ></div>
);

const Line = ({ orientation, onClick, isActive }) => {
  const isHorizontal = orientation === "horizontal";
  const randomAngle = Math.random() > 0.5 ? -45 : 45;

  const animationClass = isActive
    ? isHorizontal
      ? "[animation:line-horizontal-rotate_1.2s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
      : "[animation:line-vertical-rotate_1.2s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
    : "";

  const initialTransform = `rotate(${randomAngle}deg)`;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-500 ease-out origin-center
        ${isHorizontal ? "h-1" : "w-1"}
        ${isActive
          ? `bg-[#FACC15] shadow-[0_0_6px_#FACC15] scale-100 ${animationClass}`
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

const DotsAndBoxes = ({ rows = 3, cols = 3 }) => {
  const [activeLines, setActiveLines] = useState(new Set());

  const handleLineClick = (orientation, row, col) => {
    const key = JSON.stringify({ orientation, row, col });
    setActiveLines((prev) => {
      const updated = new Set(prev);
      updated.add(key);
      return updated;
    });
  };

  return (
    <div className="inline-block p-4 rounded-xl  text-white">
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
                />
              );
            }

            return (
              <div
                key={`empty-${rowIdx}-${colIdx}`}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "transparent",
                  pointerEvents: "none", // so it doesn’t block clicks
                  userSelect: "none",    // prevent accidental text selection
                }}
              />
            );
            
          })}
        </div>
        
      ))}
    </div>
    
  );
};



export default DotsAndBoxes;
