import React from 'react'
import { ScoreCell } from '../modules/definitions'

export default function ScoreCell(props: {scores: ScoreCell}){
    const { top, right, bottom, left } = props.scores
    const multipleTriangle = [top, right, bottom, left].reduce( (count, dir) => count + (!!dir ? 1 : 0), 0) > 1
    return <div className={"score-cell" + (multipleTriangle ? ' multiple-triangle' : '')}>
        {top && <div className="score-cell-top">{top}</div>}
        {top && <div className="triangle triangle-top" />}

        {right && <div className="score-cell-right">{right}</div>}
        {right && <div className="triangle triangle-right" />}
        
        {bottom && <div className="score-cell-bottom">{bottom}</div>}
        {bottom && <div className="triangle triangle-bottom" />}
        
        {left && <div className="score-cell-left">{left}</div>}
        {left && <div className="triangle triangle-left" />}
    </div>
}