import React from "react";

interface TimerProps {
  timeRemaining: number;
  isVisible?: boolean
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, isVisible = true }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  if (!isVisible) return null;
  return (
    <div className="leading-[14px] flex-shrink-0 flex items-center justify-center mb-6">
      <div className="bg-black/10 h-6 flex items-center rounded-lg px-2 border border-white/20">
        <span className="text-white opacity-60 font-[Inter] text-[14px] font-bold tracking-wider">
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};

export default Timer;

/*
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-black/20 h-8 flex items-center rounded-lg px-3 border border-white/10">
        <span className="text-white/80 font-bold text-sm tracking-wider">
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};

*/