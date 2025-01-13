import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const cache = new Map<number, number[]>();

export const blink = (val: number): number[] => {
  if (val === 0) {
    return [1];
  }

  if (val.toString().length % 2 === 0) {
    const middle = Math.ceil(val.toString().length / 2);
    const left = parseInt(val.toString().slice(0, middle));
    const right = parseInt(val.toString().slice(middle));
    return [left, right];
  }

  return [val * 2024];
}

const cacheBlink = (val: number) : number[] => {
  if (cache.has(val) === false) {
    cache.set(val, blink(val));
  }

  return cache.get(val)!;
}

export const blinkLine = (line: Map<number, number>): Map<number, number> => {
  const nextLine = new Map<number, number>();

  for (const [stone, count] of line) {
    cacheBlink(stone).forEach( s => nextLine.set(s, nextLine.has(s) ? nextLine.get(s)! + count : count) );
  }

  return nextLine;
}

export const blinkLines = (line: Map<number, number>, blinks: number): Map<number, number> => Array(blinks).fill(0).reduce<Map<number, number>>((acc, curr) => blinkLine(acc), line);

export const countStones = (start: string, blinks: number): number => {
  const line = new Map<number, number>();
  start.trim().split(' ').forEach(v => line.set(parseInt(v), 1));
  const finalLine = blinkLines(line, blinks);

  console.log(finalLine.size);

  let counter = 0;
  for (const [stone, count] of finalLine) {
    counter += count;
  }

  return counter;
}
