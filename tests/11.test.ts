import { blink, getSizeAfterBlinks } from '../src/11modules';

const exampleInitial1 = '125 17';
const example1Blink = '253000 1 7';
const example2Blink = '253 0 2024 14168';
const example3Blink = '512072 1 20 24 28676032';
const example4Blink = '512 72 2024 2 0 2 4 2867 6032';
const example5Blink = '1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32';
const example6Blink = '2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2';

const countAfter25Blinks = 55312;

describe('blink function', () => {
  test('Get stone arrangement after 1 blink', () => {
   expect(blink(exampleInitial1, 1)).toEqual(example1Blink);
  });
/*
  test('Get stone arrangement after 2 blinks', () => {
   expect(blink(exampleInitial1, 2)).toEqual(example2Blink);
  });

  test('Get stone arrangement after 3 blinks', () => {
   expect(blink(exampleInitial1, 3)).toEqual(example3Blink);
  });

  test('Get stone arrangement after 4 blinks', () => {
   expect(blink(exampleInitial1, 4)).toEqual(example4Blink);
  });

  test('Get stone arrangement after 5 blinks', () => {
   expect(blink(exampleInitial1, 5)).toEqual(example5Blink);
  });
});

describe('getSizeAfterBlinks function', () => {
  test('Get the size after the example initial stae and 25 blinks', () => {
    expect(getSizeAfterBlinks(exampleInitial1, 25)).toEqual(countAfter25Blinks);
  });
});
*/
