import { describeRegion, describeRegions, getPrice, calculateSides, getDiscountPrice } from '../src/12modules';

const p1 = [
  ['A', 'A', 'A', 'A'],
  ['B', 'B', 'C', 'D'],
  ['B', 'B', 'C', 'C'],
  ['E', 'E', 'E', 'C'],
];

const p2 = [
  ['O', 'O', 'O', 'O', 'O'],
  ['O', 'X', 'O', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O'],
  ['O', 'X', 'O', 'X', 'O'],
  ['O', 'O', 'O', 'O', 'O'],
];

const p3 = [
  ['R', 'R', 'R', 'R', 'I', 'I', 'C', 'C', 'F', 'F'],
  ['R', 'R', 'R', 'R', 'I', 'I', 'C', 'C', 'C', 'F'],
  ['V', 'V', 'R', 'R', 'R', 'C', 'C', 'F', 'F', 'F'],
  ['V', 'V', 'R', 'C', 'C', 'C', 'J', 'F', 'F', 'F'],
  ['V', 'V', 'V', 'V', 'C', 'J', 'J', 'C', 'F', 'E'],
  ['V', 'V', 'I', 'V', 'C', 'C', 'J', 'J', 'E', 'E'],
  ['V', 'V', 'I', 'I', 'I', 'C', 'J', 'J', 'E', 'E'],
  ['M', 'I', 'I', 'I', 'I', 'I', 'J', 'J', 'E', 'E'],
  ['M', 'I', 'I', 'I', 'S', 'I', 'J', 'E', 'E', 'E'],
  ['M', 'M', 'M', 'I', 'S', 'S', 'J', 'E', 'E', 'E'],
];

const areaA = {
  letter: 'A',
  area: 4,
  perimeter: 10,
  cost: 40,
  sides: 4,
  discountPrice: 16,
  locations: expect.arrayContaining([[0,0],[0,1],[0,2],[0,3]]),
  edges: expect.any(Array),
};

const areaB = {
  letter: 'B',
  area: 4,
  perimeter: 8,
  cost: 32,
  sides: 4,
  discountPrice: 16,
  locations:  expect.arrayContaining([[1,0],[1,1],[2,0],[2,1]]),
  edges: expect.any(Array),
};

const areaC = {
  letter: 'C',
  area: 4,
  perimeter: 10,
  cost: 40,
  sides: 8,
  discountPrice: 32,
  locations:  expect.arrayContaining([[1,2],[2,2],[2,3],[3,3]]),
  edges: expect.any(Array),
};

const areaD = {
  letter: 'D',
  area: 1,
  perimeter: 4,
  cost: 4,
  sides: 4,
  discountPrice: 4,
  locations:  expect.arrayContaining([[1,3]]),
  edges: expect.any(Array),
};

const areaE = {
  letter: 'E',
  area: 3,
  perimeter: 8,
  cost: 24,
  sides: 4,
  discountPrice: 12,
  locations:  expect.arrayContaining([[3,0],[3,1],[3,2]]),
  edges: expect.any(Array),
};

const areaO = {
  letter: 'O',
  area: 21,
  perimeter: 36,
  cost: 756,
  sides: 20,
  discountPrice: 420,
  locations:  expect.arrayContaining([
    [0,0], [0,1], [0,2], [0,3], [0,4],
    [1,0], [1,2], [1,4],
    [2,0], [2,1], [2,2], [2,3], [2,4],
    [3,0], [3,2], [3,4],
    [4,0], [4,1], [4,2], [4,3], [4,4],
  ]),
  edges: expect.any(Array),
};

const areaX1 = {
  letter: 'X',
  area: 1,
  perimeter: 4,
  cost: 4,
  sides: 4,
  discountPrice: 4,
  locations:  expect.arrayContaining([[1,1]]),
  edges: expect.any(Array),
};

const areaX2 = {
  letter: 'X',
  area: 1,
  perimeter: 4,
  cost: 4,
  sides: 4,
  discountPrice: 4,
  locations:  expect.arrayContaining([[1,3]]),
  edges: expect.any(Array),
};

const areaX3 = {
  letter: 'X',
  area: 1,
  perimeter: 4,
  cost: 4,
  sides: 4,
  discountPrice: 4,
  locations:  expect.arrayContaining([[3,1]]),
  edges: expect.any(Array),
};

const areaX4 = {
  letter: 'X',
  area: 1,
  perimeter: 4,
  cost: 4,
  sides: 4,
  discountPrice: 4,
  locations:  expect.arrayContaining([[3,3]]),
  edges: expect.any(Array),
};

describe('describe calculateSides', () => {

  test('test calculateSides - 2x2 region', () => {
    expect(calculateSides([[0,0,1],[0,0,2],[0,1,2],[0,1,3],[1,0,1],[1,0,4],[1,1,3],[1,1,4]])).toEqual(4);
  });

  test('test calculateSides - 3x3 region with a donut hole', () => {
    expect(calculateSides([
      [0,0,1],[0,0,2],[0,1,2],[0,1,4],[0,2,2],[0,2,3],
      [1,0,1],[1,0,3],[1,2,1],[1,2,3],
      [2,0,1],[2,0,4],[2,1,2],[2,1,4],[2,2,3],[2,2,4]
    ])).toEqual(8);
  });

});

describe('describe region', () => {
  test('test A', () => {
    expect(describeRegion(p1, 0, 0)).toEqual(areaA);
    expect(describeRegion(p1, 0, 1)).toEqual(areaA);
    expect(describeRegion(p1, 0, 2)).toEqual(areaA);
    expect(describeRegion(p1, 0, 3)).toEqual(areaA);
  });

  test('test B', () => {
    expect(describeRegion(p1, 1, 0)).toEqual(areaB);
    expect(describeRegion(p1, 1, 1)).toEqual(areaB);
    expect(describeRegion(p1, 2, 0)).toEqual(areaB);
    expect(describeRegion(p1, 2, 1)).toEqual(areaB);
  });

  test('test C', () => {
    expect(describeRegion(p1, 1, 2)).toEqual(areaC);
    expect(describeRegion(p1, 2, 2)).toEqual(areaC);
    expect(describeRegion(p1, 2, 3)).toEqual(areaC);
    expect(describeRegion(p1, 3, 3)).toEqual(areaC);
  });

  test('test D', () => {
    expect(describeRegion(p1, 1, 3)).toEqual(areaD);
  });

  test('test E', () => {
    expect(describeRegion(p1, 3, 0)).toEqual(areaE);
    expect(describeRegion(p1, 3, 1)).toEqual(areaE);
    expect(describeRegion(p1, 3, 2)).toEqual(areaE);
  });


  test('test O', () => {
    expect(describeRegion(p2, 0, 0)).toEqual(areaO);
  });

  test('test X', () => {


    expect(describeRegion(p2, 1, 1)).toEqual(areaX1);
  });
});

describe('describe regions', () => {
  test('get regions for plot 1', () => {
    const regions = expect.arrayContaining([areaA, areaB, areaC, areaD, areaE]);
    expect(describeRegions(p1)).toEqual(regions);
  });

  test('get regions for plot 2', () => {
    const regions = expect.arrayContaining([areaO, areaX1, areaX2, areaX3, areaX4]);
    expect(describeRegions(p2)).toEqual(regions);
  });
});

describe('get price', () => {
  test('get price for plot 1', () => {
    expect(getPrice(p1)).toEqual(140);
  });

  test('get price for plot 2', () => {
    expect(getPrice(p2)).toEqual(772);
  });

  test('get price for plot 3', () => {
    expect(getPrice(p3)).toEqual(1930);
  });
});

describe('get discount price', () => {
  test('get discount price for plot 1', () => {
    expect(getDiscountPrice(p1)).toEqual(80);
  });

  test('get discount price for plot 2', () => {
    expect(getDiscountPrice(p2)).toEqual(436);
  });

  test('get discount price for plot 3', () => {
    expect(getDiscountPrice(p3)).toEqual(1206);
  });
});
