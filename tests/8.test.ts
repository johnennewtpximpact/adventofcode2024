import { countResonantAntiNodes, getAntennas, getAntiNodes, addAntennaToCluster, getAntiNodesFromCluster, countAntiNodes } from '../src/8modules';

const exampleInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe('getAntiNodes function', () => {
  test('Check the interference points between two horizontal nodes', () => {
    expect(getAntiNodes({ x: 0, y: 3 }, { x: 0, y: 5 })).toEqual([{ x: 0, y: 1, next: null }, { x: 0, y: 7, next: null }]);
    expect(getAntiNodes({ x: 0, y: 4 }, { x: 0, y: 6 })).toEqual([{ x: 0, y: 2, next: null}, { x: 0, y: 8, next: null }]);
    expect(getAntiNodes({ x: 0, y: 5 }, { x: 0, y: 7 })).toEqual([{ x: 0, y: 3, next: null}, { x: 0, y: 9, next: null }]);
    expect(getAntiNodes({ x: 0, y: 3 }, { x: 0, y: 6 })).toEqual([{ x: 0, y: 0, next: null }, { x: 0, y: 9, next: null }]);
  });
  test('Check the interference points between two verticle nodes', () => {
    expect(getAntiNodes({ x: 3, y: 0 }, { x: 5, y: 0 })).toEqual([{ x: 1, y: 0, next: null }, { x: 7, y: 0, next: null }]);
  });
  test('Check the interference points between two diagonal nodes', () => {
    expect(getAntiNodes({ x: 2, y: 5 }, { x: 3, y: 7 })).toEqual([{ x: 1, y: 3, next: null }, { x: 4, y: 9, next: null }]);
    expect(getAntiNodes({ x: 3, y: 7 }, { x: 2, y: 5 })).toEqual([{ x: 4, y: 9, next: null }, { x: 1, y: 3, next: null }]);
    expect(getAntiNodes({ x: 1, y: 8 }, { x: 4, y: 4 })).toEqual([{ x: 7, y: 0, next: null }]);
    expect(getAntiNodes({ x: 8, y: 8 }, { x: 9, y: 9 })).toEqual([{ x: 7, y: 7, next: null }, { x: 10, y: 10, next: null }]);
    expect(getAntiNodes({ x: 5, y: 6 }, { x: 8, y: 8 })).toEqual([{ x: 2, y: 4, next: null }, { x: 11, y: 10, next: null }]);
  });
});

describe('addAntennaToCluster function', () => {
 test('add a an antenna to an empty cluster', () => {
    expect(addAntennaToCluster(null, 'A', 0, 0)).toEqual({ label: 'A', antennas: [{ x: 0, y: 0 }], next: null});
 })

  let inputCluster1 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: null};
  let outputCluster1 = { label: 'A', antennas: [{ x: 0, y: 0 }, { x: 1, y: 5 }], next: null}

  test('add an antenna to existing cluster', () => {
    expect(addAntennaToCluster(inputCluster1, 'A', 1, 5)).toEqual(outputCluster1);
});

  let inputCluster2 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: null};
  let outputCluster2_1 = { label: 'B', antennas: [{ x: 1, y: 5 }], next: null}
  let outputCluster2_2 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: outputCluster2_1}

  test('add a new type of antenna to existing cluster 1 deep', () => {
    expect(addAntennaToCluster(inputCluster2, 'B', 1, 5)).toEqual(outputCluster2_2);
  });

  let inputCluster3_1 = { label: 'B', antennas: [{ x: 1, y: 5 }], next: null};
  let inputCluster3_2 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: inputCluster3_1};
  let outputCluster3_1 = { label: 'C', antennas: [{ x: 10, y: 15 }], next: null}
  let outputCluster3_2 = { label: 'B', antennas: [{ x: 1, y: 5 }], next: outputCluster3_1}
  let outputCluster3_3 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: outputCluster3_2}

  test('add a new type of antenna to existing cluster 2 deep', () => {
    expect(addAntennaToCluster(inputCluster3_2, 'C', 10, 15)).toEqual(outputCluster3_3);
  });

  let inputCluster4_1 = { label: 'B', antennas: [{ x: 1, y: 5 }], next: null};
  let inputCluster4_2 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: inputCluster4_1};
  let outputCluster4_2 = { label: 'B', antennas: [{ x: 1, y: 5 }, { x: 11, y: 1 }], next: null}
  let outputCluster4_1 = { label: 'A', antennas: [{ x: 0, y: 0 }], next: outputCluster4_2}

  test('add a new antenna to existing cluster 1 deep', () => {
    expect(addAntennaToCluster(inputCluster4_2, 'B', 11, 1)).toEqual(outputCluster4_1);
  });
});

describe('getAntennas function', () => {
 test('Check that we get a Cluster data structure from input data', () => {
    expect(getAntennas(exampleInput)).toEqual({
      label: '0',
      antennas: [{x: 1, y: 8}, {x: 2, y: 5}, { x: 3, y: 7 }, { x: 4, y: 4}],
      next: {
        label: 'A',
        antennas: [{ x: 5, y: 6 }, { x: 8, y: 8 }, { x: 9, y: 9 }],
        next: null
      }
    });
  });
});

describe('getAntiNodesFromCluster function', () => {

  test('Check basic antenna cluster returns expected antinodes', () => {
    const antennas = {
      label: 'A',
      antennas: [{ x: 0, y: 3 }, { x: 0, y: 5 }],
      next: null,
    }
    const antiNodes = {
      x: 0,
      y: 1,
      next: {
        x: 0,
        y: 7,
        next: null
      }
    };
    expect(getAntiNodesFromCluster(antennas, 11, 11)).toEqual(antiNodes);
  });


  test('Check duplicate antinodes not included', () => {
    const antennas = {
      label: 'A',
      antennas: [{ x: 0, y: 2 }, { x: 0, y: 4 }],
      next:  {
        label: 'O',
        antennas: [{ x: 2, y: 0 }, { x: 4, y: 0 }],
        next: null,
    }

    }
    const antiNodes = {
      x: 0,
      y: 0,
      next: {
        x: 0,
        y: 6,
        next: {
          x: 6,
          y: 0,
          next: null
        }
      }
    };
    expect(getAntiNodesFromCluster(antennas, 11, 11)).toEqual(antiNodes);
  });
});

describe('countAntiNodes function', () => {
  test('Check the example counts correctly', () => {
    expect(countAntiNodes(exampleInput)).toEqual(14);
  });
});

describe('getAntiNodes function with resonance', () => {
  test('Check the interference points between two horizontal nodes', () => {
    expect(getAntiNodes({ x: 0, y: 3 }, { x: 0, y: 5 }, 11, 11, true)).toEqual([{ x: 0, y: 3, next: null }, { x: 0, y: 1, next: null }, { x: 0, y: 5, next: null }, { x: 0, y: 7, next: null }, { x: 0, y: 9, next: null }, { x: 0, y: 11, next: null }]);
  });
});

describe('countResonantAntiNodes function', () => {
  test('Check the example counts correctly', () => {
    expect(countResonantAntiNodes(exampleInput)).toEqual(34);
  });
});
