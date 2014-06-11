require(['grid', 'canvas', 'astar'], function(Grid, Canvas, Astar){

  var App = function() {
    this.el = document.getElementById('canvas');

    var cellSize = 30;
    this.canvas = new Canvas(this.el, cellSize, 1, {
      destination: 'rgba(136, 203, 232, 1)',
      player: 'rgba(135, 255, 142, 1)',
      obstacle: 'rgba(255, 232, 180, 0.5)',
      path: 'rgba(50, 50, 50, 1)',
      grid: 'rgba(40, 40, 40, 1)'
    });

    this.grid = new Grid(Math.floor(this.el.width / cellSize) - 1, Math.floor(this.el.height / cellSize) - 1);
    this.astar = new Astar(this.grid);
    console.log(this.grid.width);
    // create a random destination
    this.destination = this.grid.getRandomCell();
    this.destination.set({ destination: true });

    // create random obstacles
    for(var i = 0; i < 300; i++){
      var cell = this.grid.getRandomCell();
      if(!cell.destination){
        cell.set({ obstacle: true });
      }
    }

    // save a reference to self
    var _this = this;

    // set event handlers
    this.el.addEventListener('click', function(event) {
      _this.clicked(event);
    });

    this.el.addEventListener('contextmenu', function(event) {
      _this.rightClicked(event);
    });

    this.clicked = function(event) {
      var cell = this.canvas.findCell(event.x, event.y, this.grid);
      this.grid.clicked(cell);
      var path = this.astar.getPath(cell, this.destination);

      for(var i = 0; i < path.length; i++){
        var thisCell = this.grid.getCell(path[i].x, path[i].y);
        if(!thisCell.destination){
          thisCell.set({ path: true });
        }
      }
    };

    this.rightClicked = function(event) {
      var cell = this.canvas.findCell(event.x, event.y, this.grid);
      this.grid.rightClicked(cell);

      event.preventDefault();
    };

    this.init = function() {
      this.canvas.drawGrid(this.grid);
      this.run();
    };

    this.run = function() {
      requestAnimationFrame(function() {
        _this.canvas.draw(_this.grid.getCells());
        _this.run();
      });
    };
  };

  var app = new App();

  app.init();
});