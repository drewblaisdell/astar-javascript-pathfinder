define(function (require) {
  var el = document.getElementById('canvas'),
    canvas = new Canvas(el, 90, 30);

  canvas.drawGrid();
  canvas.run();
});