import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useShowErrorsContext } from "../context/ShowErrorsContext";
import { CellsState } from "../reducers/CellsReducer";
import { ControlsState, selectCell } from "../reducers/ControlsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { invalidCell } from "../utils/puzzleValidation";
import { CellValue } from "./Sudoku";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    cell?: CellValue;
}

export const Cell = ({ rowIndex, columnIndex, cell }: CellProps) => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);
    const { validationErrors } = useSelector<SudokuAppState, CellsState>(state => state.cells);
    const { showErrors } = useShowErrorsContext();

    const invalid = invalidCell(rowIndex, columnIndex, validationErrors);
    const cellBorderTop = [3, 6].includes(rowIndex);
    const cellBorderBottom = [2, 5].includes(rowIndex);
    const cellBorderLeft = [3, 6].includes(columnIndex);
    const cellBorderRight = [2, 5].includes(columnIndex);
    const cellSelected = status === "SELECTED" && input.rowIndex === rowIndex && input.columnIndex === columnIndex;
    const cellBackgroundColor = (cell: CellValue | undefined, cellSelected: boolean) => {
        if (cell?.isOriginal) {
            return "bg-[lightblue]";
        }
        if (cellSelected) {
            return "bg-[yellow]";
        }
        if (cell?.value) {
            return "bg-[aquamarine]";
        }
        return "bg-white";
    }
    const cellBackgroundImage = (cell: CellValue | undefined, showErrors: boolean, invalid: boolean, cellSelected: boolean) => {
        if (!invalid || !showErrors) {
            return "none";
        }
        let color = 'white';
        if (cellSelected) {
            color = 'yellow';
        }
        if (cell?.isOriginal) {
            color = 'lightblue';
        }
        if (cell?.value) {
            color = 'aquamarine';
        }
        let template = `bg-gradient-to-br from-rose-500 to-${color} to-50%`;
        return template;
    }

    const handleClicked = (event: React.MouseEvent) => {
        if (cell?.isOriginal) {
            return;
        }
        dispatch(selectCell({
            rowIndex,
            columnIndex,
            cell,
        }))
    }

    const innerClassNames = [
        "flex",
        "items-center",
        "justify-center",
        "h-full",
        "border-[#000064]/80",
        cellBorderTop ? "border-t-2" : "",
        cellBorderBottom ? "border-b-2" : "",
        cellBorderLeft ? "border-l-2" : "",
        cellBorderRight ? "border-r-2" : "",
        cellBackgroundColor(cell, cellSelected),
        cellBackgroundImage(cell, showErrors, invalid, cellSelected),
    ].filter((className) => className.length > 0);
    return (
        <Paper key={`cell-${rowIndex}-${columnIndex}`}
            onClick={handleClicked}
            elevation={0}
            className={`p-px bg-black/20 w-[calc(min(75vw,75vh)/9)]`}
        >
            <Box className={innerClassNames.join(" ")}>
                <Typography variant="h6">
                    {cell?.value ? cell?.value : null}
                </Typography>
            </Box>
        </Paper>
    )
}