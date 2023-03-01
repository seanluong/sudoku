import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CellsState } from "../reducers/CellsReducer";
import { ControlsState, selectCell } from "../reducers/ControlsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { invalidCell } from "../utils/puzzleValidation";
import { CellValue } from "./Sudoku";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    cell?: CellValue;
    size: string;
    borderColor: string;
}

export const Cell = ({ rowIndex, columnIndex, cell, size, borderColor }: CellProps) => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);
    const { validationErrors } = useSelector<SudokuAppState, CellsState>(state => state.cells);

    const invalid = invalidCell(rowIndex, columnIndex, validationErrors);

    const cellBorderTop = (rowIndex: number, style: string) => ([3, 6].includes(rowIndex) ? style : "none");
    const cellBorderBottom = (rowIndex: number, style: string) => ([2, 5].includes(rowIndex) ? style : "none");
    const cellBorderLeft = (columnIndex: number, style: string) => ([3, 6].includes(columnIndex) ? style : "none");
    const cellBorderRight = (columnIndex: number, style: string) => ([2, 5].includes(columnIndex) ? style : "none");

    const cellSelected = status === "SELECTED" && input.rowIndex === rowIndex && input.columnIndex === columnIndex;
    const cellBackgroundColor = (cell: CellValue | undefined, cellSelected: boolean) => {
        if (cell?.isOriginal) {
            return "lightblue";
        }
        if (cellSelected) {
            return "yellow";
        }
        if (cell?.value) {
            return "aquamarine";
        }
        return "white";
    }
    const cellBackgroundImage = (cell: CellValue | undefined, invalid: boolean, cellSelected: boolean) => {
        if (!invalid) {
            return "none";
        }
        if (cellSelected) {
            return "radial-gradient(closest-side, yellow 75%, palevioletred)";
        }
        if (cell?.isOriginal) {
            return "radial-gradient(closest-side, lightblue 75%, palevioletred)";
        }
        if (cell?.value) {
            return "radial-gradient(closest-side, aquamarine 75%, palevioletred)";
        }
        return "radial-gradient(closest-side, white 75%, palevioletred)";
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

    return (
        <Paper key={`cell-${rowIndex}-${columnIndex}`}
            onClick={handleClicked}
            elevation={0}
            sx={{
                flex: `1 1 ${size}`,
                width: size,
                padding: "1px",
                bgcolor: "rgba(0, 0, 0, 0.2)",
            }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                backgroundColor: cellBackgroundColor(cell, cellSelected),
                borderTop: cellBorderTop(rowIndex, borderColor),
                borderBottom: cellBorderBottom(rowIndex, borderColor),
                borderLeft: cellBorderLeft(columnIndex, borderColor),
                borderRight: cellBorderRight(columnIndex, borderColor),
                backgroundImage: cellBackgroundImage(cell, invalid, cellSelected),
            }}>
                <Typography variant="h6">
                    {cell?.value ? cell?.value : null}
                </Typography>
            </Box>
        </Paper>
    )
}