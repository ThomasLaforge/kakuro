export interface ScoreCell {
    top?: number,
    right?: number,
    bottom?: number,
    left?:number
}

export type EmptyCell = 0
export type Outside = -1
export type GridValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type GridCell = ScoreCell | EmptyCell | Outside | GridValue
export type GridData = GridCell[][]

export interface CellCoord {
    row: number,
    col: number
}

export enum Direction {
    Horizontal,
    Vertical
}

export type Resolution = number[][]