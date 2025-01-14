import { readFileSync } from 'fs';
import { solve, printIteration } from './14modules';
const figlet = require("figlet");

const text = readFileSync('./src/day14.txt', 'utf-8');

const answer1 = solve(text, 100, 101, 103);
console.log(figlet.textSync("Day 14"));
console.log("Answer 1: " + answer1);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Start");
  for (let i = 7100; i <= 7132; i++) {
    console.log(printIteration(text, i));
    console.log(`iteration ${i}`);
    await sleep(10);
  }
}

main();
