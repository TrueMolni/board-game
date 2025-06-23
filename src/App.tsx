import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import Balance from "./components/Balance";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import Modal from "./components/Modal";
import { GameTile, GameState } from "./types";

const INITIAL_TILES: GameTile[] = [
  // Perimeter tiles for 6x6 grid (20 tiles total)
  { id: 0, type: "start", icon: "start", position: { x: 0, y: 0 } },
  { id: 1, type: "box", icon: "box", position: { x: 1, y: 0 } },
  { id: 2, type: "cash", icon: "cash", position: { x: 2, y: 0 } },
  { id: 3, type: "vip", icon: "vip", position: { x: 3, y: 0 } },
  { id: 4, type: "pickaxe", icon: "pickaxe", position: { x: 4, y: 0 } },
  { id: 5, type: "star", icon: "star", position: { x: 5, y: 0 } },
  { id: 6, type: "truck", icon: "truck", position: { x: 5, y: 1 } },
  { id: 7, type: "cash", icon: "cash", position: { x: 5, y: 2 } },
  { id: 8, type: "dice", icon: "dice", position: { x: 5, y: 3 } },
  { id: 9, type: "gold", icon: "gold", position: { x: 5, y: 4 } },
  { id: 10, type: "gem", icon: "gem", position: { x: 5, y: 5 } },
  { id: 11, type: "box", icon: "box", position: { x: 4, y: 5 } },
  { id: 12, type: "cash", icon: "cash", position: { x: 3, y: 5 } },
  { id: 13, type: "vip", icon: "vip", position: { x: 2, y: 5 } },
  { id: 14, type: "pickaxe", icon: "pickaxe", position: { x: 1, y: 5 } },
  { id: 15, type: "star", icon: "star", position: { x: 0, y: 5 } },
  { id: 16, type: "truck", icon: "truck", position: { x: 0, y: 4 } },
  { id: 17, type: "cash", icon: "cash", position: { x: 0, y: 3 } },
  { id: 18, type: "dice", icon: "dice", position: { x: 0, y: 2 } },
  { id: 19, type: "gold", icon: "gold", position: { x: 0, y: 1 } },
];

