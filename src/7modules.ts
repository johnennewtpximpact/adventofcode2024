export type Equation = {
  testValue: number;
  numbers: number[];
}

export const bit_test = (num: number, bit: number): boolean => {
    return ((num >> bit) % 2 != 0);
}

export const generateEquations = (text: string): Equation[] => {
  return text.split('\n').flatMap(line => {
    const bits = line.split(':');
    if (bits.length !== 2) {
      return [];
    }
    return {
      testValue: parseInt(bits[0]),
      numbers: bits[1].trim().split(' ').flatMap(s => parseInt(s))
    }
  });
}

export const calcEquation = (eq: Equation): number => {
  let count = 0;
  const operationVariations = 2 ** (eq.numbers.length - 1);

  for (let i = 0; i < operationVariations; i++) {

    const val = eq.numbers.reduce((acc, curr, index) => {
      if (index === 0) return curr;
      const flag = index - 1;
      return bit_test(i, flag) ? acc * curr : acc + curr;
    }, 0);

    if (val === eq.testValue) count++;
  }

  return count > 0 ? eq.testValue : 0;
}

export const calcEquationWithConcat = (eq: Equation): number => {
  let count = 0;
  const operationVariations = 3 ** (eq.numbers.length - 1);

  for (let i = 0; i < operationVariations; i++) {

    const val = eq.numbers.reduce((acc, curr, index) => {
      if (index === 0) return curr;
      const flag = index - 1;
      const operator = getTriState(i, flag);

      if (operator === 0) {
        return acc * curr;
      }
      else if (operator === 1) {
        return acc + curr;
      }
      else {
        return parseInt(acc.toString() + curr.toString());
      }
    }, 0);

    if (val === eq.testValue) count++;
  }

  return count > 0 ? eq.testValue : 0;
}

export const sumOfEquations = (equations: Equation[]): number => equations.reduce((acc, curr) => acc + calcEquation(curr), 0);
export const sumOfEquationsWithConcat = (equations: Equation[]): number => equations.reduce((acc, curr) => acc + calcEquationWithConcat(curr), 0);

const _getStateOfBase = (base: number, value: number, position: number): number => {
  return Math.floor(value / base ** position) % base;
}

/**
 * Base 3 retrieval of the state of a given place value.
 * In base 3, each place value can be 0, 1 or 2.
 * Given a number (in base 10) retrieve the value in a specified
 * position once the number is converted to base 3.
 */
export const getTriState = (value: number, position: number): number => {
  return _getStateOfBase(3, value, position);
}
