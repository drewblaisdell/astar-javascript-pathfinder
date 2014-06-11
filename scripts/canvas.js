define(['grid', 'cell'], function(Grid, Cell) {
  var Canvas = function(el, cellSize, borderWidth, colors) {
    this.el = el;
    this.context = el.getContext('2d');
    this.cellSize = cellSize;
    this.borderWidth = borderWidth;
    this.colors = colors;

    // resize the element
    this.el.width = window.innerWidth;
    this.el.height = window.innerHeight;

    // listen for clicks
  };

  Canvas.prototype.findCell = function(x, y, grid) {
    var cellSize = this.cellSize,
      borderWidth = this.borderWidth,
      cellX = Math.floor(x / (cellSize + borderWidth)),
      cellY = Math.floor(y / (cellSize + borderWidth));

    return grid.getCell(cellX, cellY);
  };

  Canvas.prototype.drawGrid = function(grid) {
    var i,
      j,
      colors = this.colors,
      context = this.context,
      borderWidth = this.borderWidth,
      cellSize = this.cellSize;

    for(i = 0; i < grid.height + 1; i++) {
      context.lineWidth = borderWidth;
      context.beginPath();
      context.moveTo(0, i * (cellSize + borderWidth) + 0.5);
      context.lineTo((cellSize + borderWidth) * grid.width, i * (cellSize + borderWidth) + 0.5);
      context.strokeStyle = colors.grid;
      context.stroke();
    }

    for(j = 0; j < grid.width + 1; j++) {
      context.lineWidth = borderWidth;
      context.beginPath();
      context.moveTo(j * (this.cellSize + borderWidth) + 0.5, 0);
      context.lineTo(j * (this.cellSize + borderWidth) + 0.5, grid.height * (this.cellSize + borderWidth) + 0.5);
      context.strokeStyle = colors.grid;
      context.stroke();
    }
  };

  Canvas.prototype.paintCell = function(cell) {
    var i,
      colors = this.colors,
      colorKeys = Object.keys(colors),
      colorFound = false,
      context = this.context,
      borderWidth = this.borderWidth,
      cellSize = this.cellSize,
      x1 = cell.x * (cellSize + borderWidth) + 1,
      y1 = cell.y * (cellSize + borderWidth) + 1;

      context.clearRect(x1, y1, cellSize, cellSize);

      for(i = 0; i < colorKeys.length; i++){
        var k = colorKeys[i], v = colors[k];

        if(cell[k]){
          context.fillStyle = v;
          colorFound = true;
          break;
        }
      }

      if(!colorFound) {
        context.fillStyle = colors.background;
      }

      context.fillRect(x1, y1, cellSize, cellSize);
  };

  Canvas.prototype.draw = function(cells) {
    var i, length = cells.length;

    for(i = 0; i < length; i++){
      if(cells[i].isDirty()){
        this.paintCell(cells[i]);
        cells[i].setClean();
      }
    }
  };

  return Canvas;
});