import React from "react";

function Square (props){

    const {cellValue, handlePlayerMove, disableOverride} = props

    const disabled = disableOverride || cellValue !== "-"
    return (
        <button onClick={handlePlayerMove} disabled={disabled}>{cellValue}</button>
    )
}

export default Square