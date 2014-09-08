/**
 * Number of cells in grid, e.g. 25 (could be 5 horizontal, 5 vertical)
 *
 * @type {number}
 */
var numberOfCellsInGrid = 25;

/**
 * The player's grid containing his ships and hit statistics
 *
 * @constructor
 */
var Grid = function(){
    /**
     * The cells in the grid
     * @type {Array}
     */
    this.gridCells = [];

    //populate the grid cells
    for(var i =0 ; i<numberOfCellsInGrid;i++){
        this.gridCells.push(new GridCell());
    }

    /**
     * Place a ship at the specified position
     * @todo make sure that:
     *   1.the player has unplaced ships
     *   2.the cell is not already occupied
     *
     * @param pos
     */
    this.placeShipAt = function(pos){
        this.gridCells[pos].occupied = true;
    };

    /**
     * Fire at the specified position
     *
     * @param pos
     */
    this.fireAt = function(pos){
        this.gridCells[pos].hit = true;
    };
    /**
      * get the status of the cell
      *
      * @ return 2 if hidden 1 if hit and empty 2 if hit and occupied
      */

    var getPublicGrid = function(){
      var publicGrid=[];
      this.gridCells.forEach(function (cell){
        publicGrid.push(cell.getPublicCellStatus());
      });
      return publicGrid;
    }

    var getPrivateGrid = function(){
      var privateGrid=[];
      this.gridCells.forEach(function (cell){
        privateGrid.push(cell.getPublicCellStatus());
      });
      return privateGrid;

    };
    /**
     * Returns true if the player has living ships, false if all the ships are destroyed
     *
     * @returns {boolean}
     */
    this.hasLivingShips = function(){
        for(var j=0;j<this.gridCells.length;j++){
            if(this.gridCells[j].occupied && !this.gridCells[j].hit){
                return true;
            }
        }
        return false;
    };
};

/**
 * A cell in a grid
 *
 * @constructor
 */

var GridCell = function(){
    this.occupied = false;
    this.hit      = false;
    /**
      * get the status of the cell
      *
      * @ returns
      * H S
      * 0 0
      * 0 1
      * 1 0
      * 1 1
      */
    var getCellStatus = function(pos){
      if(this.occupied){
          if(this.hit)
            return 3;
          return 1;
      }
      else {
        if(this.hit)
          return 2;
        return 0;
      }
    }
    var getPublicCellStatus = function(pos){
      if(this.hit){
        if(this.occupied)
          return 3;
        return 2;
      }
      else {
        return 4;
      }
    }
};

exports.Grid = Grid;
exports.GridCell = GridCell;
