import { readFileSync } from 'fs';
import { generateEquations, sumOfEquations, sumOfEquationsWithConcat } from './7modules';
const figlet = require("figlet");

const text = readFileSync('./src/day7.txt', 'utf-8');
const equations = generateEquations(text);
const answer1 = sumOfEquations(equations);
const answer2 = sumOfEquationsWithConcat(equations);


console.log(figlet.textSync("Day 7"));
console.log("Visited points: " + answer1);
console.log("Visited points: " + answer2);
