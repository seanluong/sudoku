import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ControlsState, selectCell } from "./reducers/ControlsReducer";
import { SudokuAppState } from "./reducers/reducer";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    value: number;
    size: string;
    borderColor: string;
}

export const Cell = ({ rowIndex, columnIndex, value, size, borderColor }: CellProps) => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<SudokuAppState, ControlsState>(state => state.controls);

    const cellSelected = status === "SELECTED" && input.rowIndex === rowIndex && input.columnIndex === columnIndex;

    const cellBorderTop = (rowIndex: number, style: string) => ([3, 6].includes(rowIndex) ? style : "inherit");
    const cellBorderBottom = (rowIndex: number, style: string) => ([2, 5].includes(rowIndex) ? style : "inherit");
    const cellBorderLeft = (columnIndex: number, style: string) => ([3, 6].includes(columnIndex) ? style : "inherit");
    const cellBorderRight = (columnIndex: number, style: string) => ([2, 5].includes(columnIndex) ? style : "inherit");
    const cellBackgroundColor = (value: number) => {
        if (cellSelected) {
            return "green";
        }
        if (value) {
            return "lightblue";
        }
        return "white";
    }

    const handleClicked = () => {
        dispatch(selectCell({
            rowIndex,
            columnIndex,
            value,
        }))
    }

    return (
        <Paper key={`cell-${rowIndex}-${columnIndex}`}
            onClick={handleClicked}
            elevation={0}
            sx={{
                flex: `1 1 ${size}`,
                width: size,
                padding: "0.05em",
                bgcolor: "rgba(0, 0, 0, 0.2)",
            }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                backgroundColor: cellBackgroundColor(value),
                borderTop: cellBorderTop(rowIndex, borderColor),
                borderBottom: cellBorderBottom(rowIndex, borderColor),
                borderLeft: cellBorderLeft(columnIndex, borderColor),
                borderRight: cellBorderRight(columnIndex, borderColor),
            }}>
                <Typography variant="h6">
                    {value ? value : null}
                </Typography>
            </Box>
        </Paper>
    )
}