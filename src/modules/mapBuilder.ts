import { Resolution, ScoreCell } from "./definitions";

export class MapBuilder {

    static getGridFromResolution(reso: Resolution){
        // create empty grid
        let initialArray = new Array(reso.length + 2).fill('').map(_ => 
                new Array(reso[0].length + 2).fill('').map(_ => 
                    null
                )
            )

        // add all zeros
        for (let row = 0; row < reso.length; row++) {
            for (let col = 0; col < reso[row].length; col++) {
                if(reso[row][col] > 0){
                    initialArray[row + 1][col + 1] = 0
                }
            }  
        }

        // add -1
        const isEmpty = (row: number, col: number) => {
            return row < 0 
                || row >= initialArray.length 
                || col < 0 
                || col >= initialArray[0].length
                || initialArray[row][col] === null
        }

        let withEmptyCells = JSON.parse(JSON.stringify(initialArray));

        for (let row = 0; row < initialArray.length; row++) {
            for (let col = 0; col < initialArray[row].length; col++) {
                if(
                    initialArray[row][col] === null &&
                    isEmpty(row - 1, col) &&
                    isEmpty(row + 1, col) &&
                    isEmpty(row, col - 1) &&
                    isEmpty(row, col + 1)
                ){
                    withEmptyCells[row][col] = -1
                }
            }  
        }

        const isNotEmpty = (row: number, col: number) => {
            return row >= 0 
            && row < withEmptyCells.length 
            && col >= 0 
            && col < withEmptyCells[0].length
            && withEmptyCells[row][col] !== null
            && withEmptyCells[row][col] !== -1
        }

        let withScores = JSON.parse(JSON.stringify(withEmptyCells));
        for (let row = 0; row < withEmptyCells.length; row++) {
            for (let col = 0; col < withEmptyCells[row].length; col++) {
                if( withEmptyCells[row][col] === null ){
                    let scores: ScoreCell = {}
                    if(isNotEmpty(row, col - 1)){
                        let index = col - 1
                        let score = 0
                        while(withEmptyCells[row][index] === 0){
                            score += reso[row - 1][index - 1]
                            index--
                        }
                        
                        scores.left = score
                    }
                    
                    if(isNotEmpty(row, col + 1)){
                        let index = col + 1
                        let score = 0
                        while(withEmptyCells[row][index] === 0){
                            score += reso[row - 1][index - 1]
                            index++
                        }
                        
                        scores.right = score
                    }

                    if(isNotEmpty(row + 1, col)){
                        let index = row + 1
                        let score = 0
                        while(withEmptyCells[index][col] === 0){
                            score += reso[index - 1][col - 1]
                            index++
                        }
                        
                        scores.bottom = score
                    }
                    
                    if(isNotEmpty(row - 1, col)){
                        let index = row - 1
                        let score = 0
                        while(withEmptyCells[index][col] === 0){
                            score += reso[index - 1][col - 1]
                            index--
                        }
                        
                        scores.top = score
                    }
                    withScores[row][col] = scores
                }
            }  
        }

        return withScores
    }
}