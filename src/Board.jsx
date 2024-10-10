import { useState } from "react";
import Square from "./Square";

function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [scoreX, setScoreX] = useState(0); 
    const [scoreO, setScoreO] = useState(0); 
    const [winnerDeclared, setWinnerDeclared] = useState(false); 

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares) || winnerDeclared) {
            return;
        }

        const nextSquares = squares
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function restartGame(resetScores = false) {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinnerDeclared(false); 
        if (resetScores) {
            setScoreX(0); 
            setScoreO(0); 
        }
    }

    function nextRound() {
        setSquares(Array(9).fill(null)); 
        setXIsNext(true);
        setWinnerDeclared(false); 
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = "Winner: " + winner;
        if (!winnerDeclared) {
            if (winner === "X") {
                setScoreX(scoreX + 1); 
            } else if (winner === "O") {
                setScoreO(scoreO + 1);
            }
            setWinnerDeclared(true); 
        }
    } else if (!winnerDeclared) {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game-container">
            <div className="tictactoeboard">
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>

            <div className="scoreboard">
                <p>Scoreboard:</p>
                <p>X: {scoreX} | O: {scoreO}</p>

                <button onClick={restartGame} className="restart-button">Restart Game</button>
                {winner && <button onClick={nextRound} className="next-round-button">Next Round</button>}
            </div>
        </div>
    );
}

export default Board;
