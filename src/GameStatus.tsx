import { type GameStatus, printStatus } from "../lib";
import { SelectedPiece } from "./SelectedPiece";

type Props = {
  data: GameStatus;
  resetGame: () => void;
};

export function GameStatus({ data, resetGame }: Props) {
  return (
    <>
      <h2>GameStatus</h2>
      <p>{printStatus(data)}</p>
      <SelectedPiece data={data.selectedPiece} />
      <button onClick={() => resetGame()}>
        {data.winning ? "Play again" : "Reset"}
      </button>
    </>
  );
}
