import { getTrailHeads } from '../src/10modules';

const exampleMap1 = `0123
1234
8765
9876`;

const sumOfTrailHeads1 = 1;

const exampleMap2 = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const sumOfTrailHeads2 = 36;

describe('getTrailHeads function', () => {
  test('Get trail heads for example 1', () => {
   expect(getTrailHeads(exampleMap1)).toEqual(sumOfTrailHeads1);
  });

  test('Get trail heads for example 2', () => {
    expect(getTrailHeads(exampleMap2)).toEqual(sumOfTrailHeads2);
  });

  test('Get trail head rating for example 2', () => {
    expect(getTrailHeads(exampleMap2, true)).toEqual(81);
  });
});
