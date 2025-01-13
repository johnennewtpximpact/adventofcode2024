import { readFileSync } from 'fs';
import { countStones } from './11modules';
const figlet = require("figlet");

const text = '2 54 992917 5270417 2514 28561 0 990';
const answer1 = countStones(text, 25);
const answer2 = countStones(text, 75);
console.log(figlet.textSync("Day 11"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);
