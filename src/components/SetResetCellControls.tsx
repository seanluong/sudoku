import { Button, ButtonGroup, Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCell, solveGame, validate } from "../reducers/CellsReducer";
import { unselectCell } from "../reducers/ControlsReducer";
import { ControlsState } from "../reducers/ControlsReducer";
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

    const resetControls = () => {
        setLocalValue((currentValue) => {
            if (textFieldRef.current) {
                textFieldRef.current.value = '';
                return '';
            }
            return currentValue;
        });
        dispatch(unselectCell());
    }
    const dispatchSetCell = (rowIndex: number, columnIndex: number, value: number) => {
        dispatch(setCell({
            rowIndex,
            columnIndex,
            value,
        }));
        dispatch(validate({
            rowIndex,
            columnIndex,
        }))
        resetControls();
    }

    const handleUnselectCellClicked = (event: React.MouseEvent) => {
        resetControls();
    }
    const handleSetClicked = (event: React.MouseEvent) => {
        if (rowIndex === undefined || columnIndex === undefined) {
            return;
        }
        const number = Number.parseInt(localValue);
        if (Number.isInteger(number) && number > 0 && number < 10) {
            dispatchSetCell(rowIndex, columnIndex, number)
        }
    }
    const handleResetClicked = (event: React.MouseEvent) => {
        if (rowIndex === undefined || columnIndex === undefined) {
            return;
        }
        dispatchSetCell(rowIndex, columnIndex, 0);
    }
    const handleTextFieldChanged = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value.trim();
        if (value === 'c') {
            // Shortcut to solve the game for testing during development
            dispatch(solveGame());
        }

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

    const buttonFontSize = { xs: "0.5rem", sm: "0.8rem", md: "1rem" };
    return (
        <Stack
            direction={"row"} 
            gap={2}
            className="justify-center items-center"
        >
            <TextField variant="outlined"
                size="small"
                className="basis-16"
                defaultValue={localValue}
                inputRef={textFieldRef}
                disabled={status === "UNSELECTED"}
                onChange={handleTextFieldChanged}/>
            <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
                <Button variant="contained"
                    onClick={handleSetClicked}
                    size="medium"
                    color="primary"
                    disabled={status === "UNSELECTED"}
                    sx={{
                        fontSize: buttonFontSize
                    }}>
                    Set
                </Button>
                <Button variant="contained"
                    onClick={handleResetClicked}
                    size="medium"
                    disabled={status === "UNSELECTED"}
                    sx={{
                        fontSize: buttonFontSize
                    }}>
                    Reset
                </Button>
                <Button variant="contained"
                    size="medium"
                    disabled={status === "UNSELECTED"}
                    onClick={handleUnselectCellClicked}
                    sx={{
                        fontSize: buttonFontSize
                    }}>
                    Unselect
                </Button>
            </ButtonGroup>
        </Stack>
    );
}