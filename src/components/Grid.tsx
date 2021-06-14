import React, { useState } from "react";
import { GridCell } from "../modules/definitions";
import { ScoreCell } from "../modules/definitions";
import { GridData } from "../modules/definitions";

import ScoreCellUI from './ScoreCell'

import '../styles/Grid.scss'

interface GridProps {
    data: GridData,
    onCellClick: Function
}

export default function Grid(props: GridProps){

    const renderCell = (cell: GridCell) => {
        if(cell === 0) {
            return <div className="empty-cell" />
        }
        else if(cell === - 1){
            return <div className="outside" />
        }
        else if(cell >= 1 && cell <= 9){
            return <div className="full-cell">{cell}</div>
        } 
        else {
            return <ScoreCellUI scores={cell as ScoreCell} />
        }
    }

    const renderCells = () => {
        const { data, onCellClick } = props
        return data.map((line, lineIndex) => (
            <div className="grid-line"
                key={lineIndex}
            >
                {line.map( (cell, cellIndex) => (
                  <div className="grid-cell"
                    key={`${lineIndex}-${cellIndex}`}
                    onClick={() => onCellClick({ row: lineIndex, col: cellIndex })}
                  >
                    {renderCell(cell)}
                  </div>  
                ))}
            </div>
        ))
    }
    
    return <div className='grid'>
        {renderCells()}
    </div>
}