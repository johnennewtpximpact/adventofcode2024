import { sumOfEquationsWithConcat, calcEquationWithConcat, getTriState, sumOfEquations, calcEquation, Equation, generateEquations } from '../src/7modules';

const exampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const exampleEquations = [
  {
    testValue: 190,
    numbers: [10, 19]
  },
  {
    testValue: 3267,
    numbers: [81, 40, 27]
  },
  {
    testValue: 83,
    numbers: [17, 5],
  },
  {
    testValue: 156,
    numbers: [15, 6]
  },
  {
    testValue: 7290,
    numbers: [6, 8, 6, 15]
  },
  {
    testValue: 161011,
    numbers: [16, 10, 13]
  },
  {
    testValue: 192,
    numbers: [17, 8, 14]
  },
  {
    testValue: 21037,
    numbers: [9, 7, 18, 13]
  },
  {
    testValue: 292,
    numbers: [11, 6, 16, 20]
  }
];

describe('generareEquations function', () => {
  test('test example data gives us the example data structure', () => {
    expect(generateEquations(exampleInput)).toEqual(exampleEquations);
  });
});

describe('calcEquation function', () => {
  test('test the calculation functions', () => {
    expect(calcEquation(exampleEquations[0])).toEqual(190);
    expect(calcEquation(exampleEquations[1])).toEqual(3267);
    expect(calcEquation(exampleEquations[3])).toEqual(0);
    expect(calcEquation(exampleEquations[4])).toEqual(0);
    expect(calcEquation(exampleEquations[5])).toEqual(0);
    expect(calcEquation(exampleEquations[6])).toEqual(0);
    expect(calcEquation(exampleEquations[7])).toEqual(0);
    expect(calcEquation(exampleEquations[8])).toEqual(292);
  });
});

describe('sumOfEquations function', () => {
  test('test the first answer with the example data', () => {
    expect(sumOfEquations(exampleEquations)).toEqual(3749);
  });
});

describe('flagByBaseTest function', () => {
  test('test base 3 state retrieval of position 1', () => {
    expect(getTriState(0, 0)).toEqual(0);
    expect(getTriState(1, 0)).toEqual(1);
    expect(getTriState(2, 0)).toEqual(2);
    expect(getTriState(3, 0)).toEqual(0);
    expect(getTriState(4, 0)).toEqual(1);
    expect(getTriState(5, 0)).toEqual(2);
    expect(getTriState(6, 0)).toEqual(0);
    expect(getTriState(7, 0)).toEqual(1);
    expect(getTriState(12, 0)).toEqual(0);
    expect(getTriState(13, 0)).toEqual(1);
    expect(getTriState(14, 0)).toEqual(2);
    expect(getTriState(19, 0)).toEqual(1);
    expect(getTriState(77, 0)).toEqual(2);
  });

  test('test base 3 state retrieval of position 2', () => {
    expect(getTriState(0, 1)).toEqual(0);
    expect(getTriState(1, 1)).toEqual(0);
    expect(getTriState(2, 1)).toEqual(0);
    expect(getTriState(3, 1)).toEqual(1);
    expect(getTriState(4, 1)).toEqual(1);
    expect(getTriState(5, 1)).toEqual(1);
    expect(getTriState(6, 1)).toEqual(2);
    expect(getTriState(77, 1)).toEqual(1);
    expect(getTriState(80, 1)).toEqual(2);
  });

  test('test base 3 state retrieval of position 3', () => {
    expect(getTriState(0, 2)).toEqual(0);
    expect(getTriState(1, 2)).toEqual(0);
    expect(getTriState(2, 2)).toEqual(0);
    expect(getTriState(3, 2)).toEqual(0);
    expect(getTriState(9, 2)).toEqual(1);
    expect(getTriState(10, 2)).toEqual(1);
    expect(getTriState(18, 2)).toEqual(2);
    expect(getTriState(27, 2)).toEqual(0);
    expect(getTriState(37, 2)).toEqual(1);
  });

});

describe('calcEquationWithConcat function', () => {
  test('test the calculation functions with the third concat operator', () => {
    expect(calcEquationWithConcat(exampleEquations[0])).toEqual(190);
    expect(calcEquationWithConcat(exampleEquations[1])).toEqual(3267);
    expect(calcEquationWithConcat(exampleEquations[3])).toEqual(156);
    expect(calcEquationWithConcat(exampleEquations[4])).toEqual(7290);
    expect(calcEquationWithConcat(exampleEquations[5])).toEqual(0);
    expect(calcEquationWithConcat(exampleEquations[6])).toEqual(192);
    expect(calcEquationWithConcat(exampleEquations[7])).toEqual(0);
    expect(calcEquationWithConcat(exampleEquations[8])).toEqual(292);
  });
});

describe('sumOfEquationsWithConcat function', () => {
  test('test the second answer with the example data', () => {
    expect(sumOfEquationsWithConcat(exampleEquations)).toEqual(11387);
  });
});
