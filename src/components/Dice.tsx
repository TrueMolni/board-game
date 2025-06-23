import React, { useState, useEffect } from "react";

interface DiceProps {
  value: number;
  isRolling: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
  const [animationFrame, setAnimationFrame] = useState(1);

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setAnimationFrame((prev) => (prev % 3) + 1);
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isRolling]);

  const getDiceImage = () => {
    if (isRolling) {
      return `/src/assets/icons/diceAnimation${animationFrame}.svg`;
    }
    return `/src/assets/icons/Value=${value}.svg`;
  };

  return (
    <div className="flex items-center justify-center relative">
      <div
        className={`
          relative w-16 h-16 transition-all duration-300 ease-out
          ${isRolling ? "animate-bounce scale-110" : "scale-100"}
        `}
      >
        <img
          src={getDiceImage()}
          alt={`dice ${value}`}
          className="w-full h-full object-contain"
          style={{
            filter: isRolling
              ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))"
              : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>
    </div>
  );
};

export default Dice;
