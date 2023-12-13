import { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";

type Player = "X" | "O" | null;

interface TicTacToeGameProps {
  onWin: () => void;
  onLose: () => void;
  onDraw: () => void;
  onReset: () => void;
  shouldReset: boolean;
}

export const TicTacToeGame: FunctionComponent<TicTacToeGameProps> = ({ onWin, onLose, onDraw, onReset, shouldReset }) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [numMoves, setNumMoves] = useState(0);
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    if (!shouldReset) return;
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    onReset();
    setNumMoves(0);
  }, [shouldReset, onReset]);

  useEffect(() => {
    if (!isXNext) {
      // AI makes a random move after a short delay
      const timeout = setTimeout(makeRandomMove, 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext]);

  const makeRandomMove = () => {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (!cell) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleCellClick(randomIndex);
  };

  const calculateWinner = (): Player | null => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || calculateWinner()) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setNumMoves(numMoves + 1);
  };

  const renderCell = (index: number) => (
    <Cell key={index} onClick={() => handleCellClick(index)}>
      {board[index]}
    </Cell>
  );

  const winner = calculateWinner();
  if (winner === "X") onWin();
  if (winner === "O") onLose();
  if (!winner && numMoves >= 9) onDraw();

  return (
    <GameContainer>
      <Board>{board.map((_cell, index) => renderCell(index))}</Board>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 8px;
`;

const Cell = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;
