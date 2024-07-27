import React, { useState, useEffect } from 'react';
let turn=false;

function BoardBox({val}){ //When you want to use a JavaScript expression or a variable inside JSX, you need to wrap it in curly braces.
    //Destructuring Props:In the BoardBox function component, the props are being destructured. val is extracted from the props object. This is similar to how you might destructure an object in JavaScript.
    const[boxVal, SetBoxVal]= useState(' ');
    function ExecuteTurn(){
        if(turn && boxVal==' '){
            SetBoxVal('X');
            turn= (!turn);
        }else if(!turn && boxVal==' '){
            SetBoxVal('O');
            turn= (!turn);
        }
    }

    return <button type='button' onClick={ExecuteTurn} style={{height:17+'px', width:20+'px'}}>{boxVal}</button>
}
export function TicTacToe() {
    return (
        <div>
            <div>
                <BoardBox />
                <BoardBox/>
                <BoardBox/>
            </div>
            <div>
                <BoardBox/>
                <BoardBox/>
                <BoardBox/>
            </div>
            <div>
                <BoardBox/>
                <BoardBox/>
                <BoardBox/>
            </div>
        </div>
    );
}
