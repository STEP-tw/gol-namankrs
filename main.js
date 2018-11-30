const readline = require('readLine-sync');
const {initialiseBoard,cycleGenerator,generateBoard,
  makeBoard,generateInitialBoard,validateInputs,handleStates} = require('./src/lib.js');

const main = function(){
  let height = +readline.question("Enter the number of rows of the board : ");
  let width = +readline.question("Enter the number of columns of the board : ");
  let initialStates = readline.question("Enter the initial states seperated by a space e.g: 0,0 1,2 ... : ");
  let validStates = handleStates(initialStates,width,height);
  let generation = +readline.question("Enter the generation : ");
  let resultBoard = generateInitialBoard(width,height,validStates);
  resultBoard = cycleGenerator(width,height,resultBoard);
  console.log(makeBoard(resultBoard).join("\n"));
}

main();