const TIMER_DURATION = 1800; // 30 minutes

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentPosition: 0,
    targetPosition: 0,
    availableRolls: 7,
    maxRolls: 10,
    timeRemaining: TIMER_DURATION,
    isRolling: false,
    isMoving: false,
    diceValue: 1,
    showModal: false,
    hoveredTile: null,
    activeTile: null,
    balance: 5,
    showRewardTooltip: false,
    rewardMessage: "",
  });

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const newTimeRemaining = Math.max(0, prev.timeRemaining - 1);

        if (newTimeRemaining === 0 && prev.availableRolls < prev.maxRolls) {
          // Timer ran out, add a roll and reset timer
          return {
            ...prev,
            timeRemaining: TIMER_DURATION,
            availableRolls: Math.min(prev.availableRolls + 1, prev.maxRolls),
          };
        }
        if (gameState.availableRolls >= gameState.maxRolls) {
          return { ...prev, timeRemaining: TIMER_DURATION };
        }

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.availableRolls, gameState.maxRolls]);

  // Show reward tooltip
  const showReward = useCallback((message: string) => {
    setGameState((prev) => ({
      ...prev,
      showRewardTooltip: true,
      rewardMessage: message,
    }));

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        showRewardTooltip: false,
        rewardMessage: "",
      }));
    }, 2000);
  }, []);

  // Animate player movement through each tile
  const animateMovement = useCallback(
    (startPos: number, endPos: number) => {
      setGameState((prev) => ({ ...prev, isMoving: true }));

      let currentPos = startPos;
      const totalTiles = INITIAL_TILES.length;
      const steps =
        endPos >= startPos ? endPos - startPos : totalTiles - startPos + endPos;

      const moveStep = () => {
        if (steps === 0) {
          setGameState((prev) => ({
            ...prev,
            isMoving: false,
            activeTile: endPos,
          }));

          // Handle landing on tile
          const landedTile = INITIAL_TILES[endPos];
          if (landedTile.type === "dice") {
            setGameState((prev) => ({ ...prev, balance: prev.balance + 1 }));
            showReward("+1 Balance!");
          } else {
            const rewards = {
              cash: "+10 Cash!",
              vip: "VIP Bonus!",
              star: "+5 Stars!",
              gem: "Rare Gem!",
              gold: "+20 Gold!",
              box: "Mystery Box!",
              pickaxe: "+1 Pickaxe!",
              truck: "Truck Bonus!",
            };
            const reward = rewards[landedTile.type as keyof typeof rewards];
            if (reward) showReward(reward);
          }

          // Clear active tile after 2 seconds
          setTimeout(() => {
            setGameState((prev) => ({ ...prev, activeTile: null }));
          }, 2000);
          return;
        }

        currentPos = (currentPos + 1) % totalTiles;
        setGameState((prev) => ({ ...prev, currentPosition: currentPos }));

        if (currentPos === endPos) {
          setTimeout(() => {
            setGameState((prev) => ({
              ...prev,
              isMoving: false,
              activeTile: endPos,
            }));

            // Handle landing on tile
            const landedTile = INITIAL_TILES[endPos];
            if (landedTile.type === "dice") {
              setGameState((prev) => ({ ...prev, balance: prev.balance + 1 }));
              showReward("+1 Balance!");
            } else {
              const rewards = {
                cash: "+10 Cash!",
                vip: "VIP Bonus!",
                star: "+5 Stars!",
                gem: "Rare Gem!",
                gold: "+20 Gold!",
                box: "Mystery Box!",
                pickaxe: "Mining Tool!",
                truck: "Transport Bonus!",
              };
              const reward = rewards[landedTile.type as keyof typeof rewards];
              if (reward) showReward(reward);
            }

            // Clear active tile after 2 seconds
            setTimeout(() => {
              setGameState((prev) => ({ ...prev, activeTile: null }));
            }, 2000);
          }, 300);
        } else {
          setTimeout(moveStep, 300);
        }
      };

      if (steps > 0) {
        setTimeout(moveStep, 300);
      }
    },
    [showReward]
  );

  const rollDice = useCallback(() => {
    if (
      gameState.isRolling ||
      gameState.isMoving ||
      gameState.availableRolls <= 0
    )
      return;

    setGameState((prev) => ({ ...prev, isRolling: true }));

    // Simulate dice roll animation
    setTimeout(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      const newPosition =
        (gameState.currentPosition + newDiceValue) % INITIAL_TILES.length;

      setGameState((prev) => ({
        ...prev,
        diceValue: newDiceValue,
        targetPosition: newPosition,
        availableRolls: prev.availableRolls - 1,
        isRolling: false,
      }));

      // Start movement animation
      animateMovement(gameState.currentPosition, newPosition);
    }, 1200);
  }, [
    gameState.isRolling,
    gameState.isMoving,
    gameState.availableRolls,
    gameState.currentPosition,
    animateMovement,
  ]);

  const addRoll = useCallback(() => {
    if (
      gameState.balance > 0 &&
      gameState.availableRolls < gameState.maxRolls
    ) {
      setGameState((prev) => ({
        ...prev,
        balance: prev.balance - 1,
        availableRolls: prev.availableRolls + 1,
      }));
    }
  }, [gameState.balance, gameState.availableRolls, gameState.maxRolls]);

  const handleTileClick = (tileId: number) => {
    console.log("Tile clicked:", tileId);
  };

  const handleTileHover = (tileId: number | null) => {
    setGameState((prev) => ({ ...prev, hoveredTile: tileId }));
  };

  const openModal = () => {
    setGameState((prev) => ({ ...prev, showModal: true }));
  };

  const closeModal = () => {
    setGameState((prev) => ({ ...prev, showModal: false }));
  };

  // const isTimerVisible = gameState.availableRolls < gameState.maxRolls;

  const closeOnBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const backdrop = document.querySelector(".modal");
    if (e.target === backdrop)
      setGameState((prev) => ({ ...prev, showModal: false }));
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "url(/src/assets/bg/top-star-bg.svg), url(/src/assets/bg/bottom-star-bg.svg), radial-gradient(rgba(153, 85, 255, 0.8), rgba(24, 26, 32, 0.5))",
        backgroundColor: "black",
        backgroundPosition: "top, bottom",
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className="container mx-auto px-4 py-6 max-w-md relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-5 w-full min-w-0">
          <div className="mb-[66px] w-full flex items-center justify-between gap-2">
            <button className="flex min-h-[30px] font-[SF Pro Rounded] font-bold items-center bg-white/20 gap-3 rounded-[80px] px-3 hover:bg-white/10 transition-colors text-[13px] leading-[13px]">
              <img
                className="rotate-90 w-[10px]"
                src="src/assets/icons/Arrow-down.svg"
              />

              <span>Close</span>
            </button>
            <img src="/src/assets/logo/logo.png" alt="Roll Craft Logo" />
            <div className="flex font-bold items-center bg-white/20 rounded-[80px] px-transition-colors text-[13px] leading-[13px]">
              <button className="flex p-2 min-h-[30px] hover:bg-white/10 transition-colors rounded-[80px]">
                <img src="src/assets/icons/Arrow-down.svg" />
              </button>
              <button className="flex font-bold min-h-[30px] items-center rounded-[80px] px-3 hover:bg-white/10 transition-colors text-[13px] leading-[13px]">
                <img src="src/assets/icons/Dots.svg" />
              </button>
            </div>
          </div>

          <h1 className="relative text-white text-lg font-bold flex items-center w-full justify-center title-divider">
            Roll Craft
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="max-w-[384px] mx-auto">
          <ProgressBar
            current={gameState.availableRolls}
            max={gameState.maxRolls}
            label="Available rolls"
          />

          {/* Timer */}
          <Timer
            timeRemaining={gameState.timeRemaining}
            // isVisible={isTimerVisible}
          />

          {/* Game Board */}
          <div className="mb-9">
            <GameBoard
              tiles={INITIAL_TILES}
              gameState={gameState}
              onTileClick={handleTileClick}
              onTileHover={handleTileHover}
            />
          </div>
        </div>

        <Balance
          balance={gameState.balance}
          availableRolls={gameState.availableRolls}
          maxRolls={gameState.maxRolls}
          onAddRoll={addRoll}
        />

        {/* Roll Button */}
        <div className="mb-12">
          <button
            onClick={rollDice}
            disabled={
              gameState.isRolling ||
              gameState.isMoving ||
              gameState.availableRolls <= 0
            }
            style={{
              boxShadow:
                "0px -1px 4px 0px rgba(255, 255, 255, 0.30) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.50) inset",
            }}
            className={`
              w-full py-4 px-6 rounded-lg font-[Inter] font-extrabold text-lg leading-[18px] transition-all duration-200

              ${
                gameState.isRolling ||
                gameState.isMoving ||
                gameState.availableRolls <= 0
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-b from-[#6DBF1D] to-[#498013] hover:from-green-600 hover:to-green-700 active:scale-95"
              }
              shadow-lg shadow-green-500/25
            `}
          >
            {gameState.isRolling
              ? "Rolling..."
              : gameState.isMoving
              ? "Moving..."
              : "Roll"}
          </button>
        </div>

        {/* How to Play */}

        <div className="text-center font-bold mx-auto font-[Inter] px-2 border border-white/20 max-w-[120px] text-[14px] py-[9px] leading-[100%] rounded-lg">
          <button
            onClick={openModal}
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            How to Play?
          </button>
        </div>

        {/* Modal */}
        <Modal
          isOpen={gameState.showModal}
          onCloseBackdrop={closeOnBackdropClick}
          onClose={closeModal}
          title="How to Play"
        >
          <div className="space-y-4">
            <p>Welcome to Roll Craft! Here's how to play:</p>
            <div className="space-y-2">
              <p>
                <strong>🎲 Rolling:</strong> Tap the "Roll" button to roll the
                dice and move your token.
              </p>
              <p>
                <strong>🏆 Tiles:</strong> Land on different tiles to collect
                rewards and power-ups.
              </p>
              <p>
                <strong>⭐ VIP Tiles:</strong> Special tiles that give bonus
                rewards.
              </p>
              <p>
                <strong>💎 Gems:</strong> Collect gems to unlock new features.
              </p>
              <p>
                <strong>⏰ Timer:</strong> Your rolls will increase after time.
              </p>
              <p>
                <strong>➕ Increase:</strong> Tap the button to increase your
                rolls.
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Use your rolls wisely and collect as many rewards as possible!
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
