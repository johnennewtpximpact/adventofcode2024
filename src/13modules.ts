type Coord = {
  x: number;
  y: number;
}

type Machine = {
  buttonA: Coord;
  buttonB: Coord;
  prize: Coord;
}

type Solution = {
  aPresses: number;
  bPresses: number;
  price: number;
}

export const getMachine = (input: string): Machine => {
  const buttonPattern = /Button (\w): X\+(\d+), Y\+(\d+)/g;
  const prizePattern = /Prize: X=(\d+), Y=(\d+)/;

  const matchesA = buttonPattern.exec(input);

  if (!matchesA) {
    throw new Error('bad machine - no button A');
  }

  const buttonA: Coord = {
      x: parseInt(matchesA[2], 10),
      y: parseInt(matchesA[3], 10),
  }

  const matchesB = buttonPattern.exec(input);

  if (!matchesB) {
    throw new Error('bad machine - no button B');
  }

  const buttonB: Coord = {
      x: parseInt(matchesB[2], 10),
      y: parseInt(matchesB[3], 10),
  }

  const prizeMatch = prizePattern.exec(input);

  if (!prizeMatch) {
    throw new Error('bad machine - no prize');
  }

  const [_, x, y] = prizeMatch;
  const prize: Coord = {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  };

  const result = {
    buttonA: buttonA,
    buttonB: buttonB,
    prize: prize,
  }

  return result;
}

export const solveMachine = (machine: Machine): Solution => {
  let s: Solution = {
    aPresses: 0,
    bPresses: 0,
    price: 0,
  }

  const aPresses = ((machine.buttonB.x * machine.prize.y) - (machine.buttonB.y*machine.prize.x)) / ((machine.buttonB.x * machine.buttonA.y) - (machine.buttonA.x * machine.buttonB.y));
  const bPresses = (machine.prize.y - (aPresses * machine.buttonA.y)) / machine.buttonB.y;

  if (Number.isInteger(aPresses) && Number.isInteger(bPresses)) {
    s.aPresses = aPresses;
    s.bPresses = bPresses;
    s.price = (aPresses * 3) + bPresses;
  }

  return s;
}

export const solveMachine2 = (machine: Machine): Solution => {
  machine.prize.x += 10000000000000;
  machine.prize.y += 10000000000000;
  return solveMachine(machine);
}

export const solveMachines = (machines: Machine[]): number => machines.reduce((acc, machine) => acc + solveMachine(machine).price, 0);
export const solveMachines2 = (machines: Machine[]): number => machines.reduce((acc, machine) => acc + solveMachine2(machine).price, 0);

export const solve = (machinesText: string): number => {
  const machines = machinesText.trim().split(/^\s*$/m).map(machineText => getMachine(machineText));
  return solveMachines(machines);
}

export const solve2 = (machinesText: string): number => {
  const machines = machinesText.trim().split(/^\s*$/m).map(machineText => getMachine(machineText));
  return solveMachines2(machines);
}
