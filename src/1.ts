import { readFileSync } from 'fs';
const figlet = require("figlet");

const text = readFileSync('./src/list.txt', 'utf-8');
const textByLine = text.split("\n");

let extractor = (line: string, index: number) => {
  const values = line.split("   ");
  if (values.length === 2) {
	const num = parseFloat(values[index]); 
  	if (!isNaN(num)) {
		return num;
  	}
  }
  return 0;
}

let counter = (list: number[], val: number) => {
	return list.reduce((acc, curr) => {
		return curr === val ? acc + 1 : acc;
	}, 0);
}

let list0: number[] = textByLine.flatMap((line) => {
  let val = extractor(line, 0);
  return val > 0 ? val : [];
}, []).sort((a, b) => a - b);

let list1: number[] = textByLine.flatMap((line) => {
  let val = extractor(line, 1);
  return val > 0 ? val : [];
}, []).sort((a, b) => a - b);

if (list0.length !== list1.length) {
  throw Error("lists are different lengths");
}

let distance = list0.reduce((acc, curr, index) => {
	return acc + (curr > list1[index] ? curr - list1[index] : list1[index] - curr);
}, 0);

let similarity = list0.reduce((acc, curr, index) => {
	return acc + (curr * counter(list1, curr));
}, 0);


console.log(figlet.textSync("Day 1 - it begins"));
console.log("Distance: " + distance);
console.log("Similarity: " + similarity);
