class Player {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
  move(steps) {
    this.position = steps;
  }
  setPosition(pos) {
    this.position = pos;
  }
}

class Snake {
  constructor(start, end) {
    if (end >= start) {
      throw new Error("Invalid Snake Move: End must be less the start");
    }
    this.start = start;
    this.end = end;
  }
  bite(position) {
    return position === this.start ? this.end : position;
  }
}

class Ladder {
  constructor(start, end) {
    if (start >= end) {
      throw new Error("Invalid Ladder: start must be less then end");
    }
    this.start = start;
    this.end = end;
  }
  climb(position) {
    return position === this.start ? this.end : position;
  }
}

class Board {
  constructor(size = 100, snakes = [], ladders = []) {
    this.size = size;
    this.snakes = snakes;
    this.ladders = ladders;
    this.loop = false;
  }
  processPosition(position) {
    for (const snake of this.snakes) {
      position = snake.bite(position);
    }
    for (const ladder of this.ladders) {
      position = ladder.climb(position);
    }
    return position;
  }
  isWinning(position) {
    return position === this.size;
  }
}
// snake-> [{start:0,end:1}]
class Game {
  constructor(playerNames, boardSize, snakesData, laddersData) {
    this.players = playerNames.map((name, i) => new Player(name, i));
    this.board = new Board(
      boardSize,
      snakesData.map((snake) => new Snake(snake.start, snake.end)),
      laddersData.map((ladder) => new Ladder(ladder.start, ladder.end))
    );
    this.currentPlayerIndex = 0;
  }
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  playerTurn() {
    const player = this.players[this.currentPlayerIndex];
    const diceRoll = this.rollDice();
    let newPosition = player.position + diceRoll;
    if (newPosition > this.board.size) {
      console.log(`${player.name} can't move forward`);
    } else {
      newPosition = this.board.processPosition(newPosition);
      console.log(`${player.name} has moved to postion ${newPosition}`);
      player.setPosition(newPosition);
    }
    if (this.board.isWinning(player.position)) {
      console.log(`${player.name} has Won!`);
      return true;
    }
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    return false;
  }
  startGame() {
    let gameOver = false;
    while (!gameOver) {
      gameOver = this.playerTurn();
    }
  }
}

const players = ["Stark", "Tony", "Alice"];
const snakes = [
  { start: 45, end: 34 },
  { start: 55, end: 30 },
  { start: 70, end: 36 },
];
const ladders = [
  { start: 4, end: 35 },
  { start: 41, end: 56 },
  { start: 20, end: 78 },
];
const game = new Game(players, 100, snakes, ladders);
game.startGame();
