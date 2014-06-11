define([], function() {
  var Cell = function(x, y) {
    this.x = x;
    this.y = y;
    this.dirty = false;
    this.obstacle = false;
    this.player = false;
    this.path = false;
    this.destination = false;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  };

  Cell.prototype.equals = function(cell) {
    return (this.x === cell.x && this.y === cell.y);
  };

  Cell.prototype.isDirty = function() {
    return this.dirty;
  };

  Cell.prototype.set = function(obj) {
    var i,
      keys = Object.keys(obj),
      length = keys.length;
    
    for(i = 0; i < length; i++){
      this[keys[i]] = obj[keys[i]];
    }

    this.setDirty();
  };

  Cell.prototype.setClean = function() {
    this.dirty = false;
  };

  Cell.prototype.setDirty = function() {
    this.dirty = true;
  };

  Cell.prototype.clicked = function() {
    this.setDirty();
  };

  Cell.prototype.rightClicked = function() {
    this.set({
      player: false,
      obstacle: !this.obstacle
    });
  };

  Cell.prototype.pos = function() {
    return { x: this.x, y: this.y };
  };

  return Cell;
});