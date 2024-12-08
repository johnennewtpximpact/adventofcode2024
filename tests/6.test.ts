import { countSuccessfulObstructions, runWalkWithLoopCheck, runWalk, countVisits, getStartPos, bit_test, bit_set, rotateDir, getToggle, UP, DOWN, LEFT, RIGHT } from '../src/6modules';

const examplegrid = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split('\n').map(line => line.split(''));

const examplevisited = `..........
....XXXXX.
....X...X.
....X...X.
..XXXXX.X.
..X.X.X.X.
..XXXXXXX.
.XXXXXXX..
.XXXXXXX..
.......X..`.split('\n').map(line => line.split(''));


describe('rotateDir function', () => {
  test('up should rotate to right', () => {
    expect(rotateDir(UP)).toEqual(RIGHT);
  });

  test('right should rotate to down', () => {
    expect(rotateDir(RIGHT)).toEqual(DOWN);
  });

  test('down should rotate to left', () => {
    expect(rotateDir(DOWN)).toEqual(LEFT);
  });

  test('left should rotate to up', () => {
    expect(rotateDir(LEFT)).toEqual(UP);
  });

});

describe('getToggle function', () => {
  test('up shoud return 0', () => {
    expect(getToggle(UP)).toEqual(0);
  });

  test('down shoud return 1', () => {
    expect(getToggle(DOWN)).toEqual(1);
  });

  test('left shoud return 2', () => {
    expect(getToggle(LEFT)).toEqual(2);
  });

  test('right shoud return 3', () => {
    expect(getToggle(RIGHT)).toEqual(3);
  });
});

describe('bit_test function', () => {
  test('0 toggle triggers', () => {
    expect(bit_test(0, 0)).toEqual(false);
    expect(bit_test(1, 0)).toEqual(true);
    expect(bit_test(2, 0)).toEqual(false);
    expect(bit_test(3, 0)).toEqual(true);
    expect(bit_test(4, 0)).toEqual(false);
    expect(bit_test(5, 0)).toEqual(true);
    expect(bit_test(6, 0)).toEqual(false);
    expect(bit_test(7, 0)).toEqual(true);
    expect(bit_test(8, 0)).toEqual(false);
    expect(bit_test(9, 0)).toEqual(true);
    expect(bit_test(10, 0)).toEqual(false);
    expect(bit_test(11, 0)).toEqual(true);
    expect(bit_test(12, 0)).toEqual(false);
    expect(bit_test(13, 0)).toEqual(true);
    expect(bit_test(14, 0)).toEqual(false);
    expect(bit_test(15, 0)).toEqual(true);
  });

  test('1 toggle triggers', () => {
    expect(bit_test(0, 1)).toEqual(false);
    expect(bit_test(1, 1)).toEqual(false);
    expect(bit_test(2, 1)).toEqual(true);
    expect(bit_test(3, 1)).toEqual(true);
    expect(bit_test(4, 1)).toEqual(false);
    expect(bit_test(5, 1)).toEqual(false);
    expect(bit_test(6, 1)).toEqual(true);
    expect(bit_test(7, 1)).toEqual(true);
    expect(bit_test(8, 1)).toEqual(false);
    expect(bit_test(9, 1)).toEqual(false);
    expect(bit_test(10, 1)).toEqual(true);
    expect(bit_test(11, 1)).toEqual(true);
    expect(bit_test(12, 1)).toEqual(false);
    expect(bit_test(13, 1)).toEqual(false);
    expect(bit_test(14, 1)).toEqual(true);
    expect(bit_test(15, 1)).toEqual(true);
  });

  test('2 toggle triggers', () => {
    expect(bit_test(0, 2)).toEqual(false);
    expect(bit_test(1, 2)).toEqual(false);
    expect(bit_test(2, 2)).toEqual(false);
    expect(bit_test(3, 2)).toEqual(false);
    expect(bit_test(4, 2)).toEqual(true);
    expect(bit_test(5, 2)).toEqual(true);
    expect(bit_test(6, 2)).toEqual(true);
    expect(bit_test(7, 2)).toEqual(true);
    expect(bit_test(8, 2)).toEqual(false);
    expect(bit_test(9, 2)).toEqual(false);
    expect(bit_test(10, 2)).toEqual(false);
    expect(bit_test(11, 2)).toEqual(false);
    expect(bit_test(12, 2)).toEqual(true);
    expect(bit_test(13, 2)).toEqual(true);
    expect(bit_test(14, 2)).toEqual(true);
    expect(bit_test(15, 2)).toEqual(true);
  });

  test('3 toggle triggers', () => {
    expect(bit_test(0, 3)).toEqual(false);
    expect(bit_test(1, 3)).toEqual(false);
    expect(bit_test(2, 3)).toEqual(false);
    expect(bit_test(3, 3)).toEqual(false);
    expect(bit_test(4, 3)).toEqual(false);
    expect(bit_test(5, 3)).toEqual(false);
    expect(bit_test(6, 3)).toEqual(false);
    expect(bit_test(7, 3)).toEqual(false);
    expect(bit_test(8, 3)).toEqual(true);
    expect(bit_test(9, 3)).toEqual(true);
    expect(bit_test(10, 3)).toEqual(true);
    expect(bit_test(11, 3)).toEqual(true);
    expect(bit_test(12, 3)).toEqual(true);
    expect(bit_test(13, 3)).toEqual(true);
    expect(bit_test(14, 3)).toEqual(true);
    expect(bit_test(15, 3)).toEqual(true);
  });
});

