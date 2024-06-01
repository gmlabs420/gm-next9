"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faRotateLeft, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

const canvasWidth = 375;
const canvasHeight = 375;
const moduleWidth = 500;
const moduleHeight = 750;

const generateCompleteBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
        return false;
      }
    }
    return true;
  };

  const solveBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveBoard(board)) {
                return true;
              } else {
                board[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solveBoard(board);
  return board;
};

const createPlayableBoard = (completeBoard, difficulty) => {
  const playableBoard = completeBoard.map(row => row.slice());
  let squaresToRemove = Math.floor((81 * difficulty) / 100);
  while (squaresToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (playableBoard[row][col] !== 0) {
      playableBoard[row][col] = 0;
      squaresToRemove--;
    }
  }
  return playableBoard;
};

export default function SunriseSudoku() {
  const canvasRef = useRef(null);
  const [difficulty, setDifficulty] = useState(50);
  const [completeBoard, setCompleteBoard] = useState(generateCompleteBoard());
  const [initialBoard, setInitialBoard] = useState(createPlayableBoard(completeBoard, difficulty));
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [hoveredCell, setHoveredCell] = useState({ row: null, col: null });
  const [timer, setTimer] = useState(600);
  const [paused, setPaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([initialBoard]);

  const cellSize = 40;
  const gridSize = cellSize * 9;
  const offsetX = (canvasWidth - gridSize) / 2;
  const offsetY = (canvasHeight - gridSize) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      drawBoard(ctx);
    }
  }, [board, selectedCell, hoveredCell]);

  useEffect(() => {
    if (!paused && !gameOver) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) return prevTimer - 1;
          setGameOver(true);
          return 0;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [paused, gameOver]);

  useEffect(() => {
    const progressElement = document.querySelector('.sunrise-progress');
    if (progressElement) {
      progressElement.style.width = `${((600 - timer) / 600) * 100}%`;
    }
  }, [timer]);

  const drawBoard = (ctx) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 10;
    ctx.strokeRect(offsetX, offsetY, gridSize, gridSize);

    ctx.lineWidth = 3;
    for (let row = 0; row <= 9; row += 3) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + row * cellSize);
      ctx.lineTo(offsetX + gridSize, offsetY + row * cellSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(offsetX + row * cellSize, offsetY);
      ctx.lineTo(offsetX + row * cellSize, offsetY + gridSize);
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const x = col * cellSize + offsetX;
        const y = row * cellSize + offsetY;

        if ((row % 3 !== 0 || col % 3 !== 0) || row === 0 || col === 0) {
          ctx.strokeRect(x, y, cellSize, cellSize);
        }

        const value = board[row][col];
        if (value !== 0) {
          ctx.font = "20px Londrina";
          ctx.fillStyle = "#333";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(value, x + cellSize / 2, y + cellSize / 2);
        }
        if (hoveredCell.row === row && hoveredCell.col === col) {
          ctx.fillStyle = "rgba(255, 154, 75, 0.5)";
          ctx.fillRect(x, y, cellSize, cellSize);
        }
        if (selectedCell.row === row && selectedCell.col === col) {
          ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor((x - offsetX) / cellSize);
    const row = Math.floor((y - offsetY) / cellSize);
    setHoveredCell({ row, col });
  };

  const handleMouseClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor((x - offsetX) / cellSize);
    const row = Math.floor((y - offsetY) / cellSize);
    setSelectedCell({ row, col });
  };

  const handleKeyDown = (e) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      const value = parseInt(e.key);
      if (value >= 0 && value <= 9) {
        const newBoard = board.map((row, rIdx) => row.map((cell, cIdx) => {
          if (rIdx === selectedCell.row && cIdx === selectedCell.col) {
            if (initialBoard[rIdx][cIdx] === 0) {
              return value;
            }
          }
          return cell;
        }));
        setBoard(newBoard);
        setHistory((prevHistory) => [...prevHistory, newBoard]);
      }
    }
  };

  const handlePause = () => {
    setPaused(!paused);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setSelectedCell({ row: null, col: null });
    setTimer(600);
    setPaused(true);
    setGameOver(false);
    setHistory([initialBoard]);
  };

  const handleMagic = () => {
    if (history.length > 1) {
      setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, -1);
        setBoard(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  };

  const handleNewBoard = () => {
    const newCompleteBoard = generateCompleteBoard();
    const newPlayableBoard = createPlayableBoard(newCompleteBoard, difficulty);
    setCompleteBoard(newCompleteBoard);
    setInitialBoard(newPlayableBoard);
    setBoard(newPlayableBoard);
    setSelectedCell({ row: null, col: null });
    setTimer(600);
    setPaused(true);
    setGameOver(false);
    setHistory([newPlayableBoard]);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, board]);

  return (
    <div className="sudoku-game-module">
      <h1>"SUNRISE SUDOKU"</h1>

      <div className="sunrise-timer">
        <div className="sunrise-progress"></div>
      </div>

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
      ></canvas>

      <div className="sudoku-game-controls">
        <button onClick={handleMagic}>
          <FontAwesomeIcon icon={faWandMagicSparkles} />
        </button>

        <div className="sudoku-controls-container">
          <div className="sudoku-difficulty-box">
            <label>Easy</label>
            <input
              type="range"
              min="10"
              max="90"
              value={difficulty}
              className="difficulty-slider"
              onChange={handleDifficultyChange}
            />
            <label>Hard</label>
          </div>
        </div>

        <button onClick={handleNewBoard} className="new-board-button">
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>

      <div className="sudoku-status-container">
        <button onClick={handlePause} className="pause-button">
          <FontAwesomeIcon icon={paused ? faPlay : faPause} />
        </button>

        <div className="sudoku-status-box">
          <p className="sudoku-status-label">Time Left</p>
          <p>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}</p>
        </div>
      </div>

      {gameOver && (
        <div className="sudoku-game-over-screen">
          <div className="sudoku-game-over-message">Game Over! Time's up!</div>
          <button onClick={handleReset} className="play-again-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
