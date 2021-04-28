/**
   * Grid class represents a Grid like strucutre with rows & columns
   * This is like a 4 ways linked lists, each tile has top, bottom, right & left
   * links to another tile in those directions.
   */
class Grid {
  itemsCount: number;
  rowsCount: number;
  columnsCount: number;
  head?: Tile;
  tail?: Tile;
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
    this.head = undefined;
    this.tail = undefined;
    this.itemsCount = values.length;
    this.items = values.map((value) => new Tile(value));
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

        if (this.head === undefined) {
          this.head = tile;
        }

        if (columnCounter === 1) {
          this.rowStart = tile;
        }

        if (this.rowStart) {
          tile.left = this.rowStart;
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
 * 
 */
class Tile {
  value: number;
  top?: Tile;
  bottom?: Tile;
  left?: Tile;
  right?: Tile;

  constructor(value: number) {
    this.value = value;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
  }
}

let g = new Grid(3, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
console.log("Count:", g.getCount());
console.log("Height:", g.getHeight());
console.log("Width:", g.getWidth());
g.print();
console.log(g.rows);
console.log("nothing");
