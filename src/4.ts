import { readFileSync } from 'fs';
const figlet = require("figlet");

const text = readFileSync('./src/day4.txt', 'utf-8');
const searchgrid = text.split('\n').map(line => line.split(''));

const findXmas = (row: number, col: number, rowdir: number, coldir: number): number => {
	for (let i = 1; i < 4; i++) {
		const checkRow = row + (i * rowdir);	
		const checkCol = col + (i * coldir);	

		if (checkRow < 0 || checkCol < 0 || checkRow >= searchgrid.length || checkCol >= searchgrid[0].length) {
			// We've left the grid.
			return 0;
		}

		if (i === 1 && searchgrid[checkRow][checkCol] !== 'M') return 0;
		if (i === 2 && searchgrid[checkRow][checkCol] !== 'A') return 0;
		if (i === 3 && searchgrid[checkRow][checkCol] !== 'S') return 0;
	}

	return 1;
}

const xmasCount = searchgrid.reduce((acc, row, rownum) => acc + row.reduce((acc, cell, colnum) => {

	if (cell === 'X') {
		// Check the 8 directions from this X.
		acc += findXmas(rownum, colnum, -1, 0);
		acc += findXmas(rownum, colnum, -1, 1);
		acc += findXmas(rownum, colnum, 0, 1);
		acc += findXmas(rownum, colnum, 1, 1);
		acc += findXmas(rownum, colnum, 1, 0);
		acc += findXmas(rownum, colnum, 1, -1);
		acc += findXmas(rownum, colnum, 0, -1);
		acc += findXmas(rownum, colnum, -1, -1);
	}

	return acc;

}, 0), 0); 

const x_masCount = (() => {
	let count = 0;
	for (let i = 1; i < searchgrid.length - 1; i++) {
		for (let j = 1; j < searchgrid[0].length - 1; j++) {
			if (searchgrid[i][j] === 'A') {
				// Check both diagonals from this A.
				const diag1 = [searchgrid[i-1][j-1], searchgrid[i+1][j+1]];
				const diag2 = [searchgrid[i+1][j-1], searchgrid[i-1][j+1]];
				if (diag1.includes('M') && diag1.includes('S') && diag2.includes('M') && diag2.includes('S')) {
					count++;
				}
			}
		}
	}
	return count;
})();


console.log(figlet.textSync("Day 4"));
console.log("Number of XMAS: " + xmasCount);
console.log("Number of X-MAS: " + x_masCount);
