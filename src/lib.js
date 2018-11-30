const generateBoard = function(length,breadth){
  return new Array(breadth).fill().map(x=>new Array(length).fill().map(x=>" "));
}

const generateIsBetween = function(lowerLimit,upperLimit){
  return function(candidate){
    return candidate>lowerLimit && candidate<upperLimit;
  }
}

const validateNeighbours = function(neighbours,length,breadth){
  let isWithinLength = generateIsBetween(-1,length);
  let isWithinBreadth = generateIsBetween(-1,breadth);
  let validNeighbours = neighbours.filter(([x,y])=>isWithinBreadth(x) && isWithinLength(y));
  return validNeighbours;
}

const validateInputs = function(inputs,length,breadth){
  let isWithinLength = generateIsBetween(-1,length);
  let isWithinBreadth = generateIsBetween(-1,breadth);
  let validInputs = inputs.filter(([x,y])=>isWithinBreadth(x) && isWithinLength(y));
  return validInputs;
}


const getLifeCount = function(board,validNeighbours){
  let lifeCount = 0;
  const isNeighbourValid = function(neighbour){
    return board[neighbour[0]][neighbour[1]] == "*";
  }

  let lifeBoard = validNeighbours.filter(isNeighbourValid);
  return lifeBoard.length;
}

const initialiseBoard = function(board,initialStates){
  let grid = board.slice("");

  for(let index=0; index<initialStates.length; index++){ 
    grid[initialStates[index][0]][initialStates[index][1]] = "*";
  }
  return grid;
}

const getNeighbours = function([rowIndex,columnIndex]){
  let points = [-1, 0, 1];
  let neighbours = [];
  points.forEach((x)=> {
    points.forEach((y) =>{
      if(x!=0 ||  y!=0)
        neighbours.push([rowIndex+x, columnIndex+y]);
    });
  });

  return neighbours;
}
const destiny = function(lifeCount,state){
  let states = { living : [" "," ","*","*"," "," "," "," "," "], 
    dead : [" "," "," ","*"," "," "," "," "," "]}

  return states[state][lifeCount];
}

const makeInstance = function(length,breadth,[row,col],board){
  let resultBoard = board.map(x=>x.slice());
  let neighbours = getNeighbours([row,col]);
  neighbours = validateNeighbours(neighbours,length,breadth);
  let aliveNeighboursCount = getLifeCount(resultBoard,neighbours);

  let state = "dead";
  if(resultBoard[row][col] == "*")
    state = "living";

 return destiny(aliveNeighboursCount,state);
}

const cycleGenerator = function(length,breadth,board){
  let currentBoard = board.map(x=>x.slice());
  for(let row=0; row<breadth; row++){
     for(let column=0; column<length; column++){
      currentBoard[row][column] = makeInstance(length,breadth,[row,column],board);
    }
  }
  return currentBoard;
}

const generateInstances = function(length,breadth,initialStates,generation){
  let board = generateBoard(length,breadth);
  board = initialiseBoard(board,initialStates);
  let resultBoard = board.map(x=>x.slice());

  for(let genCount=0; genCount<generation; genCount++){
    resultBoard = cycleGenerator(length,breadth,resultBoard);
  }
  return resultBoard;
}

const addBoundary = function(board,length){
  let upperBoundary = new Array(length).fill('----');
  upperBoundary.pop(); upperBoundary.push('---');
  upperBoundary = upperBoundary.join('');
  upperBoundary = '|'+upperBoundary+'|';

  let lowerBoundary = new Array(length).fill('----');
  lowerBoundary.pop(); lowerBoundary.push('---');
  lowerBoundary = lowerBoundary.join(''); 
  lowerBoundary = '|'+lowerBoundary+'|';

  board.push(lowerBoundary); board.unshift(upperBoundary);
  return board;
}

const makeBoard = function(board){
  let finalBoard = board.map(x=>x.join("   "));
  finalBoard = finalBoard.map(x=>'| '+x+' |');
  finalBoard = addBoundary(finalBoard,board[0].length);
  return finalBoard ;
}

const handleStates = function(states,width,height){
let initialStates = states.split(' ').map(x=>x.split(',').map(y=>+y));
return validateInputs(initialStates,width,height);
}

const generateInitialBoard = function(length,breadth,initialStates){
  let board = generateBoard(length,breadth);
  return initialiseBoard(board,initialStates);
}

module.exports = {generateBoard,validateNeighbours,getLifeCount,
  initialiseBoard,getNeighbours,destiny,generateInstances,
  makeBoard,validateInputs,handleStates,cycleGenerator,
  generateInitialBoard}
