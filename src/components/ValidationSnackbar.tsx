import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CellsState, invalidate, ValidationStatus } from "../reducers/CellsReducer";
import { SudokuAppState } from "../reducers/reducer";

const validationMessage = (validationStatus: ValidationStatus) => {
    if (validationStatus === 'VALID') {
        return 'Congratulations on solving the puzzle!';
    }
    if (validationStatus === 'INVALID') {
        return 'Invalid solution. Please check your solution again!';
    }
    return '';
}

const validationSeverity = (validationStatus: ValidationStatus) => {
    if (validationStatus === 'VALID') {
        return 'success';
    }
    if (validationStatus === 'INVALID') {
        return 'error';
    }
}

export const ValidationSnackbar = () => {
    const dispatch = useDispatch();
    const { validationStatus } = useSelector<SudokuAppState, CellsState>(state => state.cells);

    const handleClose = () => {
        dispatch(invalidate());
      };

    const message = validationMessage(validationStatus);
    const severity = validationSeverity(validationStatus);
    const open = validationStatus !== 'N/A';
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
        >
            <Alert severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
}