import React, { useEffect , useState } from 'react';
import './TicTacToe.css';

const Square = ({value, onClick, idx}:any) => {
  return (
    <button className="square"
            onClick={onClick}
            >
      {value === null ? '' : (value % 2 === 1 ? 'O' : 'X')}
    </button>
  );
}
const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [value, setValue] = useState(0);

  const handleClick = (i:number) => {
    if (calculateWinner(state) !== null || state[i] !== null) {
      return;
    }
    const _state = state.slice();
    _state[i] = value % 2;
    setValue(value + 1);
    setState(_state);
  }

  const handleReset = () => {
    setState(Array(9).fill(null));
    setValue(0);
    winner = null;
  }

  let status = "";
  let winner = calculateWinner(state);
  if (winner !== null) {
    status = `Winner: ${winner % 2 === 1 ? 'O' : 'X'}`;
  } else if (value === 9){
    status = `Tie: Nobody wins`;
  } else {
    status = `Next player: ${value % 2 === 1 ? 'O' : 'X'}`;
  }

  return (
    <div onClick={ (winner !== null || value === 9) ? handleReset : () => {} }>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={state[0]} onClick={()=>handleClick(0)}></Square>
        <Square value={state[1]} onClick={()=>handleClick(1)}></Square>
        <Square value={state[2]} onClick={()=>handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={state[3]} onClick={()=>handleClick(3)}></Square>
        <Square value={state[4]} onClick={()=>handleClick(4)}></Square>
        <Square value={state[5]} onClick={()=>handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={state[6]} onClick={()=>handleClick(6)}></Square>
        <Square value={state[7]} onClick={()=>handleClick(7)}></Square>
        <Square value={state[8]} onClick={()=>handleClick(8)}></Square>
      </div>
    </div>
  )
}

const TicTacToe = () => {
  useEffect(() => {

  })
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
}

const calculateWinner = (squares:any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default TicTacToe;
