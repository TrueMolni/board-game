import React from "react";

import { ProgressBarProps } from "../types";

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
  const segments = Array.from({ length: max });

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center mb-[2px]">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="text-lg font-bold text-white">
          {current}/{max}
        </span>
      </div>

      <div className="flex w-full h-3 gap-[2px]">
        {segments.map((_, index) => (
          <div
            key={index}
            className={`flex-1 rounded-[4px] h-full transition-all duration-300 ${
              index < current
                ? "bg-gradient-to-b from-[#FFD600] to-[#FFA100]"
                : "bg-white/20"
            }`}
          >
            {index < current && (
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-60 rounded-[4px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
