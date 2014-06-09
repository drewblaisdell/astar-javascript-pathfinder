var Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.color = '#ffffff';
  this.dirty = true;
};

Cell.prototype.isDirty = function() {
  return this.dirty;
};

Cell.prototype.setClean = function() {
  this.dirty = false;
};

Cell.prototype.clicked = function() {
  this.color = '#ffd0ff';
  this.dirty = true;
};

Cell.prototype.rightClicked = function() {
  this.color = '#00ff00';
  this.dirty = true;
};