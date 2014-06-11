define([], function() {
  var Astar = function(grid) {
    this.grid = grid;
  };

  Astar.prototype.heuristic = function(c1, c2) {
    var d1 = Math.abs(c2.x - c1.x),
      d2 = Math.abs(c2.y - c1.y);

    return d1 + d2;
  };

  Astar.prototype.posEquals = function(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
  };

  Astar.prototype.shuffle = function(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };

  Astar.prototype.getPath = function(start, goal) {
    var grid = this.grid,
      closedList = [],
      openList = [];

    openList.push(start.pos());

    while(openList.length > 0) {
      var i, j,
        neighbors,
        path = [],
        current,
        currentCell,
        lowPoint = 0,
        listLength = openList.length;
      
      for(i = 0; i < listLength; i++){
        if(openList[i].f < openList[lowPoint].f){
          lowPoint = i;
        }
      }

      currentCell = openList[lowPoint];

      if(this.posEquals(currentCell, goal)){
        current = currentCell;

        while(current.parent) {
          path.push(current);
          current = current.parent;
        }

        return path.reverse();
      }

      openList.splice(lowPoint, 1);
      closedList.push(currentCell);
      neighbors = grid.walkableNeighbors(currentCell);

      neighbors = this.shuffle(neighbors);

      for(i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i].pos();

        if(closedList.indexOf(neighbor) > -1){
          continue;
        }

        var gScore = currentCell.g + 1,
          gScoreIsBest = false,
          inOpenList = false;

        for(j = 0; j < openList.length; j++){
          if(this.posEquals(openList[j], neighbor)){
            inOpenList = true;
            break;
          }
        }

        if(!inOpenList){
          gScoreIsBest = true;
          neighbor.h = this.heuristic(neighbor, goal);
          openList.push(neighbor);
        } else if(gScore < neighbor.g){
          gScoreIsBest = true;
        }

        if(gScoreIsBest){
          neighbor.parent = currentCell;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }

    return [];
  };

  return Astar;
});