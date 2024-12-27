import { type GameStatus, printStatus } from "../lib";
import { SelectedPiece } from "./SelectedPiece";

type Props = {
  data: GameStatus;
  resetGame: () => void;
};

export function GameStatus({ data, resetGame }: Props) {
  return (
    <>
      <style>{`
        .controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          background-color: white;
          color: black;
          padding: 1rem;
          width: 120px;
          height: 24px;
          text-transform: uppercase;
          font-family: monospace;
        }
        .status {
          font-family: monospace;
          color: var(--accent);
        }
        button {
          border: none;
          margin: 0;
          padding: 4px 8px;
          height: fit-content;
          width: auto;
          overflow: visible;
          color: white;
          background: var(--accent);
          font: inherit;
          color: white;
          cursor: pointer;
        }
      `}</style>
      <p className="status">{printStatus(data)}</p>
      <div className="controls">
        {data.winning ? null : <SelectedPiece data={data.selectedPiece} />}
        <button onClick={() => resetGame()}>
          {data.winning ? "PLAY AGAIN?" : "RESET"}
        </button>
      </div>
    </>
  );
}
