import React, { useState, useEffect } from 'react';

function BoardBox({val}){ //When you want to use a JavaScript expression or a variable inside JSX, you need to wrap it in curly braces.
    //Destructuring Props:In the BoardBox function component, the props are being destructured. val is extracted from the props object. This is similar to how you might destructure an object in JavaScript.
    const[boxVal, SetBoxVal]= useState(' ');
    console.log('In Box fun: '+val);
    function ExecuteTurn(){
        if(val){
            SetBoxVal('X');
            val= (!val);
        }else{
            SetBoxVal('O');
            val= (!val);
        }
    }

    return <button type='button' onClick={ExecuteTurn} style={{height:17+'px', width:20+'px'}}>{boxVal}</button>
}
export function TicTacToe() {
    let turn=false;
    return (
        <div>
            <div>
                <BoardBox val={turn} />
                {console.log('In main fun: '+turn)}
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
