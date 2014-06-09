var Grid = function(width, height) {
  this.width = width;
  this.height = height;

  this.cells = this._createCells(width, height);
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