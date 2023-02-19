import { CellMap } from "../types";
import { cellsSlice } from "./CellsReducer";
import { controlsSlice, ControlsState } from "./ControlsReducer";


export interface SudokuAppState {
    cells: CellMap;
    controls: ControlsState;
}

export const rootReducer = {
    cells: cellsSlice.reducer,
    controls: controlsSlice.reducer,
}
