const readline = require('readLine-sync');
const {generateInstances,makeBoard,validateInputs} = require('./src/lib.js');
let height = +readline.question("Enter the number of rows of the board : ");
let width = +readline.question("Enter the number of columns of the board : ");
let initialStates = readline.question("Enter the initial states seperated by a space e.g: 0,0 1,2 ... : ");
initialStates = initialStates .split(' ').map(x=>x.split(',').map(y=>+y));
let validInitialStates = validateInputs(initialStates,width,height);
let generation = +readline.question("Enter the generation : ");
let resultBoard = (generateInstances(width,height,validInitialStates,generation)); 
console.log(makeBoard(resultBoard));;

