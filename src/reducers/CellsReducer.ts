import { createSlice } from "@reduxjs/toolkit";
import { CellMap } from "../types";
  
export const cellsSlice = createSlice({
    name: 'cells',
    initialState: {} as CellMap,
    reducers: {
        identity: state => state,
    }
})