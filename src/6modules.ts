export const UP = [-1, 0];
export const DOWN = [1, 0];
export const LEFT = [0, -1];
export const RIGHT = [0, 1];

export const rotateDir = (dir: number[]): number[] => {
  if (dir[0] !== 0) {
    return dir[0] === 1 ? LEFT : RIGHT;
  }
  return dir[1] === 1 ? DOWN: UP;
}

export const getToggle = (dir: number[]): number => {
  if (dir[0] !== 0) {
    return dir[0] === 1 ? 1 : 0;
  }
  return dir[1] === 1 ? 3 : 2;
}

export const bit_test = (num: number, bit: number): boolean => {
    return ((num >> bit) % 2 != 0);
}

export const bit_set = (num: number, bit: number): number => {
    return num | 1<<bit;
}

export const getStartPos = (grid: string[][]): number[] => {
  return grid.flatMap((row, rownum) => row.flatMap((cell, colnum) => cell === '^' ? [rownum, colnum] : []));
}

export const countVisits = (grid: string[][]): number => grid.reduce((acc, row) => {
  return acc + row.reduce((rowacc, cell) => rowacc + (cell === 'X' ? 1 : 0), 0);
}, 0);

const createEmptyGrid = (rows: number, cols: number): string[][] => Array.from({ length: rows }, () => new Array(cols).fill('.'));

const createEmptyLoopGrid = (rows: number, cols: number): number[][] => Array.from({ length: rows }, () => new Array(cols).fill(0));

export const runWalk = (searchgrid: string[][], startPos: number[]) => {
  let visitedGrid = createEmptyGrid(searchgrid.length, searchgrid[0].length);
  return _runWalk(searchgrid, visitedGrid, startPos, UP);
};

const _runWalk = (searchgrid: string[][], visitedgrid: string[][], pos: number[], dir: number[]): string[][] => {
  // Set the current position as visited.
  visitedgrid[pos[0]][pos[1]] = 'X';

  // Move.
  const newPosition = [pos[0]+dir[0], pos[1]+dir[1]];
  if (newPosition[0] < 0 || newPosition[0] >= searchgrid.length || newPosition[1] < 0 || newPosition[1] >= searchgrid[0].length) {
    // We have left the grid and the walk has ended.
    return visitedgrid;
  }

  if (searchgrid[newPosition[0]][newPosition[1]] === '#') {
    // We have hit a block and need to reverse and change direction.
    const newDir = rotateDir(dir);
    return _runWalk(searchgrid, visitedgrid, pos, newDir);
  }
  else {
    // Continue walking.
    return _runWalk(searchgrid, visitedgrid, newPosition, dir);
  }
}

export const runWalkWithLoopCheck = (searchgrid: string[][], startPos: number[], newObsticleLocation: number[]): boolean => {
  let visitedgrid = createEmptyLoopGrid(searchgrid.length, searchgrid[0].length);
  return _runWalkWithLoopCheck(searchgrid, visitedgrid, startPos, UP, newObsticleLocation);
}

const _runWalkWithLoopCheck = (searchgrid: string[][], visitedgrid: number[][], pos: number[], dir: number[], newObsticleLocation: number[]): boolean => {
  const toggle = getToggle(dir);

  if (bit_test(visitedgrid[pos[0]][pos[1]], toggle)) {
    // We've been this way before, a loop has been created.
    return true;
  }

  // Mark the direction we passed through incase we come by here again.
  visitedgrid[pos[0]][pos[1]] = bit_set(visitedgrid[pos[0]][pos[1]], toggle);

  // Move.
  const newPosition = [pos[0]+dir[0], pos[1]+dir[1]];
  if (newPosition[0] < 0 || newPosition[0] >= searchgrid.length || newPosition[1] < 0 || newPosition[1] >= searchgrid[0].length) {
    // We have left the grid and the walk has ended without a loop.
    return false;
  }

  if (searchgrid[newPosition[0]][newPosition[1]] === '#' || (newPosition[0] === newObsticleLocation[0] && newPosition[1] === newObsticleLocation[1])) {
    // We have hit a block and need to reverse and change direction.
    const newDir = rotateDir(dir);
    return _runWalkWithLoopCheck(searchgrid, visitedgrid, pos, newDir, newObsticleLocation);
  }
  else {
    // Continue walking.
    return _runWalkWithLoopCheck(searchgrid, visitedgrid, newPosition, dir, newObsticleLocation);
  }
 }

export const countSuccessfulObstructions = (searchgrid: string[][], visitedGrid: string[][], startPos: number[]): number => {
  let count = 0;
  // Place a # in every one of the mapped locations, one at a time, rerun the walk and see if an endless loop is created.
  for (let i = 0; i < visitedGrid.length; i++) {
    for (let j = 0; j < visitedGrid[0].length; j++) {
      if (visitedGrid[i][j] === 'X' && !(i === startPos[0] && j === startPos[1])) {
        // See if this position causes a loop.
        if (runWalkWithLoopCheck(searchgrid, startPos, [i, j])) {
          count++;
        }
      }
    }
  }
  return count;

}
