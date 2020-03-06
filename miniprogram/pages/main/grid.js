function Board(size) {
  this.size = size;
  this.grid = this.init();
}
Board.prototype = {
  init() {
    var grid = [];
    for(var i = 0; i < this.size; i++) {
      grid[i] = [];
      for(var j = 0; j < this.size; j++) {
        grid[i].push("");
      }
    }
    return grid;
  },
  usefulCell() {
    var cells = [];
    for(var i = 0; i < this.size; i++)
      for(var j = 0; j < this.size; j++) {
        if(this.grid[i][j] == "") {
          cells.push({
            x: i,
            y: j
          });
        }
      }
      return cells;
  },
  selectCell() {
    var cells = this.usefulCell();
    if(cells.length) {
      return cells[Math.floor(Math.random()*cells.length)];
    }
  }, 
  cellEmpty() {
    return !this.usefulCell().length;
  }
};

module.exports = Board;