describe('bit_set function', () => {
  test('setting bit 0', () => {
    expect(bit_set(0, 0)).toEqual(1);
    expect(bit_set(1, 0)).toEqual(1);
    expect(bit_set(2, 0)).toEqual(3);
    expect(bit_set(3, 0)).toEqual(3);
    expect(bit_set(4, 0)).toEqual(5);
    expect(bit_set(5, 0)).toEqual(5);
    expect(bit_set(6, 0)).toEqual(7);
    expect(bit_set(7, 0)).toEqual(7);
    expect(bit_set(8, 0)).toEqual(9);
    expect(bit_set(9, 0)).toEqual(9);
    expect(bit_set(10, 0)).toEqual(11);
    expect(bit_set(11, 0)).toEqual(11);
    expect(bit_set(12, 0)).toEqual(13);
    expect(bit_set(13, 0)).toEqual(13);
    expect(bit_set(14, 0)).toEqual(15);
    expect(bit_set(15, 0)).toEqual(15);
  });

  test('setting bit 1', () => {
    expect(bit_set(0, 1)).toEqual(2);
    expect(bit_set(1, 1)).toEqual(3);
    expect(bit_set(2, 1)).toEqual(2);
    expect(bit_set(3, 1)).toEqual(3);
    expect(bit_set(4, 1)).toEqual(6);
    expect(bit_set(5, 1)).toEqual(7);
    expect(bit_set(6, 1)).toEqual(6);
    expect(bit_set(7, 1)).toEqual(7);
    expect(bit_set(8, 1)).toEqual(10);
    expect(bit_set(9, 1)).toEqual(11);
    expect(bit_set(10, 1)).toEqual(10);
    expect(bit_set(11, 1)).toEqual(11);
    expect(bit_set(12, 1)).toEqual(14);
    expect(bit_set(13, 1)).toEqual(15);
    expect(bit_set(14, 1)).toEqual(14);
    expect(bit_set(15, 1)).toEqual(15);
  });

  test('setting bit 2', () => {
    expect(bit_set(0, 2)).toEqual(4);
    expect(bit_set(1, 2)).toEqual(5);
    expect(bit_set(2, 2)).toEqual(6);
    expect(bit_set(3, 2)).toEqual(7);
    expect(bit_set(4, 2)).toEqual(4);
    expect(bit_set(5, 2)).toEqual(5);
    expect(bit_set(6, 2)).toEqual(6);
    expect(bit_set(7, 2)).toEqual(7);
    expect(bit_set(8, 2)).toEqual(12);
    expect(bit_set(9, 2)).toEqual(13);
    expect(bit_set(10, 2)).toEqual(14);
    expect(bit_set(11, 2)).toEqual(15);
    expect(bit_set(12, 2)).toEqual(12);
    expect(bit_set(13, 2)).toEqual(13);
    expect(bit_set(14, 2)).toEqual(14);
    expect(bit_set(15, 2)).toEqual(15);
  });
});

describe('getStartPos function', () => {
  test('find the start position in a simple grid', () => {

    const grid = [
        ['.', '.', '.', '.'],
        ['.', '#', '.', '.'],
        ['.', '.', '^', '.'],
        ['.', '.', '.', '.']
    ];
    expect(getStartPos(grid)).toEqual([2, 2]);
  });

  test('find the start position in the example grid', () => {
    expect(getStartPos(examplegrid)).toEqual([6, 4]);
  });
});


describe('countVisits function', () => {
  test('find the visited squares in a simple grid', () => {
    const grid = [
        ['', '', 'X', 'X'],
        ['', '', 'X', 'X'],
        ['', '', 'X', 'X'],
        ['', '', '', 'X']
    ];

    expect(countVisits(grid)).toEqual(7);
  });

  test('find the visited squares in the example grid', () => {
    expect(countVisits(examplevisited)).toEqual(41);
  });
});

describe('runWalk function', () => {
  test('runWalk the example grid', () => {
    expect(runWalk(examplegrid, [6, 4])).toEqual(examplevisited);
  });
});

describe('runWalkWithLoopCheck function', () => {
  test('runWalkWithLoopCheck the example grid', () => {
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [6, 3])).toEqual(true);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [7, 6])).toEqual(true);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [7, 7])).toEqual(true);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [8, 1])).toEqual(true);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [8, 3])).toEqual(true);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [9, 7])).toEqual(true);

    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [0, 0])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [1, 1])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [2, 2])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [3, 3])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [4, 4])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [5, 5])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [6, 6])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [8, 8])).toEqual(false);
    expect(runWalkWithLoopCheck(examplegrid, [6, 4], [9, 9])).toEqual(false);
  });
});

describe('countSuccessfulObstructions function', () => {
  test('runWalk the example grid', () => {
    expect(countSuccessfulObstructions(examplegrid, examplevisited, [6, 4])).toEqual(6);
  });
});
