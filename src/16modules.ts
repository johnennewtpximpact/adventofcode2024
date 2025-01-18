const cache = new Map<string, number>();

const _find = (layout: string[][], letter: string): [number, number] => {
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[y].length; x++) {
      if (layout[y][x] === letter) {
        return [x, y];
      }
    }
  }
  throw new Error('no start on the map');
}

const _findStart = (layout: string[][]): [number, number] => _find(layout, 'S');
const  _findEnd = (layout: string[][]): [number, number] => _find(layout, 'E');

export const explore = (layout: string[][]): number => {
  cache.clear();
  const [x, y] = _findStart(layout);
  const [xe, ye] = _findEnd(layout);
  _explore(layout, x, y);
  return cache.get(`${xe}:${ye}`) ?? -1;
}

const turnLeft = (dir: [number, number]): [number, number] => {
  if (dir[0] === 0) {
    if (dir[1] === 1) return [1, 0];
    return [-1, 0];
  }
  if (dir[0] === 1) return [0, -1];
  return [0, 1];
}

const turnRight = (dir: [number, number]): [number, number] => {
  if (dir[0] === 0) {
    if (dir[1] === 1) return [-1, 0];
    return [1, 0];
  }
  if (dir[0] === 1) return [0, 1];
  return [0, -1];
}

const _explore = (layout: string[][], x: number, y: number, dir: [number, number] = [1, 0], score: number = 0) => {
  const moves = [
    { dir: dir, score: score + 1 },
    { dir: turnLeft(dir), score: score + 1001 },
    { dir: turnRight(dir), score: score + 1001 },
  ];

  moves.forEach(({ dir: [movex, movey], score: newScore }) => {
    const newx = x + movex;
    const newy = y + movey;
    if (layout[newy][newx] === '#') {
      // Wall, do nothing.
      return;
    }

    const key = `${newx}:${newy}`;

    if (!cache.has(key) || cache.get(key)! > newScore) {
      cache.set(key, newScore);
      if (layout[newy][newx] === '.') _explore(layout, newx, newy, [movex, movey], newScore);
    }
  });
}

export const solve = (input: string): number => {
  const layout = input.trim().split('\n').map(l => l.split(''));
  return explore(layout);
}
