import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import Grid from './components/Grid';
import Contracts from './components/Contracts';
import { CellCoord, GridData, Resolution } from './modules/definitions';
import { Kakuro } from './modules/kakuro';
import { MapBuilder } from './modules/mapBuilder';

const resolution: Resolution = [
  [9, 1, 4, 0],
  [6, 5, 3, 2],
  [8, 3, 2, 1],
  [0, 7, 1, 0],
]
const builtGrid = MapBuilder.getGridFromResolution(resolution)
console.log('built grid', builtGrid)

const testGrid: GridData = [
  [-1,{bottom: 5},-1, -1, -1],
  [{right: 2},0, {left: 2}, {bottom: 2}, -1],
  [{right: 3},0, {left: 3, right: 2}, 0, {left: 2}],
  [-1, {top: 5}, -1, {top: 2}, -1],
]

const App = () => {
  const [currentCell, setCurrentCell] = useState(null)
  const [grid, updateGrid] = useState(builtGrid)
  
  const onCellClick = (coord: CellCoord) => {
    console.log('onCellClick', coord)
    if(grid[coord.row][coord.col] > -1){
      setCurrentCell(coord)
    }
    else {
      setCurrentCell(null)
    }
  }

  console.log('current coord', currentCell)
  const kakuro = new Kakuro(grid)
  if(currentCell){
    kakuro.getPossibilities(currentCell)
  }

  return <div className="app">
    {currentCell && 
      <Contracts
        grid={grid}
        cell={currentCell}
      />
    }
    <Grid 
      data={grid}   
      onCellClick={onCellClick}
    />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'));
