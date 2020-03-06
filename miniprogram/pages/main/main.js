// pages/main/main.js
var Board = require("./grid.js");
var Game = require("./game.js");

Page({
  data: {
    hidden: false,
    play: false,
    start: "开始游戏",
    num: [],
    score: "初见",
    bestScore: "初见",
    endMsg: '',
    over: false
  },
  // 页面渲染完成
  onReady: function () {
    if (!wx.getStorageSync("highScore"))
      wx.setStorageSync('highScore', "初见");
      this.setData({
        hidden: true,
      });
  },
  // 游戏开始
  gameStart: function () {
    var game = new Game(4);
    this.setData({
      start: "重新开始",
      play: true,
      game: game,
      bestScore: wx.getStorageSync('highScore')
    });
    this.data.game.__proto__ = game.__proto__;

    this.setData({
      over: false,
      score: "初见",
      num: this.data.game.board.grid
    });
  },
  // 游戏结束
  gameOver: function () {
    this.setData({
      over: true
    });

    if (this.data.score >= 4096) {
      this.setData({
        endMsg: '你和那个她一定会白头偕老的！'
      });
      wx.setStorageSync('highScore', "白头偕老");
    } else if (this.data.score > this.data.bestScore) {
      this.setData({
        endMsg: '恭喜你们又往白头偕老的道路前进了一大步！'
      });
      if(this.data.score == 32){
        wx.setStorageSync('highScore', "表白");
      }else if(this.data.score == 64){
        wx.setStorageSync('highScore', "恋爱");
      } else if (this.data.score == 128) {
        wx.setStorageSync('highScore', "热恋");
      } else if (this.data.score == 256) {
        wx.setStorageSync('highScore', "冷淡");
      } else if (this.data.score == 512) {
        wx.setStorageSync('highScore', "稳定");
      }else if (this.data.score == 1024){
        wx.setStorageSync('highScore', "恩爱");
      } else if (this.data.score == 2048) {
        wx.setStorageSync('highScore', "结婚");
      }else {
        wx.setStorageSync('highScore', "白头偕老");
      }
    } else {
      if (this.data.score <= 64){
        this.setData({
          endMsg: '加油鸭！做的更好才可以在一起哦！'
        });
      }else if(this.data.score <= 512){
        this.setData({
          endMsg: '恋爱中最重要的永远是对方呀！快去把她追回来吧！'
        });
      }else{
        this.setData({
          endMsg: '你想要的爱情一定会拥有的！'
        });
      }
    }
  },
  // 触摸
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  touchStart: function (ev) { // 触摸开始坐标
    var touch = ev.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;

  },
  touchMove: function (ev) { // 触摸最后移动时的坐标
    var touch = ev.touches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
  },
  touchEnd: function () {
    var disX = this.touchStartX - this.touchEndX;
    var absdisX = Math.abs(disX);
    var disY = this.touchStartY - this.touchEndY;
    var absdisY = Math.abs(disY);

    if (this.data.game.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      if (Math.max(absdisX, absdisY) > 10) { // 确定是否在滑动
        this.setData({
          start: "重新开始",
        });
        var direction = absdisX > absdisY ? (disX < 0 ? 1 : 3) : (disY < 0 ? 2 : 0);  // 确定移动方向
        var data = this.data.game.move(direction);
        this.updateView(data);
      }
    }
  },
  updateView(data) {
    var max = 0;
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 4; j++)
        if (data[i][j] != "" && data[i][j] > max)
          max = data[i][j];
        if (max == 2){
          max = "初见";
        }else if(max == 4){
          max = "搭赸";
        }else if(max == 8){
          max = "暧昧";
        }else if(max == 16){
          max = "约会";
        }else if(max == 32){
          max = "表白";
        }else if(max == 64){
          max = "恋爱";
        }else if(max == 128){
          max = "热恋";
        }else if(max == 256){
          max = "冷淡";
        }else if(max == 512){
          max = "稳定";
        }else if(max == 1024){
          max = "恩爱";
        }else if(max == 2048){
          max = "结婚";
        }else{
          max = "白头偕老";
        }
    this.setData({
      num: data,
      score: max
    });
  },
  onShareAppMessage: function () {
    return {
      title: '情侣版2048',
      desc: '听说玩到白头偕老的就会成真哦',
      path: '/pages/index'
    }
  }
})