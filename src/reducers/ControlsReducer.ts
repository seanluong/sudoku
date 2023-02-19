import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    value?: number;
}

interface ResetCellPayload {}

type ControlsPayload = SelectCellPayload | ResetCellPayload;

const initialState = {
    status: "UNSELECTED",
    input: {} as InputState,
} as ControlsState;

export const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        selectCell: (state, action: PayloadAction<SelectCellPayload>) => {
            const { rowIndex, columnIndex, value } = action.payload;
            return {
                status: "SELECTED",
                input: {
                    rowIndex,
                    columnIndex,
                    value,
                }
            };
        },
        resetCell: (state, action: PayloadAction<ResetCellPayload>) => {
            return {
                status: "UNSELECTED",
                input: {} as InputState
            };
        },
    }
})

export const { resetCell, selectCell } = controlsSlice.actions;
