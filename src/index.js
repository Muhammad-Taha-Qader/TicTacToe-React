// import React from 'react';
// import ReactDOM from 'react-dom';
// import { StopWatch } from './watch';
// const App = () => (
//   <div>
//     <h1>Hello, React!</h1>
//     {StopWatch()}
//   </div>
// );

// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import { TicTacToe } from './TicTacToe';

const App = () => (
  <div>
    <h1>TicTacToe!</h1>
    <TicTacToe />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
