import type { Coordinate, Piece as PieceType } from "../lib";
import { EmptyPiece, Piece } from "./Piece";

type Props = {
  data: (PieceType | null)[][];
  onSelect: (coordinate: Coordinate) => void;
};

export function Board({ data, onSelect }: Props) {
  return (
    <div>
      <style>{`
        table {
          border-collapse: collapse;
        }
        td {
          border: 1px solid black;
          width: 50px;
          height: 50px;
          text-align: center;
        }
      `}</style>
      <h2>Board</h2>
      <table>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: 4 }).map((_, j) => {
                const piece = data[i][j];
                return (
                  <td
                    key={j}
                    onClick={() => {
                      if (!piece) {
                        onSelect({ row: i, column: j });
                      }
                    }}
                  >
                    {piece ? <Piece data={piece} /> : <EmptyPiece />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
