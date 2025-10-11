import {useState} from "react";


export default function GameBoard ({onSelectSquare,board}) {
    // const [gameBoard,setGameBoard] = useState(initialBoard);
    // const handleSelectedSquare = (rowIdx,colIdx) =>{
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedGameBoard = [...prevGameBoard.map((innerBoard)=>[...innerBoard])]
    //         updatedGameBoard[rowIdx][colIdx] = activePlayerSymbol
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row,rowIdx) => <li key={rowIdx}>
                    <ol>{row.map((playerSymbol, colIdx) => <li key={colIdx}><button onClick={() => onSelectSquare(rowIdx,colIdx)} disabled={playerSymbol !== null} >{playerSymbol}</button></li>)}</ol>
                </li>
                )}
        </ol>
    )
}