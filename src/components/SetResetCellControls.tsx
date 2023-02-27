import { Button, Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCell } from "../reducers/CellsReducer";
import { ControlsState, resetCell } from "../reducers/ControlsReducer";
import { SudokuAppState } from "../reducers/reducer";

export const SetResetCellControls = () => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);
    const { rowIndex, columnIndex, value } = input;

    const [localValue, setLocalValue] = useState<string>(value ? `${value}` : '');

    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === 'SELECTED' && textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [status]);

    const handleResetCellClicked = (event: React.MouseEvent) => {
        dispatch(resetCell({}))
    }
    const handleSetClicked = (event: React.MouseEvent) => {
        if (rowIndex === undefined || columnIndex === undefined) {
            return;
        }
        const number = Number.parseInt(localValue);
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
        const value = (event.target as HTMLInputElement).value.trim();
        setLocalValue((currentValue) => {
            if (value === '') {
                return value;
            }
            const number = Number.parseInt(value);
            if (Number.isInteger(number) && number > 0 && number < 10) {
                return `${number}`;
            }
            (event.target as HTMLInputElement).value = currentValue; 
            return currentValue;
        });
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
                inputRef={textFieldRef}
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