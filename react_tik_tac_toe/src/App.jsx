import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from './components/Log.jsx'
import GameOver from "./components/gameOver.jsx";
import {WINNING_COMBINATIONS} from "../winning-combinations.js";

const PLAYERS = {
    X:'Player 1',
    O:'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

function deriveWinner (gameBoard){
    let winner = null;

    for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = firstSquareSymbol;
        }

    }
    return winner;
}
function deriveGameBoard(turns){
    const gameBoard = [...INITIAL_GAME_BOARD.map(innerBoard => ([...innerBoard]))];
    for(const turn of turns){
        const {row,col} = turn.square;
        const {player} = turn;
        gameBoard[row][col] = player;
    }
    return gameBoard
}



function deriveActivePlayer(gameTurn){
    let currActive = 'X';
    if(gameTurn.length && gameTurn[0].player === 'X'){ // should not use active player , since it cause different state merge
        currActive = 'O';
    }
    return currActive;
}

function App() {
  // const [active,setActive] = useState('X');
    const [players,setPlayers] = useState(PLAYERS)
  const[turns,setTurns] = useState([]);
  let active = deriveActivePlayer(turns);
    const gameBoard = deriveGameBoard(turns);
    let winner = deriveWinner(gameBoard);
    let hasDrawn = turns.length === 9 && !winner;
  const handleSelectedSquare = (rowIdx,colIdx) =>{
      // setActive(prevActive => {
      //     return prevActive === 'X' ? 'O' : 'X';
      // })

      setTurns((prevTurns)=>{
          let currActive = deriveActivePlayer(prevTurns);
          const updatedTurns = [{square :{row:rowIdx , col:colIdx},player:currActive},...prevTurns]
          return updatedTurns
      })
    }

    const handleRestart = () =>{
      setTurns([]);
    }

    const handlePlayerNameChange = (symbol,playerName) =>{
      setPlayers((oldPlayers) =>({
          ...oldPlayers,
          [symbol]:playerName
      }))
    }

  return (
      <main>
          <div id="game-container">
              <ol id="players" className="highlight-player">

                  <Player onNameChange={handlePlayerNameChange} name={PLAYERS.X} symbol="X" isActive={active === 'X'} />
                  <Player onNameChange={handlePlayerNameChange} name={PLAYERS.O} symbol="O" isActive={active === 'O'}/>
              </ol>
              {(winner || hasDrawn) &&  <GameOver onRestart={handleRestart} winner = {players[winner]}/>}

              <GameBoard turns={turns} onSelectSquare={handleSelectedSquare} activePlayerSymbol={active} board={gameBoard}  />
          </div>
          <Log turns={turns}/>

      </main>
  )
}

export default App
