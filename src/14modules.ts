type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const getRobot = (input: string): Robot => {
  const reg = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/g;
  const matches = reg.exec(input);

  if (!matches) throw new Error('bad robot');

  return {
    x: parseInt(matches[1], 10),
    y: parseInt(matches[2], 10),
    vx: parseInt(matches[3], 10),
    vy: parseInt(matches[4], 10),
  }
}

export const moveRobot = (r: Robot, moves: number, width: number, height: number): [number, number] => {
  const x_moved = ((moves * r.vx) % width) + r.x;
  const y_moved = ((moves * r.vy) % height) + r.y;
  const newx = x_moved >= width ? (x_moved - width) : x_moved < 0 ? x_moved + width : x_moved;
  const newy = y_moved >= height ? (y_moved - height) : y_moved < 0 ? y_moved + height : y_moved;
  return [newx, newy];
}

const _assignCoordToQuad = (x: number, y: number, width: number, height: number): number => {
  const halfWidth = (width - 1) / 2;
  const halfHeight = (height - 1) / 2;

  if (y < halfHeight && x < halfWidth) return 0;
  if (y < halfHeight && x > halfWidth) return 1;
  if (y > halfHeight && x < halfWidth) return 2;
  if (y > halfHeight && x > halfWidth) return 3;

  return -1;
}

export const calcSafetyFactor = (ps: [number, number][], width: number, height: number): number => ps
  .map(val => _assignCoordToQuad(val[0], val[1], width, height))
  .reduce<[number, number, number, number]>((acc, curr) => {
    if (curr >= 0) acc[curr]++;
    return acc;
  }, [0, 0, 0, 0])
  .reduce<number>((acc, curr) => acc * curr, 1);

export const solve = (input: string, moves: number, width: number, height: number): number => {
  const rs: Robot[] = input.trim().split('\n').map(getRobot);
  const ps: [number, number][] = rs.map(r => moveRobot(r, moves, width, height));
  return calcSafetyFactor(ps, width, height);
}

const arraysEqual = (arr1: number[], arr2: number[]): boolean => arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
const inArray = (x: number, y: number, arr: [number, number][]): boolean => arr.some(item => arraysEqual(item, [x, y]));

export const printIteration = (input: string, iteration: number, width: number = 101, height: number = 103): string => {
  const rs: Robot[] = input.trim().split('\n').map(getRobot);
  const ps: [number, number][] = rs.map(r => moveRobot(r, iteration, width, height));

  let lines = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      lines += inArray(x, y, ps) ? 'x' : ' ';
    }
    lines += '\n';
  }

  return lines;
}
