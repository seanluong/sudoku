import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellMap, CellValue } from "../components/Sudoku";
import { Puzzle } from "../utils/puzzleFetcher";
import { cellMapKey, validateBoard } from "../utils/puzzleValidation";


type GameStatus = "SOLVED" | "WIP";

export type ValidationStatus = "N/A" | "VALID" | "INVALID";

export interface CellsState {
    cells: CellMap;
    gameStatus: GameStatus;
    validationStatus: ValidationStatus;
}

interface SetCellPayload {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

interface NewGamePayload {
    puzzle: Puzzle;
}
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: {
        cells: {} as CellMap,
        gameStatus: 'WIP',
        validationStatus: "N/A",
    } as CellsState,
    reducers: {
        setCell: (state, action: PayloadAction<SetCellPayload>) => {
            const { rowIndex, columnIndex, value } = action.payload;
            const key = `${rowIndex}:${columnIndex}`;
            state.cells[key] = {
                value,
                isOriginal: false,
            }
        },
        resetAllCells: ({ cells, gameStatus, validationStatus }) => {
            Object.entries(cells).map(([key, value]) => {
                if (!value.isOriginal) {
                    delete cells[key];
                }
            })
            gameStatus = "WIP";
            validationStatus = "N/A";
        },
        newGame: (state, action: PayloadAction<NewGamePayload>) => {
            // TODO: implement a cheat code to make use of the hidden values to quickly finish the game
            // this is useful for testing purposes
            const { puzzle } = action.payload;
            const { shown } = puzzle;
            state.cells = {} as CellMap;
            shown.forEach(({ row, col, value }) => {
                const key = cellMapKey(row, col);
                state.cells[key] = {
                    value,
                    isOriginal: true,
                };
            });
            state.gameStatus = 'WIP';
            state.validationStatus = "N/A";
        },
        validate: (state) => {
            // TODO: extend app state for validation errors
            const validationErrors = validateBoard(state.cells);
            const valid = validationErrors.length === 0;
            state.gameStatus = valid ? 'SOLVED' : 'WIP';
            state.validationStatus = valid ? 'VALID' : 'INVALID';
        },
        invalidate: (state) => {
            state.validationStatus = 'N/A';
        },
    }
})

export const { newGame, setCell, resetAllCells, validate, invalidate } = cellsSlice.actions;
