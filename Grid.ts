/**
   * Grid
   * ----
   * Grid class represents a Grid like strucutre with rows & columns
   * This is like a 4 ways linked lists, each tile has top, bottom, right & left
   * links to another tile in those directions.
   */
class Grid {
  itemsCount: number;
  rowsCount: number;
  columnsCount: number;
  head: Tile | null;
  tail: Tile | null;
  items: Tile[];
  rows: Tile[][];
  private rowStart?: Tile;

  /**
   * Initializes Grid class
   * @param rowsCount - no of rows for the grid, also defines rowsCount property of the grid.
   * @param columnsCount - no of rows for the grid, also defines rowsCount property of the grid.
   * @param values - no of rows for the grid, also defines rowsCount property of the grid.
   */
  constructor(rowsCount: number, columnsCount: number, values: number[]) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.head = null;
    this.tail = null;
    this.itemsCount = values.length;
    this.items = values.map((value, index) => new Tile(index, value));
    this.rows = [];

    for (let rowCounter = 1; rowCounter <= this.rowsCount; rowCounter++) {
      const currentRow: Tile[] = [];
      for (
        let columnCounter = 1;
        columnCounter <= this.columnsCount;
        columnCounter++
      ) {
        const tile = this
          .items[
            (((rowCounter - 1) * this.columnsCount) + columnCounter) - 1
          ];

        if (this.head === null) {
          this.head = tile;
        }

        if (columnCounter === 1) {
          this.rowStart = tile;
        }

        if (this.rowStart) {
          // tile.left = this.rowStart;
          this.rowStart.right = tile;
          currentRow.push(tile);
        }

        if (columnCounter === columnsCount && this.rowStart) {
          this.rows.push(currentRow);
          this.rowStart = undefined; // no need for this, but just to be sure.
        }

        if (this.tail) {
          tile.left = this.tail;
          this.tail.right = tile;
        }
        this.tail = tile;
      }
    }
    this.linkItems();
  }

  /**
   * links items vertically, i.e., top & bottom properties of each tile will be
   * filled appropriately.
   * this is done by looping row and column wise and for each tile
   * we identify top and bottom tiles by calculating it's position using
   * current row and column counters and assign accordingly.
   * top property for top row items and bottom property for bottom row items would be null.
   */
  linkItems(): void {
    for (let rowCounter = 1; rowCounter <= this.rowsCount; rowCounter++) {
      for (
        let columnCounter = 1;
        columnCounter <= this.columnsCount;
        columnCounter++
      ) {
        const tile = this
          .items[
            (((rowCounter - 1) * this.columnsCount) + columnCounter) - 1
          ];

        if (rowCounter === 1) tile.top = null;
        else {
          if (rowCounter > 1) {
            tile.top = this
              .items[((rowCounter - 2) * this.columnsCount) + columnCounter];
          }
        }
        if (rowCounter === this.rowsCount) tile.bottom = null;
        else {
          tile.bottom = this
            .items[((rowCounter) * this.columnsCount) + columnCounter];
        }
      }
    }
  }

  /**
   * Returns value by index (0 based array index)
   * @param id - index
   * @returns - value
   */
  getById(id: number): number {
    return this.items[id].value;
  }

  /**
   * Returns value by taking row & column index
   * both row and column indicies are 0 based.
   * @param rowIndex 
   * @param columnIndex 
   * @returns 
   */
  getByRowAndColumnIndex(rowIndex: number, columnIndex: number): number {
    return this.items[((rowIndex - 1) * columnIndex) - 1].value;
  }

  /**
   * 
   * @returns the columnsCount of the grid
   */
  getWidth(): number {
    return this.columnsCount;
  }

  /**
   * 
   * @returns rowsCount of the grid
   */
  getHeight(): number {
    return this.rowsCount;
  }

  /**
   * 
   * @returns itemsCount of the grid
   */
  getCount(): number {
    return this.itemsCount;
  }

  /**
   * prints all the list of items in a grid structure.
   */
  print(): void {
    for (let rowCounter = 1; rowCounter <= this.rowsCount; rowCounter++) {
      let rowValues: string;
      rowValues = "";
      for (
        let columnCounter = 1;
        columnCounter <= this.columnsCount;
        columnCounter++
      ) {
        rowValues += (this
          .items[(((rowCounter - 1) * this.columnsCount) + columnCounter) - 1]
          .value) +
          "\t";
        if (columnCounter === this.columnsCount) {
          console.log(rowValues);
          rowValues = "";
        }
      }
    }
  }
}

/**
 * Tile
 * ----
 * @class Grid is made up of tiles.
 * Each tile will have a value and unique id (index)
 * Also will contain top, bottom, left and right properties linking to other tiles
 * in those respective directions.
 */
class Tile {
  id: number;
  value: number;
  top: Tile | null;
  bottom: Tile | null;
  left: Tile | null;
  right: Tile | null;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;
  }
}

const g = new Grid(5, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
console.log("Count:", g.getCount());
console.log("Height:", g.getHeight());
console.log("Width:", g.getWidth());
g.print();
console.log();
