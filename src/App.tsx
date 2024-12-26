import { useState } from "react";
import {
  fromPiece,
  generateGameState,
  getBoard,
  getRemainingPieces,
  getSelectedPiece,
  getStatus,
  placePiece,
  printGame,
  selectPiece,
} from "../lib";
import { Board } from "./Board";
import { RemainingPieces } from "./RemainingPieces";
import { SelectedPiece } from "./SelectedPiece";
import { GameStatus } from "./GameStatus";

const App = () => {
  const [gameState, setGameState] = useState(generateGameState());
  const gameStatus = getStatus(gameState);
  const selectedPiece = gameStatus.selectedPiece;

  return (
    <div className="content">
      <h1>Quarto</h1>
      <GameStatus
        data={gameStatus}
        resetGame={() => setGameState(generateGameState())}
      />
      <RemainingPieces
        data={getRemainingPieces(gameState)}
        onSelect={(piece) => {
          if (!selectedPiece && !gameStatus.winning) {
            setGameState(selectPiece(gameState, fromPiece(piece)));
          }
        }}
      />
      <Board
        data={getBoard(gameState)}
        onSelect={(coordinate) => {
          if (selectedPiece && !gameStatus.winning) {
            setGameState(placePiece(gameState, coordinate));
          }
        }}
      />
    </div>
  );
};

export default App;
