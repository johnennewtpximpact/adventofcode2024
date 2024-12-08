import { readFileSync } from 'fs';
import { countSuccessfulObstructions, runWalkWithLoopCheck, runWalk, countVisits, getStartPos, bit_test, bit_set, rotateDir, getToggle, UP, DOWN, LEFT, RIGHT } from './6modules';
const figlet = require("figlet");

const text = readFileSync('./src/day6.txt', 'utf-8');
const searchgrid = text.split('\n').map(line => line.split(''));
const startPos = getStartPos(searchgrid);
const visitedGrid = runWalk(searchgrid, startPos);

const answer1 = countVisits(visitedGrid);
const answer2 = countSuccessfulObstructions(searchgrid, visitedGrid, startPos);

console.log(figlet.textSync("Day 6"));
console.log("Visited points: " + answer1);
console.log("Obsticle locations: " + answer2);
