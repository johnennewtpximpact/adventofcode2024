import { getFileSystem, defrag, getChecksum, getFileSystem2, defrag2, defragAndCheck2 } from '../src/9modules';

// 12345 -> 0..111....22222 -> 022111222 -> 0+2+4+3+4+5+12+14+16 -> 60
const exampleDiskMap1 = `12345`;
const exampleFs = [0,-1,-1,1,1,1,-1,-1,-1,-1,2,2,2,2,2];
const exampleFsNoSpace = [0,1,1,1,2,2,2,2,2];
const exampleDefraggedFs = [0,2,2,1,1,1,2,2,2];
const exampleChecksum1 = 60;
const exampleDiskMap2 = '2333133121414131402';
const exampleFs2 = [
  { fileId: 0, size: 2, blocks: [] },
  { fileId: -1, size: 3, blocks: [] },
  { fileId: 1, size: 3, blocks: [] },
  { fileId: -1, size: 3, blocks: [] },
  { fileId: 2, size: 1, blocks: [] },
  { fileId: -1, size: 3, blocks: [] },
  { fileId: 3, size: 3, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 4, size: 2, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 5, size: 4, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 6, size: 4, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 7, size: 3, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 8, size: 4, blocks: [] },
  { fileId: 9, size: 2, blocks: [] },
];

const exampleDefraggedFs2 = [
  { fileId: 0, size: 2, blocks: [] },
  { fileId: 9, size: 2, blocks: [] },
  { fileId: 2, size: 1, blocks: [] },
  { fileId: 1, size: 3, blocks: [] },
  { fileId: 7, size: 3, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 4, size: 2, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 3, size: 3, blocks: [] },
  { fileId: -1, size: 4, blocks: [] },
  { fileId: 5, size: 4, blocks: [] },
  { fileId: -1, size: 1, blocks: [] },
  { fileId: 6, size: 4, blocks: [] },
  { fileId: -1, size: 5, blocks: [] },
  { fileId: 8, size: 4, blocks: [] },
  { fileId: -1, size: 2, blocks: [] },
];

const exampleChecksum2 = 2858;

describe('getFileSystem function', () => {
  test('Get the file system for the basic diskmap', () => {
    expect(getFileSystem(exampleDiskMap1)).toEqual(exampleFs);
  });

  test('Check fs generates correctly with no gaps', () => {
    expect(getFileSystem("10305")).toEqual(exampleFsNoSpace);
  });
});

describe('getDefragged function', () => {
  test('Get the defragged filesystem from the basic file system', () => {
    expect(defrag(exampleFs)).toEqual(exampleDefraggedFs);
  });

  test('Check a defrag on a disk with no spaces works as expected', () => {
    expect(defrag(exampleFsNoSpace)).toEqual(exampleFsNoSpace);
  });
});

describe('getChecksum function', () => {
  test('Get the checksum for the basic defragged system', () => {
    expect(getChecksum(exampleDefraggedFs)).toEqual(exampleChecksum1);
  });
});

describe('getFileSystem2 function', () => {
  test('Get the file system for the basic diskmap type 2', () => {
    expect(getFileSystem2(exampleDiskMap2)).toEqual(exampleFs2);
  });
});

describe('getDefragged2 function', () => {
  test('Get the defragged filesystem from the basic file system type 2', () => {
    expect(defrag2(exampleFs2)).toEqual(exampleDefraggedFs2);
  });
});

describe('getChecksum2 function', () => {
  test('Get the checksum2 for the basic defragged system', () => {
    expect(defragAndCheck2(exampleDiskMap2)).toEqual(exampleChecksum2);
  });
});
