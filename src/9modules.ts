export const getFileSystem = (text: string): number[] => {
  let file = true;
  let fileId = 0;
  let fs: number[] = [];
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < parseInt(text[i]); j++) {
      fs.push(file ? fileId : -1);
    }

    file = !file;
    if (file) fileId++;
  }
  return fs;
}

export const defrag = (fs: number[]): number[] => {
  let backpointer = fs.length - 1;

  const dfs: number[] = fs.map((block: number, index: number) => {
    if (index === backpointer) return block;
    if (index > backpointer) return -1;

    if (block === -1) {
      while (fs[backpointer] === -1 && backpointer > index) {
        backpointer--;
      }

      const lastBlock: number = fs[backpointer];
      backpointer--;
      return lastBlock;
    }
    return block;
  });

  return dfs.flatMap(s => s < 0 ? [] : s);
}

export const getChecksum = (fs: number[]): number => fs.reduce((acc, curr, index) => acc + (index * curr), 0)

export const defragAndCheck = (diskmap: string): number => {
  const fs = getFileSystem(diskmap);
  const dfs = defrag(fs);
  return getChecksum(dfs);
}

/** Part 2 **/

export type Block = {
  fileId: number;
  size: number;
  blocks: Block[]; // array
}

export const getFileSystem2 = (text: string): Block[] => {
  let file = true;
  let fileId = 0;
  let fs: Block[] = [];
  for (let i = 0; i < text.length; i++) {
    const size = parseInt(text[i]);

    if (size > 0) {
      const block = {
        fileId: file ? fileId : -1,
        size: size,
        blocks: [],
      }

      fs.push(block);
    }

    file = !file;
    if (file) fileId++;
  }
  return fs;
}

export const defrag2 = (fs: Block[]): Block[] => {
    for (let backIndex = fs.length - 1; backIndex >= 0; backIndex--) {
      const backBlock = fs[backIndex];
      if (backBlock.fileId === -1) continue;

      // Find the nearest gap from the front that fits the block.
      for (let frontIndex = 0; frontIndex < backIndex; frontIndex++) {
        if (fs[frontIndex].fileId === -1 && fs[frontIndex].size >= backBlock.size) {
          // We have a gap that fits.
          const gap = fs[frontIndex];
          gap.size -= backBlock.size;
          gap.blocks.push(backBlock);
          fs[backIndex] = {
            fileId: -1,
            size: backBlock.size,
            blocks: [],
          };
          break; // stop now
        }
      }
    }

  return fs.flatMap(block => {
    if (block.fileId > -1) return block;

    if (block.blocks.length === 0) {
      return block.size === 0 ? [] : block;
    }

    if (block.size === 0) {
      return block.blocks;
    }

    block.blocks.push({
      fileId: -1,
      size: block.size,
      blocks: [],
    });

    return block.blocks;
  }).flatMap((s, index, arr) => {
    if (s.fileId !== -1) return s;
    if (s.size === 0) return [];

    for (let i = index + 1; i < arr.length; i++) {
      if (arr[i].fileId > -1) {
        break;
      }

      s.size += arr[i].size;
      arr[i].size = 0;
    }
    return s;
  });
}

export const getChecksum2 = (fs: Block[]): number => {
  let pos = 0;
  let checksum = 0;

  for (let i = 0; i < fs.length; i++) {
    for (let j = 0; j < fs[i].size; j++) {
      checksum += fs[i].fileId < 0 ? 0 : fs[i].fileId * (pos + j);
    }
    pos += fs[i].size;
  }

  return checksum;
}

export const defragAndCheck2 = (diskmap: string): number => {
  const fs = getFileSystem2(diskmap);
  const dfs = defrag2(fs);
  return getChecksum2(dfs);
}
