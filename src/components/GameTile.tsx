import React from "react";
import { GameTile as GameTileType } from "../types";

interface GameTileProps {
  tile: GameTileType;
  isActive: boolean;
  isPlayerPosition: boolean;
  isHovered: boolean;
  onHover: (tileId: number | null) => void;
}

const GameTile: React.FC<GameTileProps> = ({
  tile,
  isActive,
  isPlayerPosition,
  isHovered,
  onHover,
}) => {
  const getIconPath = (type: string, active: boolean = false) => {
    const iconName = type.charAt(0).toUpperCase() + type.slice(1);
    const suffix = active ? "-active" : "";
    return `/src/assets/icons/${iconName}${suffix}.svg`;
  };

  const shouldShowActive = isActive || isPlayerPosition || isHovered;
  const iconPath = getIconPath(tile.type, shouldShowActive);

  return (
    <div
      className={`
      relative w-full h-full rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer
      ${shouldShowActive ? "scale-110 drop-shadow-lg" : "scale-100"}
      ${isPlayerPosition ? "animate-pulse" : ""}
      ${isHovered ? "brightness-110" : ""}
    `}
      onMouseEnter={() => onHover(tile.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={iconPath}
        alt={tile.type}
        className="w-full h-full object-contain"
        style={{
          filter: shouldShowActive
            ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))"
            : "none",
        }}
      />

      {/* Glow effect for active tiles */}
      {shouldShowActive && (
        <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse" />
      )}

      {/* Tooltip on hover - positioned to always be visible */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          {tile.type.charAt(0).toUpperCase() + tile.type.slice(1)}
        </div>
      )}
    </div>
  );
};

export default GameTile;
