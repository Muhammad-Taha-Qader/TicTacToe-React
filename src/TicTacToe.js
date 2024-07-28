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

export function TicTacToe() {
//   const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [boxes, setBoxes] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  function handleClick(i,j) {
    const mutableBoxes = boxes.slice();
    if(turn && mutableBoxes[i][j]===null){
        mutableBoxes[i][j] = 'X';
        turn= (!turn);
    }else if(!turn && mutableBoxes[i][j]===null){
        mutableBoxes[i][j] = 'O';
        turn= (!turn);
    }
    setBoxes(mutableBoxes);
  }

  return (
    <>
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