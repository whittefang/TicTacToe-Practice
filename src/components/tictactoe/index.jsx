import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Board from "../board";
import History from "../history";

function TicTacToe (){
    const defaultGameState = {
        turnState: "Player 1",
        boardState: [
        ["-","-","-"],
        ["-","-","-"],
        ["-","-","-"]
        ]
    }

    const [gameState,setGameState] = useState([])
    const [currentTurn,setCurrentTurn] = useState(0)

    useEffect(() => {localStorage.setItem("gameState", JSON.stringify(gameState))}, [gameState])
    useEffect(() => {localStorage.setItem("currentTurn", currentTurn)}, [currentTurn])


    const handleRestart = () => {
        setGameState([JSON.parse(JSON.stringify(defaultGameState))])
        setCurrentTurn(0)
    }

    if (gameState.length == 0){
        const savedGameState = localStorage.getItem('gameState')



        if (savedGameState !== null){
            const parsedSavedGameState = JSON.parse(savedGameState)
            const savedCurrentTurn = localStorage.getItem('currentTurn')
            if (savedCurrentTurn !== null){
                setCurrentTurn(parseInt(savedCurrentTurn))
            }


            setGameState(parsedSavedGameState)
            return (<></>)
        } else {
            handleRestart()
            return (<></>)
        }
    }



    const handlePlayerMove = (x, y) =>{
        let newGameState = [...gameState]

        if (gameState.length-1 > currentTurn){
            newGameState = newGameState.slice(0, currentTurn+1)
        }

        var newBoardState = JSON.parse(JSON.stringify(newGameState[currentTurn]));
        if (newBoardState.turnState === "Player 1"){
            newBoardState.boardState[x][y] = 'X'
            newBoardState.turnState = "Player 2"
        } else {
            newBoardState.boardState[x][y] = 'O'
            newBoardState.turnState = "Player 1"
        }
        // check for win condition
        const playerOneWon = checkForWinCondition("X", newBoardState)

        if (playerOneWon){
            newBoardState.turnState = "Player 1 Won"
        }

        const playerTwoWon = checkForWinCondition("O", newBoardState)

        if (playerTwoWon){
            newBoardState.turnState = "Player 2 Won"
        }

        const finalGameState = [...newGameState, newBoardState]

        setGameState(finalGameState)
        setCurrentTurn(currentTurn+1)
    }

    const checkForWinCondition = (team, newBoardState) =>{
        // check for horizontal
        let canWin = true

        for (let x = 0; x < 3; x++ ){
            for (let y = 0; y < 3; y++ ){
                if (newBoardState.boardState[y][x] !== team){
                    canWin = false
                    break
                }
            }
            if (canWin){
                return true
            }
            canWin = true
        }

        // check for vertical
        for (let x = 0; x < 3; x++ ){
            for (let y = 0; y < 3; y++ ){
                if (newBoardState.boardState[x][y] !== team){
                    canWin = false
                    break
                }
            }
            if (canWin){
                return true
            }
            canWin = true
        }
        // check for diagonal top left to bottom right
        for (let y = 0; y < 3; y++ ){
            if (newBoardState.boardState[y][y] !== team){
                canWin = false
                break
            }
        }
        if (canWin){
            return true
        }
        canWin = true

        // check for diagonal top right to bottom left
        for (let y = 0; y < 3; y++ ){
            if (newBoardState.boardState[2-y][y] !== team){
                canWin = false
                break
            }
        }
        if (canWin){
            return true
        }
        canWin = true



    }

    const handleHistoryClick = (turn) =>{
        setCurrentTurn(turn)
    }

    const disableAllSquares = gameState[currentTurn].turnState === "Player 1 Won" || gameState[currentTurn].turnState === "Player 2 Won"

    return (
        <>
        <div>{gameState[currentTurn].turnState}</div>
        <Board boardstate = {gameState[currentTurn].boardState}  handlePlayerMove = {handlePlayerMove} disableAll={disableAllSquares}/>

        <div>
            <button onClick={handleRestart}>Restart</button>
        </div>
        <History turns={gameState.length-1} currentTurn={currentTurn} onClick={handleHistoryClick}/>
        
        </>
    )
}

export default TicTacToe