import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid"
import { Cell } from "./Cell";
import { CellMap } from "./types";

export interface Board {
    cells: CellMap;
}

export interface SudokuProps {
    board: Board;
}

export const Sudoku = ({ board }: SudokuProps) => {
    const { cells } = board;

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
                                        const cell = cells[`${row}:${column}`];
                                        return (
                                            <Cell key={`column-${column}`}
                                                rowIndex={row}
                                                columnIndex={column}
                                                value={cell}
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