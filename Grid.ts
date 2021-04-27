class Grid {
  itemsCount: number;
  rowsCount: number;
  columnsCount: number;
  head?: Box;
  tail?: Box;
  items: Box[];
  // rows: Box[];
  private rowStart?: Box;

  constructor(rowsCount: number, columnsCount: number, values: number[]) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.head = undefined;
    this.tail = undefined;
    this.itemsCount = values.length;
    this.items = values.map((value) => new Box(value));

    for (let rowCounter = 1; rowCounter <= this.rowsCount; rowCounter++) {
      for (
        let columnCounter = 1;
        columnCounter <= this.columnsCount;
        columnCounter++
      ) {
        let box = this.items[(rowCounter * columnCounter) - 1];
        if (columnCounter === columnsCount) {
          this.rowStart = undefined;
        }

        if (this.head === null) {
          this.head = box;
        }

        if (columnCounter === 1) {
          this.rowStart = box;
        }

        if (columnCounter === columnsCount) {
          this.rowStart = box;
        }

        if (this.rowStart) {
          box.left = this.rowStart;
          this.rowStart.right = box;
        }

        if (this.tail) {
          box.left = this.tail;
          this.tail.right = box;
        }
        this.tail = box;
      }
    }
  }

  getWidth(): number {
    return this.columnsCount;
  }

  getHeight(): number {
    return this.rowsCount;
  }

  getCount(): number {
    return this.itemsCount;
  }

  print(): void {
    for (let rowCounter = 1; rowCounter <= this.rowsCount; rowCounter++) {
      let rowValues: string = "";
      for (
        let columnCounter = 1;
        columnCounter <= this.columnsCount;
        columnCounter++
      ) {
        rowValues += (this.items[(rowCounter * columnCounter) - 1].value) +
          "\t";
        if (columnCounter === this.columnsCount) {
          console.log(rowValues);
          rowValues = "";
        }
      }
    }
  }
}

class Box {
  value: number;
  top?: Box;
  bottom?: Box;
  left?: Box;
  right?: Box;

  constructor(value: number) {
    this.value = value;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
  }
}

let g = new Grid(1, 5, [1, 2, 3, 4, 5]);
console.log("Count:", g.getCount());
console.log("Height:", g.getHeight());
console.log("Weight:", g.getWidth());
g.print();
