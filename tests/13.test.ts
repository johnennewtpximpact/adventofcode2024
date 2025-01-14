import { getMachine, solveMachine, solveMachines, solveMachine2 } from '../src/13modules';

const test1 = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400`;

const test2 = `Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176`;

const test3 = `Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450`;

const test4 = `Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const machine1 = {
  buttonA: {
    x: 94,
    y: 34,
  },
  buttonB: {
    x: 22,
    y: 67,
  },
  prize: {
    x: 8400,
    y: 5400,
  }
};

const machine2 = {
  buttonA: {
    x: 26,
    y: 66,
  },
  buttonB: {
    x: 67,
    y: 21,
  },
  prize: {
    x: 12748,
    y: 12176,
  }
};

const machine3 = {
  buttonA: {
    x: 17,
    y: 86,
  },
  buttonB: {
    x: 84,
    y: 37,
  },
  prize: {
    x: 7870,
    y: 6450,
  }
};

const machine4 = {
  buttonA: {
    x: 69,
    y: 23,
  },
  buttonB: {
    x: 27,
    y: 71,
  },
  prize: {
    x: 18641,
    y: 10279,
  }
};

const solution1 = {
  aPresses: 80,
  bPresses: 40,
  price: 280,
};

const solution2 = {
  aPresses: 0,
  bPresses: 0,
  price: 0,
};

const solution3 = {
  aPresses: 38,
  bPresses: 86,
  price: 200,
};

const solution4 = {
  aPresses: 0,
  bPresses: 0,
  price: 0,
};

describe('test getMachine', () => {

  test('test getMachine -> test1', () => {
    expect(getMachine(test1)).toEqual(machine1);
  });

  test('test getMachine -> test2', () => {
    expect(getMachine(test2)).toEqual(machine2);
  });

  test('test getMachine -> test3', () => {
    expect(getMachine(test3)).toEqual(machine3);
  });

  test('test getMachine -> test4', () => {
    expect(getMachine(test4)).toEqual(machine4);
  });

});


describe('test solveMachine', () => {

  test('test solveMachine -> test1', () => {
    expect(solveMachine(machine1)).toEqual(solution1);
  });

  test('test solveMachine -> test2', () => {
    expect(solveMachine(machine2)).toEqual(solution2);
  });

  test('test solveMachine -> test3', () => {
    expect(solveMachine(machine3)).toEqual(solution3);
  });

  test('test solveMachine -> test4', () => {
    expect(solveMachine(machine4)).toEqual(solution4);
  });

});

describe('test solveMachines', () => {

  test('test solveMachines', () => {
    expect(solveMachines([machine1, machine2, machine3, machine4])).toEqual(480);
  });

});

describe('test solveMachine2', () => {

  test('test solveMachine2 -> test1', () => {
    const s = solveMachine2(machine1);
    expect(s.price).toEqual(0); // not solvable
  });

  test('test solveMachine2 -> test2', () => {
    const s = solveMachine2(machine2);
    expect(s.price).not.toEqual(0);  // solvable
  });

  test('test solveMachine2 -> test3', () => {
    const s = solveMachine2(machine3);
    expect(s.price).toEqual(0);  // not solvable
  });

  test('test solveMachine2 -> test4', () => {
    const s = solveMachine2(machine4);
    expect(s.price).not.toEqual(0);  // solvable
  });

});
