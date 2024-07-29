import React, { useState, useEffect } from 'react';
let turn=false;

// function BoardBox({val}){ //When you want to use a JavaScript expression or a variable inside JSX, you need to wrap it in curly braces.
//     //Destructuring Props:In the BoardBox function component, the props are being destructured. val is extracted from the props object. This is similar to how you might destructure an object in JavaScript.
//     const[boxVal, SetBoxVal]= useState(' ');
//     function ExecuteTurn(){
//         if(turn && boxVal==' '){
//             SetBoxVal('X');
//             turn= (!turn);
//         }else if(!turn && boxVal==' '){
//             SetBoxVal('O');
//             turn= (!turn);
//         }
//     }

//     return <button type='button' onClick={ExecuteTurn} style={{height:17+'px', width:20+'px'}}>{boxVal}</button>
// }
// export function TicTacToe() {
//     return (
//         <div>
//             <div>
//                 <BoardBox />
//                 <BoardBox/>
//                 <BoardBox/>
//             </div>
//             <div>
//                 <BoardBox/>
//                 <BoardBox/>
//                 <BoardBox/>
//             </div>
//             <div>
//                 <BoardBox/>
//                 <BoardBox/>
//                 <BoardBox/>
//             </div>
//         </div>
//     );
// }





function BoardBox({ val, onBoxClick }) {
  return (
    <button className="box" onClick={onBoxClick}> {val}</button>
  );
}

function checkWinner(boxes){
    console.log('player cam in check is: '+turn)
    let player = (!turn)? 'X':'O'; //has to check for previous turn cz turn change instatly right after player playes his turn and after that check is being called outside hadleClick
    let count=0;
    //horizontal check
    for(let i=0;i<boxes.length;i++){
        for(let j=0;j<boxes[i].length;j++){
            if(boxes[i][j]!==player) break;  else   count++
        }
        if(count===3){
            return player;
        }else
            count=0;
    }
    //vertical check
    for(let j=0;j<boxes[0].length;j++){
        for(let i=0;i<boxes.length;i++){
            if(boxes[i][j]!==player) break;  else   count++
        }
        if(count===3){
            return player;
        }else
            count=0;
    }
    //diagonal
    // if(boxes[0][0] === boxes[1][1] === boxes[2][2] === player)
    if(boxes[0][0] === player && boxes[1][1] === player && boxes[2][2] === player)
        return player;
    if(boxes[0][2] === player && boxes[1][1] === player && boxes[2][0] === player)
        return player;
    return null;
}

export function TicTacToe() {
    console.log('Turns val after rerentder:'+turn )
//   const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [boxes, setBoxes] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  let playersStatus;


  function handleClick(i,j) {
    const mutableBoxes = boxes.slice();
    if(mutableBoxes[i][j]!==null || checkWinner(boxes)!==null){
        return;
    }
    if(turn ){
        mutableBoxes[i][j] = 'X';
    }else{
        mutableBoxes[i][j] = 'O';
    }
    //$$If i update playersStatus value in here it will got reset to undefine when this componet reloads
    //but we don't want that, So either we have to use useState() or we have to move this code out 
    //direct in TicTacTok fun so that it always get re updated when re render happens
    turn= (!turn);
    setBoxes(mutableBoxes);
  }
  console.log(boxes)
  console.log("check returns: "+checkWinner(boxes))
  if(checkWinner(boxes))
    playersStatus=`Player ${checkWinner(boxes)} WINS!`;
  else
    playersStatus=`Next turn is of player: ${(turn)? 'X':'O'}`;
  console.log('Player staus is:' +playersStatus);
  
  return (
    <>
      <p>{playersStatus}</p>
    {console.log('Player staus in main: ' +playersStatus)}

      <div className="board-row">
        <BoardBox val={boxes[0][0]} onBoxClick={() => handleClick(0,0)} />
        <BoardBox val={boxes[0][1]} onBoxClick={() => handleClick(0,1)} />
        <BoardBox val={boxes[0][2]} onBoxClick={() => handleClick(0,2)} />
      </div>
      <div className="board-row">
        <BoardBox val={boxes[1][0]} onBoxClick={() => handleClick(1,0)} />
        <BoardBox val={boxes[1][1]} onBoxClick={() => handleClick(1,1)} />
        <BoardBox val={boxes[1][2]} onBoxClick={() => handleClick(1,2)} />
      </div>
      <div className="board-row">
        <BoardBox val={boxes[2][0]} onBoxClick={() => handleClick(2,0)} />
        <BoardBox val={boxes[2][1]} onBoxClick={() => handleClick(2,1)} />
        <BoardBox val={boxes[2][2]} onBoxClick={() => handleClick(2,2)} />
      </div>
    </>
  );
}