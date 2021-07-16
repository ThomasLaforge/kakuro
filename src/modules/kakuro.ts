import { CellCoord, Direction, GridData, ScoreCell } from "./definitions";

export class Kakuro {

    constructor(
        public grid: GridData
    )
    {}

    getContract(coord: CellCoord, dir: Direction){
        let res = 0
        if(dir === Direction.Horizontal){
            let index = coord.col
            while(index > 0 && !Number.isNaN(this.grid[coord.row][index]) && this.grid[coord.row][index] >= 0){
                index--
            }
            res = (this.grid[coord.row][index] as ScoreCell).right
        }
        else {
            let index = coord.row
            while(index > 0 && !Number.isNaN(this.grid[index][coord.col]) && this.grid[index][coord.col] >= 0){
                index--
            }
            res = (this.grid[index][coord.col] as ScoreCell).bottom
        }
        return res
    }

    getContractLength(coord: CellCoord, dir: Direction){
        if(dir === Direction.Horizontal){
            let indexMin = coord.col
            while(indexMin > 0 && !Number.isNaN(this.grid[coord.row][indexMin]) && this.grid[coord.row][indexMin] >= 0){
                indexMin--
            }
            let indexMax = coord.col
            while(indexMax < this.grid[coord.row].length && !Number.isNaN(this.grid[coord.row][indexMax]) && this.grid[coord.row][indexMax] >= 0){
                indexMax++
            }
            return indexMax - indexMin - 1
        }
        else {
            let indexMin = coord.row
            while(indexMin > 0 && !Number.isNaN(this.grid[indexMin][coord.col]) && this.grid[indexMin][coord.col] >= 0){
                indexMin--
            }
            let indexMax = coord.row
            while(indexMax < this.grid.length && !Number.isNaN(this.grid[indexMax][coord.col]) && this.grid[indexMax][coord.col] >= 0){
                indexMax++
            }
            return indexMax - indexMin - 1
        }
    }

    getPossibilities(coord: CellCoord){
        const contracts: [number, number] = [
            this.getContract(coord, Direction.Horizontal),
            this.getContract(coord, Direction.Vertical)
        ] 
        console.log('contracts', contracts);
        
        const possibilities = contracts.map((c, index) => {
            let list: number[][] = []
            let out = false

            const length = this.getContractLength(coord, index === 0 ? Direction.Horizontal : Direction.Vertical)
            let currPossibility = new Array(length).fill('').map( (e, i) => i + 1)
            const maxValue = currPossibility.map(v => 10 - v).reduce((sum, v) => sum + v, 0)

            const isLessOrEqual = (toTest: number[], contractValue: number) => 
                toTest.reduce( (sum, n) => sum + n, 0) <= contractValue

            const isEqual = (toTest: number[], contractValue: number) => 
                toTest.reduce( (sum, n) => sum + n, 0) === contractValue

            // while(!out || isLessOrEqual(currPossibility, maxValue)){
            //     if(isEqual(currPossibility, c)){
            //         list.push(currPossibility)
            //         // Increment currPossibility
            //         let i = currPossibility.length - 1
            //         while(index > 0 && currPossibility[index] < 10 - index){
            //             index--
            //         }
            //         if(!is)
            //     }
            //     else {
            //         // Increment currPossibility
            //         let index = currPossibility.length - 1
            //         while(index > 0 && ){
            //             index--
            //         }

            //         if(!isLess)
            //     }

            // }


            let i = currPossibility.length - 1

            while(i > 0 && !isEqual(currPossibility, maxValue)){
                i = currPossibility.length - 1
                list.push(currPossibility)
                while(i > 0 && currPossibility[i] <= 10 - i){
                    i--
                }
                if(i > 0){
                    currPossibility = [
                        ...currPossibility.slice(0, i), 
                        currPossibility[i] + 1, 
                        ...currPossibility.slice(i + 1, currPossibility.length)
                    ]
                }
            }
            // list = list.filter(s => isEqual(s, c))
            
            return list
        })

        return possibilities
    }
}