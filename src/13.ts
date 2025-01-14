import { readFileSync } from 'fs';
import { solve, solve2 } from './13modules';
const figlet = require("figlet");

const text = readFileSync('./src/day13.txt', 'utf-8');

const answer1 = solve(text);
const answer2 = solve2(text);
console.log(figlet.textSync("Day 13"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);

