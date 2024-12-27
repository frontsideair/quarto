import { useState } from "react";
import {
  fromPiece,
  generateGameState,
  getBoard,
  getRemainingPieces,
  getStatus,
  placePiece,
  selectPiece,
} from "../lib";
import { Board } from "./Board";
import { RemainingPieces } from "./RemainingPieces";
import { GameStatus } from "./GameStatus";

const App = () => {
  const [gameState, setGameState] = useState(generateGameState());
  const gameStatus = getStatus(gameState);
  const selectedPiece = gameStatus.selectedPiece;

  return (
    <div className="content">
      <style>{`
        html {
          color-scheme: dark;
          --accent: rgb(143 112 112);
        }
        .content {
          display: flex;
          gap: 4px;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        h1 {
          font-size: 7rem;
          margin: 0;
        }
        a {
          color: white;
        }
        footer {
          display: flex;
          gap: 4px;
        }
      `}</style>
      <h1>quarto</h1>
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
      <footer>
        Originally designed by Blaise Müller &middot;
        <a
          href="https://en.wikipedia.org/wiki/Quarto_(board_game)"
          target="_blank"
        >
          Learn the game
        </a>
        &middot;
        <a href="https://github.com/frontsideair/quarto" target="_blank">
          Fork me on GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
