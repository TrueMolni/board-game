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

export interface GameTileProps {
  tile: GameTile;
  isActive: boolean;
  isPlayerPosition: boolean;
  isHovered: boolean;
  onHover: (tileId: number | null) => void;
}

export interface GameBoardProps {
  tiles: GameTile[];
  gameState: GameState;
  onTileClick: (tileId: number) => void;
  onTileHover: (tileId: number | null) => void;
}

export interface PlayerTokenProps {
  isMoving: boolean;
}

export interface DiceProps {
  value: number;
  isRolling: boolean;
}

export interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
}

export interface BalanceProps {
  balance: number;
  availableRolls: number;
  maxRolls: number;
  onAddRoll: () => void;
}

export interface TimerProps {
  timeRemaining: number;
  isVisible?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseBackdrop: (e: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  children: React.ReactNode;
}
