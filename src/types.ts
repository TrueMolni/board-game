export interface GameTile {
  id: number;
  type:
    | "start"
    | "vip"
    | "dice"
    | "star"
    | "box"
    | "cash"
    | "pickaxe"
    | "truck"
    | "gem"
    | "gold";
  icon: string;
  position: { x: number; y: number };
}

export interface GameState {
  currentPosition: number;
  targetPosition: number;
  availableRolls: number;
  maxRolls: number;
  timeRemaining: number;
  isRolling: boolean;
  isMoving: boolean;
  diceValue: number;
  showModal: boolean;
  hoveredTile: number | null;
  activeTile: number | null;
  balance: number;
  showRewardTooltip: boolean;
  rewardMessage: string;
}
