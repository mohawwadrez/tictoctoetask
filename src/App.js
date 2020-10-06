import React, { useEffect, useState } from "react";
import packageJson from "../package.json";
import { Col, Row } from "antd";
import Icon from "./assets/icon";
import Reset from "./assets/reset";
import "./App.scss";

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

  const refreshPage = () => {
    window.location.reload(false);
  };

  const [x, setx] = useState(localStorage.getItem("x"));
  const [o, seto] = useState(localStorage.getItem("o"));

  useEffect(() => {
  
    if (winner === "X") {
      localStorage.setItem(
        "x",
        localStorage.getItem("x") === undefined
          ? 1
          : Number(localStorage.getItem("x")) + 1
      );
      seto(
        localStorage.getItem("x") === undefined
          ? 1
          : Number(localStorage.getItem("x"))
      );
    }
  }, [winner]);
  useEffect(() => {}, [x]);
  useEffect(() => {}, [o]);
  useEffect(() => {
  
    if (winner === "O") {
      localStorage.setItem(
        "o",
        localStorage.getItem("o") === undefined
          ? 1
          : Number(localStorage.getItem("o")) + 1
      );
      seto(
        localStorage.getItem("o") === undefined
          ? 1
          : Number(localStorage.getItem("o"))
      );
    }
  }, [winner]);

  const deleteitem = () => {
    localStorage.setItem("x", 0);
    localStorage.setItem("o", 0);
    setx(0);
    seto(0);
  };

  useEffect(() => {
    setx(localStorage.getItem("x"));
  }, [x]);
  useEffect(() => {
    seto(localStorage.getItem("o"));
  }, [o]);

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

      <div className="win-status">
        <div className="x">
          X <br></br>
          <div className="text-win-x">{x} win</div>
        </div>
        <div className="o">
          O <br></br>
          <div className="text-win-o">{o} win</div>
        </div>
      </div>

      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="winner">
        <div className="status">{status}</div>
      </div>

      <div className="game-info">
        <button className="game-history" onClick={() => setisShow(true)}>
          <Icon></Icon>
        </button>
        <button className="start-again" onClick={() => refreshPage()}>
          <div>Play again</div>
        </button>
        <button className="game-reset" onClick={() => deleteitem()}>
          <Reset></Reset>
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
console.log(packageJson.version); // "1.0.0"
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
      <div className="App-footer">
        <div>Version:{packageJson.version}</div>
      </div>
    </div>
  );
};

export default App;
