import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png"; // ✅ Make sure the path is correct

const title = [
  { char: "D", rotate: -6 },
  { char: "o", rotate: 8 },
  { char: "t", rotate: -7 },
  { char: "s", rotate: 6 },
  { char: " ", rotate: 0 },
  { char: "&", rotate: 5, color: "#FFD700" },
  { char: " ", rotate: 0 },
  { char: "B", rotate: -8 },
  { char: "o", rotate: 6 },
  { char: "x", rotate: 9 },
  { char: "e", rotate: -1 },
  { char: "s", rotate: 12 },
];

export default function NavbarDotsOnly() {
  const [animatedIndex, setAnimatedIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * title.length);
      setAnimatedIndex(randomIdx);

      setTimeout(() => {
        setAnimatedIndex(null);
      }, 800);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full relative bg-transparent backdrop-blur-md text-white py-5 px-6 fixed top-0 z-50 h-[80px]">

      {/* Centered container with logo + title */}
      <div className="absolute left-[45%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center space-x-4 cursor-default">

        {/* Logo */}
        <img
          src={logo}
          alt="Dots and Boxes Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:scale-110 transition-transform duration-300"
        />

        {/* Animated Title */}
        <div className="flex space-x-1">
          {title.map((t, index) => (
            <span
              key={index}
              className={`text-4xl font-bold uppercase tracking-widest ${
                t.color
                  ? "text-[#FFD700] drop-shadow-[0_0_10px_#FFD700]"
                  : "text-[#FFFF33] drop-shadow-[0_0_8px_#FFFF33]"
              }`}
            >
              <span
                style={{
                  display: "inline-block",
                  transform:
                    animatedIndex === index
                      ? `rotate(${t.rotate + 10}deg) scale(1.4)`
                      : `rotate(${t.rotate}deg) scale(1)`,
                  transition: "transform 0.4s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = `rotate(${
                    t.rotate + 10
                  }deg) scale(1.4)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = `rotate(${t.rotate}deg) scale(1)`)
                }
              >
                {t.char}
              </span>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
