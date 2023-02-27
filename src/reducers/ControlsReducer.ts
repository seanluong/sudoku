import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellValue } from "../components/Sudoku";

type Status = "UNSELECTED" | "SELECTED";

interface InputState {
    rowIndex?: number;
    columnIndex?: number;
    value?: number;
}

export interface ControlsState {
    status: Status;
    input: InputState;
}

interface SelectCellPayload {
    rowIndex: number;
    columnIndex: number;
    cell: CellValue | undefined;
}

const initialState = {
    status: "UNSELECTED",
    input: {} as InputState,
} as ControlsState;

export const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        selectCell: (state, action: PayloadAction<SelectCellPayload>) => {
            const { rowIndex, columnIndex, cell } = action.payload;
            state.status = "SELECTED";
            state.input = {
                rowIndex,
                columnIndex,
                value: cell?.value,
            };
        },
        unselectCell: (state) => {
            state.status = "UNSELECTED";
            state.input = {} as InputState;
        },
    }
})

export const { unselectCell, selectCell } = controlsSlice.actions;
