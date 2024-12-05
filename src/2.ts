import { readFileSync } from 'fs';
const figlet = require("figlet");

const text = readFileSync('./src/day2.txt', 'utf-8');
const reports = text.split("\n");

let isIncreasing = (levels: number[]): boolean => {
	return levels.reduce((acc, curr, index) => {
		return index > 0 ? acc && curr > levels[index - 1] : true;
	}, true);
}

let isDecreasing = (levels: number[]): boolean => {
	return levels.reduce((acc, curr, index) => {
		return index > 0 ? acc && curr < levels[index - 1] : true;
	}, true);
}

let isNotGreatlyVarying = (levels: number[]): boolean => {
	return levels.reduce((acc, curr, index) => {
		return index < 1 || acc && Math.abs(curr - levels[index - 1]) < 4;
	}, true);
}

let checkReport = (levels: number[]): boolean => {
	// Check all increasing.
	let increasing = isIncreasing(levels);

	// Check all decreasing.
	let decreasing = isDecreasing(levels);

	if (!increasing && !decreasing) {
		return false;
	}

	// Check differentials.
	return isNotGreatlyVarying(levels);
}

let checkReports = (reports: string[], allowDamped: boolean): number => reports.reduce((acc, report) => {
	let levels: number[] = report.split(" ").flatMap((s) => parseFloat(s));

	if (levels.length < 2) {
		// Ignore empty rows.
		return acc;
	}

	if (checkReport(levels)) {
		// The basic report is safe, move on.
		return acc + 1;
	}

	if (!allowDamped) {
		// Carry on if we're not checking damped levels.
		return acc;
	}

	return acc + levels.reduce((acc, curr, index) => {
		if (acc > 0) return 1; // Only one damped level needed for success.
		let dampedLevel = levels.toSpliced(index, 1); // Note, toSpliced needs Node 20 and above.
		return checkReport(dampedLevel) ? 1 : 0; // Check the report with this value removed.
	}, 0);
}, 0);

console.log(figlet.textSync("Day 2"));
console.log("Total reports: " + reports.length);
console.log("Safe reports: " + checkReports(reports, false));
console.log("Safe reports with the problem dampner: " + checkReports(reports, true));
