import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"


export interface Row {
    cells: number[];
}

export interface CellMap {
    [key: string]: number;
}

export interface Board {
    rows: number[];
    columns: number[];
    cells: CellMap;
}

export interface SudokuProps {
    board: Board;
}

interface CellProps {
    rowIndex: number;
    columnIndex: number;
    value: number;
    size: string;
    borderColor: string;
}

const Cell = ({ rowIndex, columnIndex, value, size, borderColor }: CellProps) => {
    const cellBorderTop = (rowIndex: number, style: string) => ([3, 6].includes(rowIndex) ? style : "inherit");
    const cellBorderBottom = (rowIndex: number, style: string) => ([2, 5].includes(rowIndex) ? style : "inherit");
    const cellBorderLeft = (columnIndex: number, style: string) => ([3, 6].includes(columnIndex) ? style : "inherit");
    const cellBorderRight = (columnIndex: number, style: string) => ([2, 5].includes(columnIndex) ? style : "inherit");
    const cellBackgroundColor = (cell: number) => cell ? "lightblue" : "white";

    return (
        <Paper key={`cell-${rowIndex}-${columnIndex}`}
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

export const Sudoku = ({ board }: SudokuProps) => {
    const { rows, columns, cells} = board;
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
                    rows.map((row, rowIndex) => {
                        return (
                            <Grid item
                                container
                                key={`row-${rowIndex}`}
                                justifyContent="center"
                                direction="row"
                                sx={{
                                    flex: `1 1 ${cellSize}`,
                                    height: cellSize,
                                }}
                            >
                                {
                                    columns.map((column, columnIndex) => {
                                        const cell = cells[`${row}:${column}`];
                                        return (
                                            <Cell rowIndex={rowIndex}
                                                columnIndex={columnIndex}
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