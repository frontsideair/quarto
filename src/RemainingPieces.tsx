import type { Piece as PieceType } from "../lib";
import { Piece } from "./Piece";

type Props = {
  data: PieceType[];
  onSelect: (piece: PieceType) => void;
};

export function RemainingPieces({ data, onSelect }: Props) {
  return (
    <div>
      <style>{`
        ul {
          list-style-type: none;
          padding: 0;
          display: flex;
          overflow-x: auto;
          background-color: white;
          max-width: 100vw;
        }
        li {
          cursor: pointer;
          margin: 0.5rem;
        }
      `}</style>
      <ul>
        {data.map((piece, index) => (
          <li key={index} onClick={() => onSelect(piece)}>
            <Piece data={piece} />
          </li>
        ))}
      </ul>
    </div>
  );
}
