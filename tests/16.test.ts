import { explore, solve, solve2 } from '../src/16modules';

const e1 = `
#####
#..E#
#.#.#
#.#.#
#S..#
#####`;

const e1l = e1.trim().split('\n').map(l => l.split(''));

const e2 = `
#####
#..E#
#.#.#
#...#
#.#.#
#S..#
#####`;

const e2l = e2.trim().split('\n').map(l => l.split(''));

const e21 = `
########
#.....E#
##..####
#.....##
#####..#
#S.....#
########`;

const e21l = e21.trim().split('\n').map(l => l.split(''));

const e3 = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const e3l = e3.trim().split('\n').map(l => l.split(''));

const e4 = `
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

const e4l = e4.trim().split('\n').map(l => l.split(''));

describe('explore', () => {

  test('explore --> e1', () => {
    expect(explore(e1l)).toEqual(1005);
  });

  test('explore --> e2', () => {
    expect(explore(e2l)).toEqual(1006);
  });

  test('explore --> e21', () => {
    expect(explore(e21l)).toEqual(4013);
  });

  test('explore --> e3', () => {
    expect(explore(e3l)).toEqual(7036);
  });

  test('explore --> e4', () => {
    expect(explore(e4l)).toEqual(11048);
  });

});

describe('solve', () => {

  test('solve --> e1', () => {
    expect(solve(e1)).toEqual(1005);
  });

  test('solve --> e2', () => {
    expect(solve(e2)).toEqual(1006);
  });

  test('solve --> e3', () => {
    expect(solve(e3)).toEqual(7036);
  });

  test('solve --> e4', () => {
    expect(solve(e4)).toEqual(11048);
  });
});

describe('solve2', () => {

  test('solve2 --> e1', () => {
    expect(solve2(e1)).toEqual(6);
  });

  test('solve2 --> e2', () => {
    expect(solve2(e2)).toEqual(7);
  });

  test('solve2 --> e3', () => {
    expect(solve2(e3)).toEqual(45);
  });

  test('solve2 --> e4', () => {
    expect(solve2(e4)).toEqual(64);
  });
});
