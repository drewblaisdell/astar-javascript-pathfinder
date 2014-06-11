define(['cell'], function(Cell) {
  var Grid = function(width, height) {
    this.width = width;
    this.height = height;

    this.cells = this._createCells(width, height);
  };

  Grid.prototype.clicked = function(cell) {
    cell.clicked();
  };

  Grid.prototype.rightClicked = function(cell) {
    cell.rightClicked();
  };

  Grid.prototype._createCells = function(width, height) {
    var i, j, cells = new Array(height);

    for(i = 0; i < height; i++) {
      cells[i] = new Array(width);
      for(j = 0; j < width; j++) {
        cells[i][j] = new Cell(j, i);
      }
    }

    return cells;
  };

  Grid.prototype.getCell = function(x, y) {
    return this.cells[y][x];
  };

  Grid.prototype.getCells = function() {
    return [].concat.apply([], this.cells);
  };

  Grid.prototype.getRandomCell = function() {
    var x = Math.floor(Math.random() * this.width),
      y = Math.floor(Math.random() * this.height);

    return this.getCell(x, y);
  };

  Grid.prototype.walkableNeighbors = function(cell) {
    var neighbors = [],
      cells = this.cells,
      x = cell.x,
      y = cell.y;

    if(cells[y - 1] && cells[y - 1][x] && !cells[y - 1][x].obstacle){
      neighbors.push(cells[y - 1][x]);
    }
    if(cells[y + 1] && cells[y + 1][x] && !cells[y + 1][x].obstacle){
      neighbors.push(cells[y + 1][x]);
    }
    if(cells[y] && cells[y][x - 1] && !cells[y][x - 1].obstacle){
      neighbors.push(cells[y][x - 1]);
    }
    if(cells[y] && cells[y][x + 1] && !cells[y][x + 1].obstacle){
      neighbors.push(cells[y][x + 1]);
    }
    return neighbors;
  };

  return Grid;
});