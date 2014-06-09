var Canvas = function(el, gridSize, cellSize) {
  this.el = el;
  this.context = el.getContext('2d');
  this.gridSize = gridSize;
  this.cellSize = cellSize;
  this.grid = new Grid(gridSize, gridSize);

  // resize the element
  this.el.width = window.innerWidth;
  this.el.height = window.innerHeight;

  // listen for clicks
  var _this = this;
  
  el.addEventListener('click', function(event) {
    _this.clicked(event);
  });

  el.addEventListener('contextmenu', function(event) {
    _this.rightClicked(event);
  });
};

Canvas.prototype.findCell = function(x, y) {
  var cellSize = this.cellSize,
    cellX = Math.floor(x / (cellSize + 1)),
    cellY = Math.floor(y / (cellSize + 1));

  return this.grid.getCell(cellX, cellY);
};

Canvas.prototype.clicked = function(event) {
  var cell = this.findCell(event.x, event.y);
  
  cell.clicked();
};

Canvas.prototype.rightClicked = function(event) {
  var cell = this.findCell(event.x, event.y);
  
  cell.rightClicked();

  event.preventDefault();
};

Canvas.prototype.drawGrid = function() {
  var i, j,
    context = this.context,
    grid = this.grid;

  for(i = 0; i < grid.height + 1; i++) {
    context.beginPath();
    context.moveTo(0, i * (this.cellSize + 1) + 0.5);
    context.lineTo((this.cellSize + 1) * grid.width, i * (this.cellSize + 1) + 0.5);
    context.strokeStyle = '#aaaaff';
    context.stroke();
  }

  for(j = 0; j < grid.width + 1; j++) {
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(j * (this.cellSize + 1) + 0.5, 0);
    context.lineTo(j * (this.cellSize + 1) + 0.5, grid.height * (this.cellSize + 1) + 0.5);
    context.strokeStyle = '#aaaaff';
    context.stroke();
  }
};

Canvas.prototype.paintCell = function(cell) {
  var context = this.context,
    grid = this.grid,
    cellSize = this.cellSize,
    x1 = cell.x * (cellSize + 1) + 1,
    y1 = cell.y * (cellSize + 1) + 1;

    context.fillStyle = cell.color;
    context.fillRect(x1, y1, cellSize, cellSize);
};

Canvas.prototype.run = function() {
  var i,
    cells = this.grid.getCells(),
    length = cells.length;

  for(i = 0; i < length; i++){
    if(cells[i].isDirty()){
      this.paintCell(cells[i]);
      cells[i].setClean();
    }
  }

  var _this = this;
  requestAnimationFrame(function() { _this.run(); });
};