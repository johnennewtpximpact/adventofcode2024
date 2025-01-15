type Config = {
  layout: string[][],
  dirs: string[],
}

const dirMap = new Map<string, [number, number]>([
  ['<', [-1, 0]],
  ['^', [0, -1]],
  ['>', [1, 0]],
  ['v', [0, 1]],
]);

export const getConfig = (input: string): Config => {
  const parts = input.trim().split(/^\s*$/m);

  if (parts.length !== 2) throw new Error('input is bad');

  const layout:string[][] = parts[0].trim().split('\n').map(s => s.split(''));
  const dirs:string[] = parts[1].trim().split('');

  return {
    layout: layout,
    dirs: dirs,
  }
}

export const convertConfig = (config: Config): Config => {
  let c: string[][] = [];

  for (let y = 0; y < config.layout.length; y++) {
    const line: string[] = [];
    for (let x = 0; x < config.layout[0].length; x++) {
      if (config.layout[y][x] === '#') { line.push('#'); line.push('#'); }
      if (config.layout[y][x] === '.') { line.push('.'); line.push('.'); }
      if (config.layout[y][x] === '@') { line.push('@'); line.push('.'); }
      if (config.layout[y][x] === 'O') { line.push('['); line.push(']'); }
    }
    c.push(line);
  }

  return {
    layout: c,
    dirs: config.dirs,
  }
}

export const _findRobot = (layout: string[][]): [number, number] => {
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[y].length; x++) {
      if (layout[y][x] === '@') {
        return [x, y];
      }
    }
  }
  throw new Error('no robot on the map');
}

export const _getNextGap = (layout: string[][], x: number, y: number, movex: number, movey: number): [number, number] | [] => {
  if (layout[y][x] === '.') {
    return [x, y];
  }
  else if (layout[y][x] === '#') {
    return [];
  }
  return _getNextGap(layout, x + movex, y + movey, movex, movey);
}

export const _shuffleUpInX = (layout: string[][], x: number, y: number, movex: number, depth: number = 0): string[][] => {
  if (layout[y][x] === '#') throw new Error('hit a wall');

  if (layout[y][x] === '.') layout[y][x] = movex === 1 ? ']' : '[';
  else {
    layout = _shuffleUpInX(layout, x+movex, y, movex, depth+1);
    if (depth === 0) layout[y][x] = '@';
    else layout[y][x] = layout[y][x] === '[' ? ']' : '[';
  }

  return layout;
}

const arraysEqual = (arr1: number[], arr2: number[]): boolean => arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
const inArray = (x: number, y: number, arr: [number, number][]): boolean => arr.some(item => arraysEqual(item, [x, y]));

const visited: [number, number][] = [];
export const _shuffleUpInY = (layout: string[][], x: number, y: number, movey: number, requiredLetter: string, original = true): string[][] => {
  if (layout[y][x] === '#') throw new Error('hit a wall');

  if (original) visited.length = 0;
  visited.push([x, y]);

  if (layout[y][x] !== '.') {
    if (!inArray(x, y+movey, visited) || layout[y+movey][x] === '.') {
      layout = _shuffleUpInY(layout, x, y+movey, movey, layout[y][x], false);
    }

    if (layout[y][x] === ']' && !inArray(x-1, y, visited)) {
      layout = _shuffleUpInY(layout, x-1, y, movey, '.', false);
    }
    else if (layout[y][x] === '[' && !inArray(x+1, y, visited)) {
      layout = _shuffleUpInY(layout, x+1, y, movey, '.', false);
    }
  }

  layout[y][x] = requiredLetter;

  return layout;
}

export const runConfig = (config: Config): string[][] => {
  let layout = config.layout.map(line => [...line]);
  let [rx, ry] = _findRobot(config.layout);

  config.dirs.forEach(dir => {
    if (dirMap.has(dir)) {
      const [movex, movey] = dirMap.get(dir)!;
      const newx = rx + movex;
      const newy = ry + movey;

      if (layout[newy][newx] === '#') {
        // No movement.
      }

      else if (layout[newy][newx] === '.') {
        // gap, easy move.
        layout[ry][rx] = '.';
        layout[newy][newx] = '@';
        rx = newx;
        ry = newy;
      }

      else if (layout[newy][newx] === 'O') {
        // it's a barrael, O.
        const nextGap = _getNextGap(layout, newx, newy, movex, movey);
        if (nextGap.length === 2) {
          // Shuffle it all up.
          layout[nextGap[1]][nextGap[0]] = 'O';
          layout[ry][rx] = '.';
          layout[newy][newx] = '@';
          rx = newx;
          ry = newy;
        }
      }

      else {
        // it's a barrel, either [ or ]
        try {
          let clonelayout = layout.map(l => [...l]);
          if (movex === 1 || movex === -1) {
            _shuffleUpInX(clonelayout, newx, newy, movex);
          }
          else {
            _shuffleUpInY(clonelayout, newx, newy, movey, '@');
          }

          // Successful shuffle.
          layout = clonelayout;
          layout[ry][rx] = '.';
          rx = newx;
          ry = newy;
        }
        catch (e) {} // Error thrown if it hit a wall so we can ignore the move.
      }
    }
  });

  return layout;
}

export const calcGPS = (layout: string[][]): number => {
  let gps = 0;
  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[0].length; x++) {
      if (layout[y][x] === 'O' || layout[y][x] === '[') {
        gps += (y * 100) + x;
      }
    }
  }
  return gps;
}

export const solve = (input: string): number => {
  const config = getConfig(input);
  const finalLayout = runConfig(config);
  return calcGPS(finalLayout);
}

export const solve2 = (input: string): number => {
  const config = getConfig(input);
  const specialconfig = convertConfig(config);
  const finalLayout = runConfig(specialconfig);
  return calcGPS(finalLayout);
}
