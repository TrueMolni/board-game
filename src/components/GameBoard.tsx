import React from "react";

import GameTile from "./GameTile";
import PlayerToken from "./PlayerToken";
import Dice from "./Dice";

import { GameBoardProps } from "../types";

const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  gameState,
  onTileClick,
  onTileHover,
}) => {
  const getTilePosition = (index: number) => {
    const positions = [
      // Top row (0-5)
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      // Right column (6-10)
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      // Bottom row (11-16)
      [4, 5],
      [3, 5],
      [2, 5],
      [1, 5],
      [0, 5],
      // Left column (17-19)
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1],
    ];

    return positions[index] || { gridColumn: 1, gridRow: 1 };
  };

  const getTokenPosition = (position: number) => {
    const [col, row] = getTilePosition(position);
    return {
      left: `${col * 16.67 + 8.33}%`,
      top: `${row * 16.67 + 8.33}%`,
    };
  };

  return (
    <div className="relative w-full aspect-square rounded-xl bg-black/40">
      <img
        src="/assets/bg/light.png"
        loading="lazy"
        alt="light"
        className="absolute top-0 left-0 w-full h-full opacity-0 animate-pulse"
      />
      <div className="relative w-full h-full">
        {tiles.map((tile, index) => {
          const [col, row] = getTilePosition(index);
          const isPlayerPosition = gameState.currentPosition === index;
          const isActive = gameState.activeTile === index;
          const isHovered = gameState.hoveredTile === index;

          return (
            <div
              key={tile.id}
              className="absolute cursor-pointer"
              style={{
                left: `${col * 16.67}%`,
                top: `${row * 16.67}%`,
                width: "16.67%",
                height: "16.67%",
              }}
              onClick={() => onTileClick(tile.id)}
            >
              <div className="w-full h-full flex items-center justify-center p-1">
                <GameTile
                  tile={tile}
                  isActive={isActive}
                  isPlayerPosition={isPlayerPosition}
                  isHovered={isHovered}
                  onHover={onTileHover}
                />
              </div>
            </div>
          );
        })}

        <div
          className="absolute transition-all duration-500 ease-in-out"
          style={getTokenPosition(gameState.currentPosition)}
        >
          <PlayerToken isMoving={gameState.isMoving} />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dice value={gameState.diceValue} isRolling={gameState.isRolling} />
        </div>
        {gameState.showRewardTooltip && gameState.rewardMessage && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-bold animate-bounce border border-yellow-400">
              {gameState.rewardMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
