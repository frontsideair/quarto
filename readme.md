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
