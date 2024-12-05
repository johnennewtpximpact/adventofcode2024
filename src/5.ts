import { readFileSync } from 'fs';
const figlet = require("figlet");

const text = readFileSync('./src/day5.txt', 'utf-8');

const orderRules = text.split('\n').map(line => {
	const rule = line.split('|');
	if (rule.length !== 2) return [];
	return [parseInt(rule[0]), parseInt(rule[1])];	
}).filter(s => Array.isArray(s) && s.length === 2);

const books = text.split('\n').map(line => {
	const book = line.split(',');
	if (book.length <= 2) return [];
	return book.map(s => parseInt(s));
}).filter(s => Array.isArray(s) && s.length > 2);

const bookPassesRule = (book: number[], rule: number[]): boolean => {
	const indexOfFirst = book.indexOf(rule[0]);
	const indexOfSecond = book.indexOf(rule[1]);
	if (indexOfFirst < 0 || indexOfSecond < 0) return true;
	return indexOfFirst <= indexOfSecond;
}

const isCorrectOrder = (book: number[]) => orderRules.reduce((acc, rule) => {
	return acc && bookPassesRule(book, rule);
}, true);

const answer1 = books.reduce((acc, book) => {
	if (isCorrectOrder(book)) {
		return acc + book[(book.length - 1)/2]
	}
	return acc;	
}, 0);

const answer2 = books.reduce((acc, book) => {
	if (!isCorrectOrder(book)) {
		const fixedBook = book.sort((a, b) => {
			const rule = orderRules.flatMap(s => s.includes(a) && s.includes(b) ? s : []);
			if (rule.length !== 2) return 0; // There is no rule for this pair so leave the order alone.
			return (rule[0] === a) ? -1 : 1;
		});
		
		// Sanity check.
		if (!isCorrectOrder(fixedBook)) console.error('a book was not fixed!')

		return acc + fixedBook[(fixedBook.length - 1)/2]
	}
	return acc;	
}, 0);

console.log(figlet.textSync("Day 5"));
console.log("Sum of centre of correct books: " + answer1);
console.log("Sum of centre of corrected books: " + answer2);
