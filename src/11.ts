import { readFileSync } from 'fs';
import { getSizeAfterBlinks } from './11modules';
const figlet = require("figlet");

const text = '2 54 992917 5270417 2514 28561 0 990';
getSizeAfterBlinks(text, 75).then(answer => console.log(answer));
//const answer2 = await getSizeAfterBlinks(text, 75);
//console.log(figlet.textSync("Day 11"));
//console.log("Answer 1: " + answer1);
//console.log("Answer 2: " + answer2);
