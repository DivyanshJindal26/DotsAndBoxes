import React from "react";
import NavbarDemo from "../components/ui/navBar";
import GameBoard from "../components/ui/GameBoard";

const GamePage = () => {
  return (
    <div className="bg-black min-h-screen w-full text-white">
      <NavbarDemo />
      <GameBoard rows={4} cols={7} />
      {/* Your main content can go here */}
    </div>
  );
};

export default GamePage;
