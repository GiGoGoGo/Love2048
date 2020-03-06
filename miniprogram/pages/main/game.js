var Board = require("./grid.js");

function Game(size) { 
  this.size = size;
  this.startData = 2;
  this.init();
}

Game.prototype = {
  init() {
    this.board = new Board(this.size);
    this.bproto = this.board.__proto__;
    this.setDataRandom();
    this.startData = 1;
  },
  setDataRandom() {
    for(var i = 0; i < this.startData; i++) {
      this.addRandomData();
    }
  },
  addRandomData() {
    if(!this.board.cellEmpty()) {
      var value = Math.random() < 0.9 ? 2 : 4;
      var cell = this.board.selectCell(); 
      cell.val = value; 
      this.update(cell);
    }
  },
  update(cell) {
    this.board.grid[cell.x][cell.y] = cell.val;
  },
  move(dir) {
    var curList = this.formList(dir);

    var list = this.combine(curList); 
    var result = [[],[],[],[]];

    for(var i = 0; i < this.size; i++)
      for(var j = 0; j < this.size; j++) {
        switch (dir) {
          case 0:
            result[i][j] = list[j][i];
            break;
          case 1:
            result[i][j] = list[i][this.size-1-j];
            break;
          case 2:
            result[i][j] = list[j][this.size-1-i];
            break;
          case 3:
            result[i][j] = list[i][j];
            break;
        }
      } 
    this.board.grid = result;
    this.setDataRandom();

    return result;
  },
  formList(dir) {
    var list = [[], [], [], []];
    for(var i = 0; i < this.size; i++)
      for(var j = 0; j < this.size; j++) {
        switch(dir) {
          case 0:
            list[i].push(this.board.grid[j][i]);
            break;
          case 1:
            list[i].push(this.board.grid[i][this.size-1-j]);
            break;
          case 2:
            list[i].push(this.board.grid[this.size-1-j][i]);
            break;
          case 3:
            list[i].push(this.board.grid[i][j]);
            break;
        }
      }
    return list;
  },
  combine(list) {
    for(var i = 0; i < list.length; i++)  // 数字靠边
      list[i] = this.changeItem(list[i]);

    for(var i = 0; i < this.size; i++) { 
      for(var j = 1; j < this.size; j++) {
        if(list[i][j-1] == list[i][j] && list[i][j]!="") {
          list[i][j-1] += list[i][j];
          list[i][j] = ""; 
        }
      }
    }
    for (var i = 0; i < list.length; i++)
      list[i] = this.changeItem(list[i]);
      
    return list;
  },
  changeItem(item) {
    var cnt = 0;
    for(var i = 0; i < item.length; i++)
      if(item[i] != '')
        item[cnt++] = item[i];
    for(var j = cnt; j < item.length; j++) 
      item[j] = "";
    return item;
  },
  isOver() {
    this.board.__proto__ = this.bproto;
    if (!this.board.cellEmpty()) {
      return false;
    } else {
      for (var i = 0; i < this.size; i++)
        for (var j = 1; j < this.size; j++) {
          if (this.board.grid[i][j] == this.board.grid[i][j - 1])
            return false;
        }
      for (var j = 0; j < this.size; j++)
        for (var i = 1; i < this.size; i++) {
          if (this.board.grid[i][j] == this.board.grid[i - 1][j])
            return false;
        }
    }
    return true;
  } 
};

module.exports = Game;