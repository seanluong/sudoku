import { Button, Stack, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { ControlsState, resetCell } from "./reducers/ControlsReducer";
import { SudokuAppState } from "./reducers/reducer";

export interface ControlsProps {

}

export const Controls = () => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);
    const { rowIndex, columnIndex, value } = input;

    const label = (rowIndex !== undefined && columnIndex !== undefined) ? `Row ${rowIndex + 1} - Column ${columnIndex + 1}` : '';

    const handleResetAllClicked = () => {
        // dispatch(selectCell({}))
    }
    const handleResetCellClicked = () => {
        dispatch(resetCell({}))
    }

    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <TextField variant="outlined" value={value ? value : '0'} label={label} />
            <Button variant="contained">Set</Button>
            <Button variant="contained" color="secondary" onClick={handleResetCellClicked}>Reset Cell</Button>
            <Button variant="contained" color="secondary" onClick={handleResetAllClicked}>Reset All</Button>
        </Stack>
    );
}