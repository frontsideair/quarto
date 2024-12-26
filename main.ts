import { printGame, play } from "./lib";

printGame(
  play([
    [0b1011, { row: 1, column: 1 }],
    [0b0101, { row: 0, column: 0 }],
    [0b1101, { row: 2, column: 2 }],
    [0b0111, { row: 3, column: 3 }],
  ])
);
