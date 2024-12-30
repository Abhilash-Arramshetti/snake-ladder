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
