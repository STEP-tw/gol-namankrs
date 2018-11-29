let {generateInstances} = require("./lib.js");
const generateIsBetween = function(lowerLimit,upperLimit){
  return function(candidate){
    return candidate>lowerLimit && candidate<upperLimit;
  }
}

const boundMapper = function(bounds,[x,y]){
  a = x-bounds.topLeft[0];
  b = y-bounds.topLeft[1];
  return [a,b];
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
 let length = bounds.bottomRight[1]-bounds.topLeft[1];
 let breadth = bounds.bottomRight[0] - bounds.topLeft[0];
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
  let nextState = generateInstances(length,breadth,states,1);
  return deParser(nextState);
}

module.exports = { nextGeneration };
