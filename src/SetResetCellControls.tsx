import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCell } from "./reducers/CellsReducer";
import { ControlsState, resetCell } from "./reducers/ControlsReducer";
import { SudokuAppState } from "./reducers/reducer";


export const SetResetCellControls = () => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);
    const { rowIndex, columnIndex, value } = input;

    const [localValue, setLocalValue] = useState(value || 0);

    const label = (rowIndex !== undefined && columnIndex !== undefined) ? `Row ${rowIndex + 1} - Column ${columnIndex + 1}` : '';

    const handleResetCellClicked = (event: React.MouseEvent) => {
        dispatch(resetCell({}))
    }
    const handleSetClicked = (event: React.MouseEvent) => {
        if (rowIndex === undefined || columnIndex === undefined) {
            return;
        }
        const number = localValue;
        if (Number.isInteger(number) && number > 0 && number < 10) {
            dispatch(setCell({
                rowIndex,
                columnIndex,
                value: number,
            }));
            dispatch(resetCell({}));
        }
    }
    const handleTextFieldChanged = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        const number = Number.parseInt(value || '');
        if (Number.isNaN(number)) {
            setLocalValue(0);
        } else {
            setLocalValue(number);
        }
    }

    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <TextField variant="outlined"
                defaultValue={localValue}
                label={label}
                disabled={status === "UNSELECTED"}
                onChange={handleTextFieldChanged}/>
            <Button variant="contained"
                onClick={handleSetClicked}
                disabled={status === "UNSELECTED"}>
                Set
            </Button>
            <Button variant="contained"
                color="secondary"
                disabled={status === "UNSELECTED"}
                onClick={handleResetCellClicked}>
                Reset Cell
            </Button>
        </Stack>
    );
}