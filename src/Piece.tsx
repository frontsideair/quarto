import type { Piece } from "../lib";

type Props = {
  data: Piece;
};

export function Piece({ data }: Props) {
  const color = data.isLight ? "#a88650" : "#643b18";
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      {data.isRound ? (
        <>
          {data.isShort ? null : <circle cx="12" cy="10" r="8" fill={color} />}
          <circle cx="12" cy="16" r="8" fill={color} />
          {data.isSolid ? null : (
            <circle cx="12" cy={data.isShort ? 16 : 10} r="4" fill="white" />
          )}
        </>
      ) : (
        <g transform="rotate(45 12 12)">
          {data.isShort ? null : (
            <rect x="4" y="4" width="12" height="12" fill={color} />
          )}
          <rect x="8" y="8" width="12" height="12" fill={color} />
          {data.isSolid ? null : (
            <rect
              x={data.isShort ? 11 : 7}
              y={data.isShort ? 11 : 7}
              width="6"
              height="6"
              fill="white"
            />
          )}
        </g>
      )}
    </svg>
  );
}

export function EmptyPiece() {
  return <svg viewBox="0 0 24 24" width="24" height="24" />;
}
