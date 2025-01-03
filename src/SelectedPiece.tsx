import type { Piece as PieceType } from "../lib";
import { EmptyPiece, Piece } from "./Piece";

type Props = {
  data: PieceType | null;
};

export function SelectedPiece({ data }: Props) {
  return <div>{data ? <Piece data={data} /> : <EmptyPiece />}</div>;
}
