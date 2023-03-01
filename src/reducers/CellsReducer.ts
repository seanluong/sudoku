import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellMap } from "../components/Sudoku";
import { Puzzle } from "../utils/puzzleFetcher";
import { cellMapKey, validateBoardForCell, ValidationError } from "../utils/puzzleValidation";


type GameStatus = "SOLVED" | "WIP";

export type ValidationStatus = "N/A" | "VALID" | "INVALID";

export interface CellsState {
    cells: CellMap;
    gameStatus: GameStatus;
    validationStatus: ValidationStatus;
    validationErrors: ValidationError[];
    puzzle: Puzzle;
}

interface SetCellPayload {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

interface NewGamePayload {
    puzzle: Puzzle;
}

interface ValidatePayload {
    rowIndex: number;
    columnIndex: number;
}
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: {
        cells: {} as CellMap,
        gameStatus: 'WIP',
        validationStatus: "N/A",
        validationErrors: [] as ValidationError[],
        puzzle: {} as Puzzle,
    } as CellsState,
    reducers: {
        setCell: (state, action: PayloadAction<SetCellPayload>) => {
            const { rowIndex, columnIndex, value } = action.payload;
            const key = `${rowIndex}:${columnIndex}`;
            if (value === 0) {
                delete state.cells[key];
            } else {
                state.cells[key] = {
                    value,
                    isOriginal: false,
                }
            }
        },
        resetAllCells: (state) => {
            Object.entries(state.cells).map(([key, value]) => {
                if (!value.isOriginal) {
                    delete state.cells[key];
                }
            })
            state.gameStatus = "WIP";
            state.validationStatus = "N/A";
            state.validationErrors = [];
        },
        solveGame: (state) => {
            const { hidden } = state.puzzle;
            hidden.forEach(({ row, col, value }) => {
                const key = cellMapKey(row, col);
                state.cells[key] = {
                    value,
                    isOriginal: false,
                };
                state.validationErrors = [];
            });
        },
        newGame: (state, action: PayloadAction<NewGamePayload>) => {
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
            state.puzzle = puzzle;
            state.gameStatus = 'WIP';
            state.validationStatus = "N/A";
        },
        validateAll: (state) => {
            const valid = state.validationErrors.length === 0;
            state.gameStatus = valid ? 'SOLVED' : 'WIP';
            state.validationStatus = valid ? 'VALID' : 'INVALID';
        },
        validate: (state, action: PayloadAction<ValidatePayload>) => {
            const { rowIndex, columnIndex } = action.payload;
            state.validationErrors = validateBoardForCell(state.cells, rowIndex, columnIndex);
        },
        invalidate: (state) => {
            state.validationStatus = 'N/A';
        },
    }
})

export const { newGame, setCell, resetAllCells, solveGame, validate, validateAll, invalidate } = cellsSlice.actions;
