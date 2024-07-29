import React, { useState, useEffect } from 'react';
let turn=false;

function BoardBox({ val, onBoxClick }) {
  return (
    <button className="box" onClick={onBoxClick}> {val}</button>
  );
}

function checkWinner(boxes){
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
    //const mutableBoxes = boxes.slice(); //As 2D so slice Will not Deep Copy But we need independent copies
    const mutableBoxes = boxes.map(boxRow => [...boxRow]);

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
    console.log("PRINTING TRACE FROM Tic:");
    console.log(trace);
    console.log("Current Trace MOVES: "+ currentTraceMove);
    const [currentTraceMove, setCurrentTraceMove] = useState(0);

    // const currentBoxes = trace[trace.length - 1];
    //modify the Game component to render the currently selected move, instead of always rendering the final move:
    const currentBoxes = trace[currentTraceMove];

    function handlePlay(futureBoxes){
      // setTrace([...trace, futureBoxes]);
      //$$If you “go back in time” and then make a new move from that point, you only want to keep the history up to that point. Instead of adding nextSquares after all items (... spread syntax) in history, you’ll add it after all items in history.slice(0, currentMove + 1) so that you’re only keeping that portion of the old history.
      //$$$ And as when "jumpTo" is called "handlePlay" IS NOT called thus when jumped u will still be able to see future moves and can jump to future but as soon as u to play to let say at move32 and u have #6 moves all next moves from #2 got disapear
      //const updatedTrace= [...trace.slice(0,currentTraceMove+1), futureBoxes]; //To create a deep copy of a 3D array that isn't associated with the original array, using the spread operator alone isn't sufficient, as it only creates a shallow copy of the array
      const deepCopy = (arr) => {
        return arr.map(innerArr => 
          innerArr.map(innerInnerArr => 
            innerInnerArr.slice()
          )
        );
      };
      console.log("PRINTING TRACE FROM HANDLE PLAY---:");
      console.log(trace);
      console.log(futureBoxes);
      const updatedTrace = [...deepCopy(trace.slice(0, currentTraceMove + 1)), futureBoxes];
      setTrace(updatedTrace);
      setCurrentTraceMove(updatedTrace.length-1);
      turn= (!turn);
    }

    function jumpTo(nextMove){
      setCurrentTraceMove(nextMove);
      console.log("Current Trace NEXT MOVES: "+ nextMove);
      turn= (nextMove % 2 === 0)? (false): (true);// true -> x,  flase-> O
      console.log("Curent TRACK:")
      console.log(trace)
      console.log(nextMove)
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