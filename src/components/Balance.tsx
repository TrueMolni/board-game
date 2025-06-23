import React from "react";

interface BalanceProps {
  balance: number;
  availableRolls: number;
  maxRolls: number;
  onAddRoll: () => void;
}

const Balance: React.FC<BalanceProps> = ({
  balance,
  availableRolls,
  maxRolls,
  onAddRoll,
}) => {
  const canAddRoll = balance > 0 && availableRolls < maxRolls;

  return (
    <div className="flex items-center justify-center gap-2 mb-9">
      <img
        src="/src/assets/icons/DiceNoBg.svg"
        alt="dice"
        className="w-8 h-8"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
      <span className="text-white font-bold text-2xl leading-[100%]">{balance}</span>

      <button
        onClick={onAddRoll}
        disabled={!canAddRoll}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
          ${
            canAddRoll
              ? " hover:bg-green-600 active:scale-95 shadow-lg shadow-green-500/25"
              : "bg-gray-600 cursor-not-allowed opacity-50"
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44771 11 8 11H11V8C11 7.44771 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16Z"
            fill="white"
            fill-opacity="0.4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Balance;
