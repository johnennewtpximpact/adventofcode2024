import { getRobot, moveRobot, calcSafetyFactor, solve } from '../src/14modules';

const test1 = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const robot1 = {
  x: 0,
  y: 4,
  vx: 3,
  vy: -3,
};

describe('getRobot tests', () => {

  test('getRobot --> test1', () => {
    expect(getRobot('p=0,4 v=3,-3')).toEqual(robot1);
  });

});

describe('moveRobot tests', () => {

  test('moveRobot --> test1', () => {
    expect(moveRobot(robot1, 100, 11, 7)).toEqual([3, 5]);
  });

});

describe('calcSafetyFactor tests', () => {

  test('calcSafetyFactor --> test1', () => {
    const ps: [number, number][] = [[0,2], [1,6], [3,5], [4,5], [4,5], [6,0], [6,0], [6,6], [9,0], [0,3], [5,3]];
    expect(calcSafetyFactor(ps, 11, 7)).toEqual(12);
  });

});

describe('solve tests', () => {

  test('solve --> test1', () => {
    expect(solve(test1, 100, 11, 7)).toEqual(12);
  });

});
