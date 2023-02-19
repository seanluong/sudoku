import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux";
import { Cell } from "./Cell";
import { SudokuAppState } from "./reducers/reducer";


export interface CellValue {
    value: number;
    isOriginal: boolean;
}

export interface CellMap {
    [key: string]: CellValue;
}

export const Sudoku = () => {
    const cells = useSelector<SudokuAppState, CellMap>(state => state.cells);
    
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const containerSize = "min(75vw, 75vh)";
    const gridSize = `calc(${containerSize} * 0.98)`;
    const outerBackgroundColor = "rgba(0, 0, 100, 0.8)";

    const cellSize = `calc(${gridSize} / ${rows.length})`;
    const cellBorderColor = `0.1rem solid ${outerBackgroundColor}`;

    return (
        <Paper sx={{
            bgcolor: outerBackgroundColor,
            flexBasis: containerSize,
            height: containerSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }} elevation={4}>
            <Grid container
                direction="column"
                sx={{
                    width: gridSize,
                }}>
                {
                    rows.map((row) => {
                        return (
                            <Grid item
                                container
                                key={`row-${row}`}
                                justifyContent="center"
                                direction="row"
                                sx={{
                                    flex: `1 1 ${cellSize}`,
                                    height: cellSize,
                                }}
                            >
                                {
                                    columns.map((column) => {
                                        const cell= cells[`${row}:${column}`];
                                        return (
                                            <Cell key={`column-${column}`}
                                                rowIndex={row}
                                                columnIndex={column}
                                                cell={cell}
                                                size={cellSize}
                                                borderColor={cellBorderColor} />
                                        );
                                    })
                                }
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Paper>
    )
}