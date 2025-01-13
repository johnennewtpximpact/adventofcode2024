import { blink, blinkLine, blinkLines, countStones } from '../src/11modules';

const exampleInitial1 = '125 17';
const example1Blink = '253000 1 7';
const example2Blink = '253 0 2024 14168';
const example3Blink = '512072 1 20 24 28676032';
const example4Blink = '512 72 2024 2 0 2 4 2867 6032';
const example5Blink = '1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32';
const example6Blink = '2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2';
const countAfter25Blinks = 55312;

describe('blink function', () => {
  test('test blinking', () => {
    expect(blink(0)).toEqual([1]);
    expect(blink(12)).toEqual([1, 2]);
    expect(blink(4268)).toEqual([42, 68]);
    expect(blink(426865)).toEqual([426, 865]);
    expect(blink(42686511)).toEqual([4268, 6511]);
    expect(blink(1)).toEqual([2024]);
    expect(blink(2)).toEqual([4048]);
    expect(blink(3)).toEqual([6072]);
    expect(blink(317)).toEqual([641608]);
  });
});

// Setup the test input for the initial a series of stones.
const i1 = new Map<number, number>();
i1.set(125, 1);
i1.set(17, 1);

const i2 = new Map<number, number>();
i2.set(253000, 1);
i2.set(1, 1);
i2.set(7, 1);

const i3 = new Map<number, number>();
i3.set(253, 1);
i3.set(0, 1);
i3.set(2024, 1);
i3.set(14168, 1);

const i4 = new Map<number, number>();
i4.set(512072, 1);
i4.set(1, 1);
i4.set(20, 1);
i4.set(24, 1);
i4.set(28676032, 1);

const i5 = new Map<number, number>();
i5.set(512, 1);
i5.set(72, 1);
i5.set(2024, 1);
i5.set(2, 2);
i5.set(0, 1);
i5.set(4, 1);
i5.set(2867, 1);
i5.set(6032, 1);

describe('blinkLine function', () => {
  test('test blinking - 1 iteration', () => {
    expect(blinkLine(i1)).toEqual(i2);
  });

  test('test blinking - 2 iteration', () => {
    expect(blinkLine(i2)).toEqual(i3);
  });

  test('test blinking - 3 iteration', () => {
    expect(blinkLine(i3)).toEqual(i4);
  });

  test('test blinking - 4 iteration', () => {
    expect(blinkLine(i4)).toEqual(i5);
  });
});


const i7 = new Map<number, number>();
i7.set(2097446912, 1);
i7.set(14168, 1);
i7.set(4048, 1);
i7.set(2, 4);
i7.set(0, 2);
i7.set(4, 1);
i7.set(40, 2);
i7.set(48, 2);
i7.set(2024, 1);
i7.set(80, 1);
i7.set(96, 1);
i7.set(8, 1);
i7.set(6, 2);
i7.set(7, 1);
i7.set(3, 1);

describe('blinkLines function', () => {
  test('test blinking - 2 times', () => {
    expect(blinkLines(i1, 2)).toEqual(i3);
  });

  test('test blinking - 3 times', () => {
    expect(blinkLines(i1, 3)).toEqual(i4);
  });

  test('test blinking - 4 times', () => {
    expect(blinkLines(i1, 4)).toEqual(i5);
  });

  test('test blinking - 6 times', () => {
    expect(blinkLines(i1, 6)).toEqual(i7);
  });
});


describe('countStones function', () => {
  test('test countStones - 2 times', () => {
    expect(countStones('125 17', 2)).toEqual(4);
  });

  test('test countStones - 3 times', () => {
    expect(countStones('125 17', 3)).toEqual(5);
  });

  test('test countStones - 6 times', () => {
    expect(countStones('125 17', 6)).toEqual(22);
  });

  test('test countStones - 25 times', () => {
    expect(countStones('125 17', 25)).toEqual(55312);
  });
});
