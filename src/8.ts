import { readFileSync } from 'fs';
import { countAntiNodes, countResonantAntiNodes } from './8modules';
const figlet = require("figlet");

const text = readFileSync('./src/day8.txt', 'utf-8');
const answer1 = countAntiNodes(text, 49, 49);
const answer2 = countResonantAntiNodes(text, 49, 49);

console.log(figlet.textSync("Day 8"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);
