type Peak = {
  row: number;
  col: number;
}

const dirs = [
  [-1, 0 ],
  [ 0, 1 ],
  [ 1, 0 ],
  [ 0, -1],
];

const findPeaks = (startRow: number, startCol: number, map: number[][], height: number = 0, lastRow: number = 0, lastCol: number = 0): Peak[] => {
  let peaks: Peak[] = [];

  lastRow = height === 0 ? startRow : lastRow;
  lastCol = height === 0 ? startCol : lastCol;

  dirs.forEach(dir => {
    const row = lastRow + dir[0];
    const col = lastCol + dir[1];

    if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) return;

    if (height === 8 && map[row][col] === 9) {
      peaks.push({
        row: row,
        col: col,
      });
    }

    else if (map[row][col] === height + 1) {
      findPeaks(startRow, startCol, map, height+1, row, col).forEach(s => peaks.push(s));
    }
  });

  return peaks;
}

export const getTrailHeads = (text: string, getRating: boolean = false): number => {
  const map = text.split('\n').map(s => s.split('').map(k => parseInt(k)));
  let trails = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        const peaks = findPeaks(i, j, map);

        if (getRating) {
          trails += peaks.length;
        }
        else {
          trails += peaks.filter((value, index, arr) => {
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].row === value.row && arr[k].col === value.col) {
                return k === index;
              }
            }
          }).length;
        }
      }
    }
  }

  return trails;
};
