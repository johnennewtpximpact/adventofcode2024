import { readFileSync } from 'fs';
import { defragAndCheck, defragAndCheck2 } from './9modules';
const figlet = require("figlet");

const text = readFileSync('./src/day9.txt', 'utf-8');
const answer1 = defragAndCheck(text);
const answer2 = defragAndCheck2(text);
console.log(figlet.textSync("Day 9"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);
