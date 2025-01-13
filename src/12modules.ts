type Region = {
  letter: string;
  area: number;
  perimeter: number;
  cost: number;
  sides: number;
  discountPrice: number;
  locations: [number, number][];
  edges: [number, number, number][];
}

const arraysEqual = (arr1: number[], arr2: number[]): boolean => arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);

const inRegion = (x: number, y: number, r: Region): boolean => r.locations.some(item => arraysEqual(item, [x, y]));

const inAnyRegion = (x: number, y: number, rs: Region[]): boolean => rs.reduce((acc, r) => acc || inRegion(x, y, r), false);

export const describeRegion = (plot: string[][], x: number, y: number): Region => {
  let r = {
    letter: plot[x][y],
    area: 0,
    perimeter: 0,
    cost: 0,
    sides: 0,
    discountPrice: 0,
    locations: [] as [number, number][],
    edges: [] as [number, number, number][],
  };

  r = _describeRegion(plot, x, y, r);
  r.cost = r.area * r.perimeter;
  r.sides = calculateSides(r.edges);
  r.discountPrice = r.sides * r.area;

  return r;
}

const _describeRegion = (plot: string[][], x: number, y: number, r: Region): Region => {
  r.locations.push([x, y]);
  r.area++;

  const moves = [[0, -1], [-1, 0], [0, 1], [1, 0]];

  moves.forEach((move, i) => {
    const x_next = x + move[0];
    const y_next = y + move[1];

    if (x_next < 0 || y_next < 0 || x_next >= plot.length || y_next >= plot[0].length) {
      r.perimeter++;
      r.edges.push([x, y, i+1]);
    }

    else if (plot[x_next][y_next] !== r.letter) {
      r.perimeter++;
      r.edges.push([x, y, i+1]);
    }

    else if (!inRegion(x_next, y_next, r)) {
      r = _describeRegion(plot, x_next, y_next, r);
    }
  });

  return r;
}

export const calculateSides = (edges: [number, number, number][]): number => {
  const leftEdges = _calculateSidesOfType(edges, 1);
  const topEdges = _calculateSidesOfType(edges, 2);
  const rightEdges = _calculateSidesOfType(edges, 3);
  const bottomEdges = _calculateSidesOfType(edges, 4);
  return leftEdges + topEdges + rightEdges + bottomEdges;
}

const _calculateSidesOfType = (edges: [number, number, number][], sideType: number): number => {
  const primary = sideType === 1 || sideType === 3 ? 1 : 0;
  const secondary = primary === 1 ? 0 : 1;

  return edges
    .filter(e => e[2] === sideType)
    .sort((a, b) => (a[primary] === b[primary]) ? a[secondary] - b[secondary] : a[primary] - b[primary])
    .reduce((acc, curr, i, arr) => {
      if (i === 0) {
        return 1;
      }

      if (arr[i][primary] !== arr[i-1][primary]) {
        return acc + 1;
      }

      if (arr[i][secondary] !== arr[i-1][secondary] + 1) {
        return acc + 1;
      }

      return acc;
    }, 0);
}

export const describeRegions = (plot: string[][]): Region[] => {
  let regions = [] as Region[];

  for (let x = 0; x < plot.length; x++) {
    for (let y = 0; y < plot[0].length; y++) {
      if (!inAnyRegion(x, y, regions)) {
        regions.push(describeRegion(plot, x, y));
      }
    }
  }

  return regions;
}


export const getPrice = (plot: string[][]): number => {
  const regions = describeRegions(plot);
  return regions.reduce((p, r) => p + r.cost, 0);
}

export const getDiscountPrice = (plot: string[][]): number => {
  const regions = describeRegions(plot);
  return regions.reduce((p, r) => p + r.discountPrice, 0);
}
