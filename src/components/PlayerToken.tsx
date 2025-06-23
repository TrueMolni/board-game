import React from "react";
import { User } from "lucide-react";

interface PlayerTokenProps {
  isMoving: boolean;
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ isMoving }) => {
  return (
    <div
      className={`
        absolute w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full 
        flex items-center justify-center shadow-lg border-2 border-white z-20 
        transition-all duration-500 ease-in-out
        ${isMoving ? "scale-125 shadow-xl" : "scale-100"}
      `}
      style={{
        transform: `translate(-50%, -50%) ${
          isMoving ? "scale(1.25)" : "scale(1)"
        }`,
      }}
    >
      <User size={14} className="text-white" />
      {isMoving && (
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
      )}
    </div>
  );
};

export default PlayerToken;
