define(['astar'], function(Astar) {
  var Player = function(cell, grid) {
    this.cell = cell;
    this.grid = grid;
    this.path = [];
    this.astar = new Astar(grid);
    this.lastMoved = +new Date();
    this.speed = 50;

    this.cell.set({ player: true });
  };

  Player.prototype.move = function(nextCell) {
    this.cell.set({ player: false, path: true });
    this.cell = nextCell;
    this.cell.set({ player: true, path: false, destination: false });

    this.lastMoved = +new Date();
  };

  Player.prototype.moveTo = function(goalCell) {
    this.path = this.astar.getPath(this.cell, goalCell);
  };

  Player.prototype.tick = function() {
    var now = +new Date();

    if(this.path.length > 0 && now - this.lastMoved > this.speed){
      var nextCellPos = this.path.splice(0, 1)[0],
        nextCell = this.grid.getCell(nextCellPos.x, nextCellPos.y);

      this.move(nextCell);
    }
  };

  return Player;
});