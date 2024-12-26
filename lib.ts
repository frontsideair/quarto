/**
# Quarto

The game is played on a 4x4 grid by two players.
There are 16 pieces, each piece is either: black/white, round/square, short/tall, holey/whole.
The first player picks a piece for the opponent to place on any square they want. They take turns.
The game ends when a player makes a straight or diagonal match of fours, for any property of the pieces.

Each piece has a 4-bit information.
Any four match of any bit is the win condition.

Game state:
- Which player has the turn
- The player either picked a piece or not
- The grid state
- The remaining pieces

Some of these states can be derived.

Let's make determining the win condition easy. Since each piece is worth 4 bits, each row, column and the two diagonals are 16-bit numbers.

When a player makes a move, use a bitwise shift and perform a logical or operation.

Determining the win condition can be done with four logical and operations for each row, column and diagonal.

Printing the grid can be done with drawing e.g. only the rows. For each piece feature, bitwise shift and use a logical and operation.

Store remaining pieces as a 16-bit number, as they can be canonically ordered.

The board has to know if a piece is placed on a square, so we need a 16-bit number for this as well.

We can now safely determine if a piece is selected by a player, if so, this is stored in a 4-bit value.

We do this as, if the number of set bits in the remaining pile plus number of set bits on the board is less then 16, then a piece is picked.

We can also determine the player that has the turn with counting the remaining pieces, even means first player.

Can we store the whole board as a bitmap? 16x4=64 so we need a 64-bit register for this.

We need to generate magic numbers to calculate columns and diagonals.

In total, we would need 16 + 4 + 16 + 64 = 100 bits. It's not bad.
*/

type Board = {
  rows: number[];
  columns: number[];
  diagonals: number[];
};

export type GameState = {
  remainingPieces: number;
  selectedPiece: number;
  occupiedCoordinates: number;
  board: Board;
};

export type Coordinate = {
  row: number;
  column: number;
};

export function generateGameState() {
  const remainingPieces = 0b1111_1111_1111_1111;
  const selectedPiece = 0b0000;
  const occupiedCoordinates = 0b0000_0000_0000_0000;
  const board = {
    rows: [
      0b0000_0000_0000_0000, 0b0000_0000_0000_0000, 0b0000_0000_0000_0000,
      0b0000_0000_0000_0000,
    ],
    columns: [
      0b0000_0000_0000_0000, 0b0000_0000_0000_0000, 0b0000_0000_0000_0000,
      0b0000_0000_0000_0000,
    ],
    diagonals: [0b0000_0000_0000_0000, 0b0000_0000_0000_0000],
  };
  return { remainingPieces, selectedPiece, occupiedCoordinates, board };
}

function printBoard(game: GameState) {
  const output = [];
  const board = game.board;
  for (let i = 0; i < 4; i++) {
    const row = board.rows[i].toString(2).padStart(16, "0");
    let line = "";
    for (let j = 0; j < 4; j++) {
      const piece = row.slice(j * 4, j * 4 + 4);
      const isPositionOccupied =
        game.occupiedCoordinates & (1 << (i * 4 + (3 - j)));
      if (isPositionOccupied) {
        line += piece.padStart(4, "0");
      } else {
        line += "....";
      }
    }
    output.push(line);
  }
  return output.join("\n");
}

export function printGame(game: GameState) {
  const output = [];
  output.push(
    "Remaining pieces: " + game.remainingPieces.toString(2).padStart(16, "0")
  );
  output.push(
    "Selected piece: " + game.selectedPiece.toString(2).padStart(4, "0")
  );
  output.push(
    "Occupied coordinates: " +
      game.occupiedCoordinates.toString(2).padStart(16, "0")
  );
  output.push(printStatus(getStatus(game)));
  output.push(printBoard(game));
  // output.push(game.board.diagonals.map((c) => c.toString(2).padStart(16, "0")));
  return output.join("\n");
}

export type Piece = {
  isShort: boolean;
  isLight: boolean;
  isSolid: boolean;
  isRound: boolean;
};

export function toPiece(piece: number): Piece {
  return {
    isShort: Boolean(piece & 0b0001),
    isLight: Boolean(piece & 0b0010),
    isSolid: Boolean(piece & 0b0100),
    isRound: Boolean(piece & 0b1000),
  };
}

export function fromPiece(piece: Piece) {
  return (
    (piece.isShort ? 0b0001 : 0) |
    (piece.isLight ? 0b0010 : 0) |
    (piece.isSolid ? 0b0100 : 0) |
    (piece.isRound ? 0b1000 : 0)
  );
}

export type GameStatus = {
  winning: boolean;
  player: "Player 1" | "Player 2";
  selectedPiece: Piece | null;
};

