const {equal,deepEqual} = require('assert');
const {generateBoard,validateNeighbours,getLifeCount,initialiseBoard,getNeighbours,destiny,generateInstances} = require('../src/lib.js');

describe('Initialise Board',function(){
  let input = [ [ '', '', '', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '', '', '', '' ] ]

  let expectedOutput = [ [ '*', '', '', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '', '', "*" , '' ],
    [ '', '', "*" , '', '' ],
    [ '', '', '', '',"*"] ]

  it('should return the board after initialising the states ',function(){
    deepEqual(initialiseBoard([['',''],['','']],[[0,0]],)[['*',''],['','']]); 
    deepEqual(initialiseBoard(input,[[0,0],[4,4],[3,2],[2,3]]),expectedOutput);
  });
});

describe('Get Neighbours',function(){
  it('should return index of all possible border touching elements around given index',function(){
    let expectedOutput = [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]
    deepEqual(getNeighbours([1,1]),expectedOutput);
  })
})

describe('destiny',function(){
  it('should return " " for a living state with underpopulation',function(){
    equal(destiny(1,"living")," ");
  })
  it('should return " " for a living state with overpopulation',function(){
    equal(destiny(4,"living")," ");
  })
  it('should return "*" for a living state with appropriate living neighbours',function(){
    equal(destiny(2,"living"),"*");
    equal(destiny(3,"living"),"*");
  })
  it('should return " " for a dead state with overpopulation',function(){
    equal(destiny(4,"dead")," ");
  })
  it('should return " " for a dead state with underpopulation',function(){
    equal(destiny(2,"dead")," ");
  })
  it('should return "*" for a dead state with appropriate living neighbours',function(){
    equal(destiny(2,"dead")," ");
  })
})


describe('generateBoard',function(){
  it('should return a rectangle board in array for given length and breadth',function(){
    expectedOutput = [ [ ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ' ] ]
    deepEqual(generateBoard(5,5),expectedOutput)
  })
  it('should return a rectangle board in array for given length and breadth',function(){
    expectedOutput = [ [' ', ' '],
      [ ' ', ' ' ],
      [ ' ', ' ' ]]
    deepEqual(generateBoard(2,3),expectedOutput)
  })
  it('should return a rectangle board in array for given length and breadth',function(){
    expectedOutput = [ [' ', ' ',' '],
      [ ' ', ' ',' ' ]]
     
    deepEqual(generateBoard(3,2),expectedOutput)
  })


})

describe('Validate Neighboours',function(){
  it('should return the valid neighbours if given an array of array of all possible neighbours',function(){
    deepEqual(validateNeighbours([[0,0],[0,1],[0,-1],[-1,1],[1,1],[1,0],[-1,0],[1,-1],[-1,-1]],2,2),[[0,0],[0,1],[1,1],[1,0]]); 
    deepEqual(validateNeighbours([[0,0],[0,1],[0,-1],[-1,1],[1,1],[1,0],[-1,0],[1,3],[-1,-1]],2,3),[[0,0],[0,1],[1,1],[1,0]]); 
  });
});

describe('getLifeCount',function(){
  it('should return the life count when giving an array of valid neighbours',function(){
    input= [ [ '', '*', '', '', '' ],
      [ '', '', '*', '', '' ],
      [ '', '', '', '*', '' ],
      [ '', '', '', '', '' ],
      [ '', '', '', '', '*' ] ]
    deepEqual(getLifeCount(input,[[0,1],[0,2],[1,2],[1,3],[2,3]]),3); 
  });
});

describe('Generate Instances',function(){
  it('should return the state of the board at a particular generation',function(){
    deepEqual(generateInstances(2,2,[[0,0]],1),[[" "," "],[" "," "]]); 
    deepEqual(generateInstances(2,2,[[0,0],[1,1]],1),[[" "," "],[" "," "]]); 
    deepEqual(generateInstances(2,2,[[0,0],[1,1]],10),[[" "," "],[" "," "]]); 
    deepEqual(generateInstances(2,3,[[0,0],[1,1],[0,1]],1),[["*","*"],["*","*"],[" "," "]]); 
    deepEqual(generateInstances(3,2,[[0,0],[1,1],[0,1],[1,0]],1),[["*","*"," "],["*","*"," "]]); 
    deepEqual(generateInstances(3,3,[[0,0],[1,0],[2,0]],0),[["*"," "," "],["*"," "," "],["*"," "," "]]);
    deepEqual(generateInstances(3,3,[],1),[[" "," "," "],[" "," "," "],[" "," "," "]]);
    deepEqual(generateInstances(3,3,[[0,0],[1,0],[2,0]],1),[[" "," "," "],["*","*"," "],[" "," "," "]]);
  });
});


