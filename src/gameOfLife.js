let {generateInstances} = require("./lib.js");
const generateIsBetween = function(lowerLimit,upperLimit){
  return function(candidate){
    return candidate>lowerLimit && candidate<upperLimit;
  }
}

const boundMapper = function(bounds,[x,y]){
  return [x-bounds.topLeft[0],y-bounds.topLeft[1]];
}

const reverseBoundMapper = function(bounds,[x,y]){
  return [x+bounds.topLeft[0],y+bounds.topLeft[1]];
}

const initialiseState = function(currentState,bounds){
  let mapper = boundMapper.bind(null,bounds);
  return currentState.map(mapper);
}

const validateStates = function(states,length,breadth){
  let isWithinLength = generateIsBetween(-1,length);
  let isWithinBreadth = generateIsBetween(-1,breadth);
  let validStates = states.filter(([x,y])=>isWithinBreadth(x) && isWithinLength(y));
  return validStates;
}

const parser =  function(currentGeneration,bounds){
  let length = bounds.bottomRight[1]-bounds.topLeft[1] +1;
  let breadth = bounds.bottomRight[0] - bounds.topLeft[0] +1;
  let allStates = initialiseState(currentGeneration,bounds);
  let validStates = validateStates(allStates,length,breadth);
  return {length:length,breadth:breadth,states:validStates}
}

const deParser = function(board){
  let result = [];
  for(let row=0; row<board.length; row++){
    for(let col=0; col<board[0].length; col++){
      if(board[row][col] == "*")
        result.push([row,col]);
   }
  }
  return result;
}

const nextGeneration = function(currGeneration,bounds) {
  let {length,breadth,states} = parser(currGeneration,bounds);
  let nextBoard = generateInstances(length,breadth,states,1);
  let nextState = deParser(nextBoard);
  let mapper = reverseBoundMapper.bind(null,bounds);
  return nextState.map(mapper);
}
module.exports = { nextGeneration };
