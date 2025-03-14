import React from "react";

function HistoryNode (props){

    const {turn, onClick, disabled} = props

    return (
        <button onClick={onClick} disabled={disabled}>{turn}</button>
    )
}

export default HistoryNode