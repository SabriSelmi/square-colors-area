import { Area } from "./types";

export function generateSquare(width : number, height : number, numColors : number) : string[][] {
    // Create an array to represent the square
    const square : string[][] = new Array(height).fill("").map(() => new Array(width).fill(""));
    // Generate an array of random colors
    const colors : string[] = new Array(Number(numColors)).fill("").map(() => getRandomColor());
  
    // Assign random colors to cells
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        square[i][j] = colors[Math.floor(Math.random() * numColors)];
      }
    }
  
    return square;
}

function getRandomColor() : string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
  
export function findBiggestArea(square: string[][]): Area {
    // Initialize variables to track the biggest area found so far
    let biggestAreaSize = 0;
    let biggestAreaColor: string | null = null;
  
    // Initialize a set to track which cells have already been visited
    const visited = new Set<string>();
  
    // Define a helper function to perform the flood fill algorithm
    function floodFill(x: number, y: number, color: string): number {
      // If the current cell is outside the bounds of the square or has already been visited, return
      if (
        x < 0 ||
        x >= square[0].length ||
        y < 0 ||
        y >= square.length ||
        visited.has(`${x},${y}`)
      ) {
        return 0;
      }
  
      // If the current cell is not the target color, return
      if (square[y][x] !== color) {
        return 0;
      }
  
      // Mark the current cell as visited
      visited.add(`${x},${y}`);
  
      // Recursively call floodFill on the adjacent cells
      const size =
        1 +
        floodFill(x + 1, y, color) +
        floodFill(x - 1, y, color) +
        floodFill(x, y + 1, color) +
        floodFill(x, y - 1, color);
  
      return size;
    }
  
    // Traverse the square and perform flood fill on each cell that hasn't been visited yet
    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[0].length; j++) {
        // If the current cell has already been visited, skip it
        if (visited.has(`${j},${i}`)) {
          continue;
        }
  
        const color = square[i][j];
        const size = floodFill(j, i, color);
  
        // If the current area is bigger than the previous biggest area, update the biggest area
        if (size > biggestAreaSize) {
          biggestAreaSize = size;
          biggestAreaColor = color;
        }
      }
    }
  
    return { size: biggestAreaSize, color: biggestAreaColor };
  }
  */
  

  export function findBiggestArea(square: string[][]): Area {
    // Initialize variables to track the biggest area found so far
    let biggestAreaSize = 0;
    let biggestAreaColor: string | null = null;
    let biggestAreaCells: [number, number][] = [];
  
    // Initialize a set to track which cells have already been visited
    const visited = new Set<string>();
  
    // Define a helper function to perform the flood fill algorithm
    function floodFill(x: number, y: number, color: string, cells: [number, number][]): number {
      // If the current cell is outside the bounds of the square or has already been visited, return
      if (
        x < 0 ||
        x >= square[0].length ||
        y < 0 ||
        y >= square.length ||
        visited.has(`${x},${y}`)
      ) {
        return 0;
      }
  
      // If the current cell is not the target color, return
      if (square[y][x] !== color) {
        return 0;
      }
  
      // Mark the current cell as visited
      visited.add(`${x},${y}`);
  
      // Add the current cell to the cells array
      cells.push([y, x]);
  
      // Recursively call floodFill on the adjacent cells
      const size =
        1 +
        floodFill(x + 1, y, color, cells) +
        floodFill(x - 1, y, color, cells) +
        floodFill(x, y + 1, color, cells) +
        floodFill(x, y - 1, color, cells);
  
      return size;
    }
  
    // Traverse the square and perform flood fill on each cell that hasn't been visited yet
    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[0].length; j++) {
        // If the current cell has already been visited, skip it
        if (visited.has(`${j},${i}`)) {
          continue;
        }
  
        const color = square[i][j];
        const cells: [number, number][] = [];
        const size = floodFill(j, i, color, cells);
  
        // If the current area is bigger than the previous biggest area, update the biggest area
        if (size > biggestAreaSize) {
          biggestAreaSize = size;
          biggestAreaColor = color;
          biggestAreaCells = cells;
        }
      }
    }
  
    return { size: biggestAreaSize, color: biggestAreaColor, cells: biggestAreaCells };
  }
  