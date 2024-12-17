import { readFileSync } from 'fs';
import { getTrailHeads } from './10modules';
const figlet = require("figlet");

const text = readFileSync('./src/day10.txt', 'utf-8');
const answer1 = getTrailHeads(text);
const answer2 = getTrailHeads(text, true);
console.log(figlet.textSync("Day 10"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);