export function getStatus(game: GameState) {
  const player = playerHasTurn(game) ? "Player 1" : "Player 2";
  const selectedPiece = getSelectedPiece(game);
  return {
    winning: isWinning(game),
    player: player,
    selectedPiece,
  } satisfies GameStatus;
}

export function printStatus({ winning, player }: GameStatus) {
  if (winning) {
    return `Winning: ${player}`;
  } else {
    return `Player has turn: ${player}`;
  }
}

export function getRemainingPieces(game: GameState) {
  const result: Piece[] = [];
  for (let i = 0; i < 16; i++) {
    const mask = 1 << i;
    if ((game.remainingPieces & mask) === mask) {
      result.push(toPiece(i));
    }
  }
  return result;
}

export function getSelectedPiece(game: GameState) {
  const numberOfOccupiedCoordinates = countSetBits(game.occupiedCoordinates);
  const numberOfRemainingPieces = countSetBits(game.remainingPieces);
  if (numberOfOccupiedCoordinates + numberOfRemainingPieces === 16) {
    return null;
  } else {
    return toPiece(game.selectedPiece);
  }
}

export function getBoard(game: GameState) {
  const output = [];
  for (let i = 0; i < 4; i++) {
    const row = game.board.rows[i];
    const line = [];
    for (let j = 0; j < 4; j++) {
      const piece = (row >> (j * 4)) & 0b1111;
      const isPositionOccupied = game.occupiedCoordinates & (1 << (i * 4 + j));
      if (isPositionOccupied) {
        line.push(toPiece(piece));
      } else {
        line.push(null);
      }
    }
    output.push(line);
  }
  return output;
}

const condition = 0b0001_0001_0001_0001;
const winConditions = [0, 1, 2, 3].map((i) => {
  return condition << i;
});

export function isWinningLine(line: number) {
  return winConditions.some((wc) => (line & wc) === wc || (~line & wc) === wc);
}

export function isRowOccupied(rowIndex: number, game: GameState) {
  const mask = 0b1111 << (rowIndex * 4);
  return (game.occupiedCoordinates & mask) === mask;
}

export function isColumnOccupied(columnIndex: number, game: GameState) {
  const mask = 0b0001_0001_0001_0001 << columnIndex;
  return (game.occupiedCoordinates & mask) === mask;
}

export function isDiagonalOccupied(diagonalIndex: number, game: GameState) {
  const mask =
    diagonalIndex === 0 ? 0b1000_0100_0010_0001 : 0b0001_0010_0100_1000;
  return (game.occupiedCoordinates & mask) === mask;
}

export function isWinning(game: GameState) {
  const rows = game.board.rows.filter((row, index) =>
    isRowOccupied(index, game)
  );
  const columns = game.board.columns.filter((column, index) =>
    isColumnOccupied(index, game)
  );
  const diagonals = game.board.diagonals.filter((diagonal, index) =>
    isDiagonalOccupied(index, game)
  );
  return (
    rows.some(isWinningLine) ||
    columns.some(isWinningLine) ||
    diagonals.some(isWinningLine)
  );
}

function countSetBits(n: number) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

function playerHasTurn(game: GameState) {
  return countSetBits(game.remainingPieces) % 2 === 0;
}

export function selectPiece(game: GameState, piece: number) {
  const piecePosition = 1 << piece;
  const remainingPieces = game.remainingPieces & ~piecePosition;
  return { ...game, remainingPieces, selectedPiece: piece };
}

export function placePiece(game: GameState, coordinate: Coordinate) {
  const position = 1 << (coordinate.row * 4 + coordinate.column);
  const selectedPiece = 0b0000;
  const occupiedCoordinates = game.occupiedCoordinates | position;

  const rows = game.board.rows.map((row: number, index: number) => {
    return index === coordinate.row
      ? row | (game.selectedPiece << (coordinate.column * 4))
      : row;
  });
  const columns = game.board.columns.map((column: number, index: number) => {
    return index === coordinate.column
      ? column | (game.selectedPiece << (coordinate.row * 4))
      : column;
  });
  const diagonals = [
    (game.board.diagonals[0] |=
      coordinate.row === coordinate.column
        ? game.selectedPiece << (coordinate.row * 4)
        : 0),
    (game.board.diagonals[1] |=
      coordinate.row === 3 - coordinate.column
        ? game.selectedPiece << (coordinate.row * 4)
        : 0),
  ];
  const board = { rows, columns, diagonals };
  return { ...game, selectedPiece, occupiedCoordinates, board };
}

function playMove(game: GameState, piece: number, coordinate: Coordinate) {
  const gameWithPiece = selectPiece(game, piece);
  return placePiece(gameWithPiece, coordinate);
}

export function play(moves: [number, Coordinate][]) {
  const game = generateGameState();
  return moves.reduce((acc, [piece, coordinate]) => {
    return playMove(acc, piece, coordinate);
  }, game);
}
