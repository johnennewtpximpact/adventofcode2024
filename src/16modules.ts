type Edge = {
  d: number;
  v1: Vertex;
  v2: Vertex;
}

type Vertex = {
  x: number;
  y: number;
  n: Edge | null;
  s: Edge | null;
  e: Edge | null;
  w: Edge | null;
  isEnd: boolean;
}

const cache = new Map<string, number>();

const arraysEqual = (arr1: number[], arr2: number[]): boolean => arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
const inArray = (x: number, y: number, arr: [number, number][]): boolean => arr.some(item => arraysEqual(item, [x, y]));

export const _findStart = (layout: string[][]): [number, number] => {
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[y].length; x++) {
      if (layout[y][x] === 'S') {
        return [x, y];
      }
    }
  }
  throw new Error('no start on the map');
}


export const explore = (layout: string[][]): number => {
  cache.clear();
  const [x, y] = _findStart(layout);
  let a = _explore(layout, x, y);

//console.log(cache.get(`3:5:1:0`)!);
//console.log(cache.get('3:5:0:1')!);

  return a;
}

export const _scoreChangeByDirection = (oldDirX: number, oldDirY: number, newDirX: number, newDirY: number) => (oldDirX === newDirX && oldDirY === newDirY) ? 0 : 1000;

const _explore = (layout: string[][], x: number, y: number, dir: [number, number] = [1, 0], visited: [number, number][] = []) : number => {


  if (layout[y][x] === '#') return NaN;
  if (layout[y][x] === 'E') return 0;

  if (inArray(x, y, visited)) throw new Error('visited');
  visited.push([x, y]);

  const key = `${x}:${y}:${dir[0]}:${dir[1]}`;
  if (cache.has(key)) return cache.get(key)!;

  const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  let visitedLoop = false;

  const distance = dirs.map(([movex, movey]) => {

    if ((dir[0] !== 0 && movex+dir[0] === 0) || (dir[1] !== 0 && movey+dir[1] === 0)) {
     return NaN;
    }

    try {
      const turnCost = _scoreChangeByDirection(dir[0], dir[1], movex, movey);
      const distance = _explore(layout, x + movex, y + movey, [movex, movey], [...visited]);
      return Number.isNaN(distance) ? NaN : turnCost + distance + 1;
    }
    catch (e) {
      visitedLoop = true;
      return NaN;
    }

  }).reduce((acc, curr) => {
    if (Number.isNaN(acc)) return curr;
    if (Number.isNaN(curr)) return acc;
    return acc < curr ? acc : curr;
  }, NaN);


  if (!Number.isNaN(distance)) cache.set(key, distance);
  return distance;
}

export const solve = (input: string): number => {
  const layout = input.trim().split('\n').map(l => l.split(''));
  return explore(layout);
}
