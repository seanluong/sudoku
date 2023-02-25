import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellMap, CellValue } from "../Sudoku";


type GameStatus = "SOLVED" | "WIP";

export interface CellsState {
    cells: CellMap;
    gameStatus: GameStatus;
}

interface SetCellPayload {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

interface ResetAllCellsPayload {};

interface ValidatePayload {};


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

const cellMapKey = (rowIndex: number, columnIndex: number): string => {
    return `${rowIndex}:${columnIndex}`;
}

const puzzleToCellMap = (puzzle: number[][]): CellMap => {
    const cellMap = {} as CellMap;
    puzzle.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value !== 0) {
                const key = cellMapKey(rowIndex, colIndex)
                cellMap[key] = {
                    value,
                    isOriginal: true,
                } as CellValue;
            }
        })
    });
    return cellMap;
}

const fromOneToNine = (numbers: number[]) => {
    const set = new Set();
    numbers.forEach((number) => {
        set.add(number);
    })
    return set.size === 9;
}

const validateRow = (cells: CellMap, rowIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return fromOneToNine(indices.map((columnIndex) => {
        const cell = cells[cellMapKey(rowIndex, columnIndex)];
        return cell.value;
    }));
}

const validateColumn = (cells: CellMap, colummIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return fromOneToNine(indices.map((rowIndex) => {
        const cell = cells[cellMapKey(rowIndex, colummIndex)];
        return cell.value;
    }));
}

const validateSubSquare = (cells: CellMap, subSquareIndex: number): boolean => {
    const numbers = [];
    const rowIndex = Math.floor(subSquareIndex / 3) * 3;
    const colIndex = (subSquareIndex % 3) * 3;
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            const cell = cells[cellMapKey(rowIndex + r, colIndex + c)];
            numbers.push(cell.value);
        }
    }
    return fromOneToNine(numbers);
}

const validateBoard = (cells: CellMap): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const validRows = indices.every((index) => validateRow(cells, index));
    if (!validRows) {
        console.log("invalid row");
        return false;
    }

    const validColumns = indices.every((index) => validateColumn(cells, index));
    if (!validColumns) {
        console.log("invalid column");
        return false;
    }

    const validSubSquare = indices.every((index) => validateSubSquare(cells, index));
    if (!validSubSquare) {
        console.log("invalid sub square");
        return false;
    }

    console.log("valid board");
    return true;
}
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: {
        cells: puzzleToCellMap(PUZZLE),
        gameStatus: 'WIP',
    },
    reducers: {
        setCell: (state, action: PayloadAction<SetCellPayload>) => {
            const { rowIndex, columnIndex, value } = action.payload;
            const key = `${rowIndex}:${columnIndex}`;
            state.cells[key] = {
                value,
                isOriginal: false,
            }
        },
        resetAllCells: ({ cells }, action: PayloadAction<ResetAllCellsPayload>) => {
            Object.entries(cells).map(([key, value]) => {
                if (!value.isOriginal) {
                    delete cells[key];
                }
            })
        },
        validate: (state, action: PayloadAction<ValidatePayload>) => {
            state.gameStatus = validateBoard(state.cells) ? 'SOLVED' : 'WIP';
        },
    }
})

export const { setCell, resetAllCells, validate } = cellsSlice.actions;
