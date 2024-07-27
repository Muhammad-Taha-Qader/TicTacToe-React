// import React from 'react';
// import { useState } from 'react';
// import ReactDOM from 'react-dom';

// export function stopWatch(){
//     const [time,setTime]=useState(0);
//      setInterval(setTime(++time),1000);
//     return (
//         <p>00:00:{time}</p>
//     );
// }

import React, { useState, useEffect } from 'react';

export function TicTacToe() {

    return (
        <div>
            <div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
            </div>
            <div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
            </div>
            <div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
                <div><button type='button'>X</button></div>
            </div>
        </div>
    );
}
