import React, { useState, useEffect } from 'react';
let turn=false;

function BoardBox({ val, onBoxClick }) {
  return (
    <button className="box" onClick={onBoxClick}> {val}</button>
  );
}

function checkWinner(boxes){
    console.log('player cam in check is: '+turn)
    console.log('Boxes in check:')
    console.log(boxes)
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



function GameBoard({boxes, onPlay}) {
//   const [boxes, setBoxes] = useState(Array(9).fill(null));
  // const [boxes, setBoxes] = useState([
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ]);
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
   
    // turn= (!turn);
    // setBoxes(mutableBoxes);
    onPlay(mutableBoxes);
  }

  if(checkWinner(boxes))
    playersStatus=`Player ${checkWinner(boxes)} WINS!`;
  else
    playersStatus=`Next turn is of player: ${(turn)? 'X':'O'}`;
  
  return (
    <>
      <p>{playersStatus}</p>

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

// function CreateMoveButtons(trace){
//   console('In creat list');
//   console.log(trace);
//   function jumpTo(){

//   }
//     const moves = trace.map((boxes, i)=>{
//       let description;
//       if (i > 0) {
//         description = 'Go to move #' + i;
//       } else {
//         description = 'Go to game start';
//       }
//       return (<li>
//         <button onClick={()=> jumpTo(i)}>{description}</button> 
//         </li>);
//     }
//   );
//   return moves;
// }

// function CreateMoveButtons(traceLength){
//   console('In creat list');
//   console.log(traceLength);
//   function jumpTo(){

//   }
//     let moves=[];
//      for(let i=0;i<traceLength;i++){
//       let description;
//       if (i > 0) {
//         description = 'Go to move #' + i;
//       } else {
//         description = 'Go to game start';
//       }
//       moves.push(<li>
//         <button onClick={()=> jumpTo(i)}>{description}</button> 
//         </li>);
//     }
//   return moves;
// }

export function TicTacToe() {
    const [trace, setTrace] = useState([
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]
    ]);
    // const [trace, setTrace] = useState([Array(9).fill(null)]);
    const currentBoxes = trace[trace.length - 1];

    function handlePlay(futureBoxes){
      setTrace([...trace, futureBoxes]);
      turn= (!turn);
    }

    function jumpTo(){

    }
    const moves = trace.map((boxes, i)=>{
        let description;
        if (i > 0) {
          description = 'Go to move #' + i;
        } else {
          description = 'Go to game start';
        }
        return (<li key={i}>
          <button onClick={()=> jumpTo(i)}>{description}</button> 
          </li>);
      }
    );

    console.log("Cur is: ")
    console.log(currentBoxes)
    return(
      <div>
        <GameBoard onPlay={handlePlay} boxes={currentBoxes}/>
        <ol>
          {/* <CreateMoveButtons trace={trace} /> */}
          {/* <CreateMoveButtons traceLength={trace.length} /> */}
          {moves}
        </ol>
      </div>
    );
  }