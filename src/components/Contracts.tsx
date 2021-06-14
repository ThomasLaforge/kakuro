import React from 'react'
import { Kakuro } from '../modules/kakuro'
import { CellCoord, Direction, GridCell, GridData } from '../modules/definitions'

interface ContractsProps {
    grid: GridData,
    cell: CellCoord
}

export default function ScoreCell(props: ContractsProps){
    const { grid, cell } = props

    
    
    const renderContractPossibilities = (dir: Direction) => {
        const dirIndex = dir === Direction.Horizontal ? 0 : 1
        
        const kakuro = new Kakuro(grid)
        const possibilities = kakuro.getPossibilities(cell)
        console.log({ possibilities });
        return possibilities[dirIndex].map( (p, k) => 
            <div className="possibility"
                key={k}
            >
                {p}
            </div>    
        )
    }

    return <div className={"contracts"}>
        <div className="contract contract-horizontal">
            <div className="contract-direction">H :</div>
            <div className="contract-possibilities">
                {renderContractPossibilities(Direction.Horizontal)}
            </div>
        </div>
        <div className="contract contract-vertical">
            <div className="contract-direction">V :</div>
            <div className="contract-possibilities">
                {renderContractPossibilities(Direction.Vertical)}
            </div>
        </div>
    </div>
}