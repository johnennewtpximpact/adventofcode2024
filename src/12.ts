import { readFileSync } from 'fs';
import { getPrice, getDiscountPrice } from './12modules';
const figlet = require("figlet");

const text = readFileSync('./src/day12.txt', 'utf-8');
const plot = text.trim().split('\n').map(row => row.trim().split(''));

const answer1 = getPrice(plot);
const answer2 = getDiscountPrice(plot);
console.log(figlet.textSync("Day 10"));
console.log("Answer 1: " + answer1);
console.log("Answer 2: " + answer2);
