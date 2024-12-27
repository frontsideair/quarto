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
        }
        .status {
          color: rgb(107 104 107);
        }
      `}</style>
      <p className="status">{printStatus(data)}</p>
      <div className="controls">
        {data.winning ? null : <SelectedPiece data={data.selectedPiece} />}
        <button onClick={() => resetGame()}>
          {data.winning ? "Play again?" : "Reset"}
        </button>
      </div>
    </>
  );
}
