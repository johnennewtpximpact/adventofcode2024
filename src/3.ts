import { readFileSync } from 'fs';
const figlet = require("figlet");

const text = readFileSync('./src/day3.txt', 'utf-8');

type muler = {
	val: number;
	pos: number;	
}

type doer = {
	pos: number;	
	active: boolean;
}

const isTypeMuler = (obj: any): obj is muler => {
  return "val" in obj && "pos" in obj;
}

const isTypeDoer = (obj: any): obj is doer => {
  return "pos" in obj && "active" in obj;
}

const mulextract = (input: string, includeDos: boolean): number => {
	const mulRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
	let match;
	let list: (muler|doer)[] = [];

	// Iterate through all mulers.
	while ((match = mulRegex.exec(input)) !== null) {
		const x = parseInt(match[1], 10);
		const y = parseInt(match[2], 10);

		list.push({
			pos: match.index,
			val: x * y
		});
	}

	if (includeDos) {
		const doRegex = /do\(\)/g;
		const dontRegex = /don\'t\(\)/g;

		// Iterate through all do().
		while ((match = doRegex.exec(input)) !== null) {
			list.push({
				pos: match.index,
				active: true
			});
		}

		// Iterate through all don't().
		while ((match = dontRegex.exec(input)) !== null) {
			list.push({
				pos: match.index,
				active: false
			});
		}
	}

	let active = true;

	return list
		.sort((a, b) => a.pos > b.pos ? 1 : -1)
		.reduce((acc, curr, index) => {
			if (isTypeMuler(curr) && active) {
				return acc + curr.val;	
			}
			
			if (isTypeDoer(curr)) {
				active = curr.active;
			}
		
			return acc;
		}, 0);

}

console.log(figlet.textSync("Day 3"));
console.log("Mul value: " + mulextract(text, false));
console.log("Mul with do value: " + mulextract(text, true));
