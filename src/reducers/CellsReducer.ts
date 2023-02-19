import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellMap, CellValue } from "../Sudoku";

interface SetCellPayload {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

interface ResetAllCellsPayload {};
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: {
        '0:0': { value: 9, isOriginal: true } as CellValue,
        '0:1': { value: 4, isOriginal: true } as CellValue,
        '7:3': { value: 5, isOriginal: true } as CellValue,
    } as CellMap,
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
