import { test } from "node:test";
import {
  isWinningLine,
  play,
  isRowOccupied,
  isColumnOccupied,
  isDiagonalOccupied,
  isWinning,
  generateGameState,
} from "./lib.ts";

test("isWinningLine", (t) => {
  t.assert.equal(isWinningLine(0b0001_0001_0001_0001), true);
  t.assert.equal(isWinningLine(0b0010_0010_0010_0010), true);
  t.assert.equal(isWinningLine(0b0011_0011_0011_0011), true);
  t.assert.equal(isWinningLine(0b0000_0000_0000_0000), true);
  t.assert.equal(isWinningLine(0b0000_1111_0000_0000), false);
});

const game = play([
  [0b0000, { row: 0, column: 1 }],
  [0b0001, { row: 1, column: 1 }],
  [0b0010, { row: 2, column: 1 }],
  [0b0011, { row: 3, column: 1 }],
]);

const game1 = play([
  [0b0000, { row: 0, column: 0 }],
  [0b0001, { row: 1, column: 1 }],
  [0b0010, { row: 2, column: 2 }],
  [0b0011, { row: 3, column: 3 }],
]);

const game2 = play([
  [0b0000, { row: 0, column: 3 }],
  [0b0001, { row: 1, column: 2 }],
  [0b0010, { row: 2, column: 1 }],
  [0b0011, { row: 3, column: 0 }],
]);

test("isRowOccupied", (t) => {
  const game = play([
    [0b0000, { row: 1, column: 0 }],
    [0b0001, { row: 1, column: 1 }],
    [0b0010, { row: 1, column: 2 }],
    [0b0011, { row: 1, column: 3 }],
  ]);

  t.assert.equal(isRowOccupied(0, game), false);
  t.assert.equal(isRowOccupied(1, game), true);
  t.assert.equal(isRowOccupied(2, game), false);
  t.assert.equal(isRowOccupied(3, game), false);
});

test("isColumnOccupied", (t) => {
  t.assert.equal(isColumnOccupied(0, game), false);
  t.assert.equal(isColumnOccupied(1, game), true);
  t.assert.equal(isColumnOccupied(2, game), false);
  t.assert.equal(isColumnOccupied(3, game), false);
});

test("isDiagonalOccupied", (t) => {
  t.assert.equal(isDiagonalOccupied(0, game), false);
  t.assert.equal(isDiagonalOccupied(1, game), false);
  t.assert.equal(isDiagonalOccupied(0, game1), true);
  t.assert.equal(isDiagonalOccupied(1, game1), false);
  t.assert.equal(isDiagonalOccupied(0, game2), false);
  t.assert.equal(isDiagonalOccupied(1, game2), true);
});

test("isWinning", (t) => {
  t.assert.equal(isWinning(game), true);
  t.assert.equal(isWinning(game1), true);
  t.assert.equal(isWinning(game2), true);
  t.assert.equal(isWinning(generateGameState()), false);
});
