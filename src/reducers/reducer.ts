import { cellsSlice, CellsState } from "./CellsReducer";
import { controlsSlice, ControlsState } from "./ControlsReducer";


export interface SudokuAppState {
    cells: CellsState;
    controls: ControlsState;
}

export const rootReducer = {
    cells: cellsSlice.reducer,
    controls: controlsSlice.reducer,
}
