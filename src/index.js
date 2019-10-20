import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
        className={this.props.isGreen ? "green square" : "square"}
        onClick={this.props.onClick}>
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    let isGreen = this.props.greenSquare == i;
    return <Square
      isGreen={isGreen}
      onClick={() => this.props.onClick(isGreen)}
    />;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenSquare: -1,
      gameEnded: false,
      startTime: 0,
      endTime: 0
    };
  }

  startGame() {
    this.setState({
      gameEnded: false
    })
    let delay = Math.floor(Math.random() * (this.props.maxTime - this.props.minTime)) + this.props.minTime;
    this.timer = setTimeout(() => this.startTiming()
      , delay)
  }

  startTiming() {
    this.setState({
      startTime: Date.now(),
      greenSquare: Math.floor(Math.random() * (9))
    })
  }

  endGame(isGreen) {
    if (!isGreen) return;
    this.setState({
      endTime: Date.now(),
      greenSquare: -1,
      gameEnded: true
    })
  }

  render() {
    const directions = 'Test your React-ion!';
    const buttonText = "Start"
    const gameResult = this.state.gameEnded ? "You took " + (this.state.endTime - this.state.startTime) + " ms!" : "Click the green square when it appears!"
    return (
      <div className="game">
        <div className="game-board">
          <Board
            greenSquare={this.state.greenSquare}
            onClick={isGreen => this.endGame(isGreen)}
          />
        </div>
        <div className="game-info">
          <div>{directions}</div>
          <h4>{gameResult}</h4>
          <button onClick={() => this.startGame()} className="start">{buttonText}</button>
        </div>
      </div>
    );
  }
}

// ========================================
const minTime = 3000;
const maxTime = 6000;

ReactDOM.render(
  <Game
    minTime={minTime}
    maxTime={maxTime}
  />,
  document.getElementById('root')
);
