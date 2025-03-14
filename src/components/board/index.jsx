import React from "react";
import Square from "../square";

function Board (props){
    const {boardstate, handlePlayerMove, disableAll} = props

    return (<>
        {boardstate.map( (row, xIndex) => {
            return (<div>
                    {
                        row.map( (cellValue, yIndex) => (<Square cellValue = {cellValue} handlePlayerMove= {() => handlePlayerMove(xIndex, yIndex)} disableOverride={disableAll} />))
                    }
                    </div>)
                })
          }
    </>)
}

export default Board