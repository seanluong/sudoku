import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellMap, CellValue } from "../Sudoku";

interface SetCellPayload {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

interface ResetAllCellsPayload {};


// const PUZZLE = [
//     [6, 2, 1, 0, 5, 9, 0, 0, 0],
//     [4, 0, 0, 0, 0, 6, 3, 5, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [2, 0, 8, 0, 0, 4, 9, 7, 6],
//     [0, 7, 0, 0, 8, 2, 0, 0, 0],
//     [0, 4, 0, 7, 9, 1, 0, 0, 5],
//     [0, 0, 0, 0, 0, 0, 6, 0, 0],
//     [0, 0, 3, 0, 6, 8, 0, 0, 0],
//     [0, 6, 4, 2, 0, 3, 5, 0, 0],
// ]

const PUZZLE = [
    [8, 2, 7, 1, 5, 4, 3, 9, 6],
    [9, 6, 5, 3, 2, 7, 1, 4, 8],
    [3, 4, 1, 6, 8, 9, 7, 5, 2],
    [5, 9, 3, 4, 6, 8, 2, 7, 1],
    [4, 7, 2, 5, 1, 3, 6, 8, 9],
    [6, 1, 8, 9, 7, 2, 4, 3, 5],
    [7, 8, 6, 2, 3, 5, 9, 1, 4],
    [1, 5, 4, 7, 9, 6, 8, 2, 3],
    [2, 3, 9, 8, 4, 1, 5, 6, 0],
]

const puzzleToCellMap = (puzzle: number[][]): CellMap => {
    const cellMap = {} as CellMap;
    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value !== 0) {
                const key = `${rowIndex}:${colIndex}`;
                cellMap[key] = {
                    value,
                    isOriginal: true,
                } as CellValue;
            }
        })
    });
    return cellMap;
}
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: puzzleToCellMap(PUZZLE),
    reducers: {
        setCell: (state, action: PayloadAction<SetCellPayload>) => {
            const { rowIndex, columnIndex, value } = action.payload;
            const key = `${rowIndex}:${columnIndex}`;
            return {
                ...state,
                [key]: {
                    value,
                    isOriginal: false,
                }
            }
        },
        resetAllCells: (state, action: PayloadAction<ResetAllCellsPayload>) => {
            const nextState = {} as CellMap;
            Object.entries(state).map(([key, value]) => {
                if (value.isOriginal) {
                    nextState[key] = value;
                }
            })
            return nextState;
        },
    }
})

export const { setCell, resetAllCells } = cellsSlice.actions;
