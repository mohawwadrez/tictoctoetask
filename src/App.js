import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./App.scss";
export const APP_VERSION = process.env.REACT_APP_VERSION;

const Square = (props) => {
  return (
    <button
      data-btnName={props.value}
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const intialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

const Game = () => {
  const [state, setState] = React.useState(intialState);
  const { history, stepNumber, xIsNext } = state;
  const [isShow, setisShow] = useState(false);
  const handleClick = (i) => {
    const history = state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setState((prevState) => ({
      prevState,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  };

  const jumpTo = (step) => {
    setState((prevState) => ({
      ...prevState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));
  };

  const current = history[stepNumber];
  const winner = calWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move " + move : "Start Again";
    return (
      <li key={move}>
        <button
          className="movesBtn"
          onClick={() => {
            setisShow(false);
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  const status = winner
    ? "Winner : " + winner
    : !current.squares.includes(null) && !winner
    ? "Game Draw"
    : "Next player : " + (state.xIsNext ? "X" : "O");

  return (
    <div className="game">
      {isShow ? (
        <div className="history">
          <button className="close" onClick={() => setisShow(false)}>
            Close History
          </button>
          {moves}
        </div>
      ) : null}
      <div className="game-info">
        <div className="status"></div>
      </div>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button className="historybtn" onClick={() => setisShow(true)}>
          History
        </button>
      </div>
    </div>
  );
};

const calWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
      <footer>Version: {APP_VERSION}</footer>
    </div>
  );
};

export default App;
