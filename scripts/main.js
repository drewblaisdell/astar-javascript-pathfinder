require(['grid', 'canvas', 'astar', 'player'], function(Grid, Canvas, Astar, Player){

  var App = function() {
    this.el = document.getElementById('canvas');

    var cellSize = 15;
    this.canvas = new Canvas(this.el, cellSize, 1, {
      destination: 'rgba(0, 245, 100, 1)',
      player: 'rgba(20, 100, 204, 1)',
      obstacle: 'rgba(100, 100, 100, 1)',
      path: 'rgba(50, 50, 50, 0.2)',
      grid: 'rgba(200, 200, 200, 1)',
      background: 'rgba(255, 255, 255, 1)'
    });

    this.grid = new Grid(Math.floor(this.el.width / (cellSize + 1)), Math.floor(this.el.height / (cellSize + 1)));
    this.astar = new Astar(this.grid);

    // place a player randomly
    this.player = new Player(this.grid.getRandomCell(), this.grid);

    // create random obstacles
    for(var i = 0; i < Math.floor(this.el.height / 3); i++){
      var cell = this.grid.getRandomCell();
      if(!cell.player){
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
      var x = event.x || event.clientX,
        y = event.y || event.clientY,
        cell = this.canvas.findCell(x, y, this.grid);

      if(cell.obstacle) {
        return;
      }

      this.grid.clicked(cell);

      if(this.destination) {
        this.destination.set({ destination: false });
      }

      cell.set({ destination: true });
      this.destination = cell;
      this.player.moveTo(cell);
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
        _this.player.tick();
        _this.canvas.draw(_this.grid.getCells());
        _this.run();
      });
    };
  };

  var app = new App();

  app.init();
});