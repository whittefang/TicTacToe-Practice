import React from "react";
import HistoryNode from "../historyNode";

function History (props){

    const {turns,currentTurn, onClick} = props
 
    const renderHistoryNodes = () => {
        let output = []
        for (let turn = 0; turn <= turns; turn++){
             output.push(<HistoryNode turn = {turn} onClick={() => onClick(turn)} disabled = {turn === currentTurn}/>)
        }

        return output
    }
 
    return (
        <>
        {renderHistoryNodes().map( node => {return node})}
        </>
    )
}

export default History