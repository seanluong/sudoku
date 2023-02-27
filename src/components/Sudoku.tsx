import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux";
import { Cell } from "./Cell";
import { CellsState, newGame } from "../reducers/CellsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { useEffect } from "react";
import { fetchPuzzle, Puzzle } from "../utils/puzzleFetcher";


export interface CellValue {
    value: number;
    isOriginal: boolean;
}

export interface CellMap {
    [key: string]: CellValue;
}

export const Sudoku = () => {
    const dispatch = useDispatch();
    const { cells } = useSelector<SudokuAppState, CellsState>(state => state.cells);

    useEffect(() => {
        fetchPuzzle().then((puzzle?: Puzzle) => {
            if (puzzle) {
                dispatch(newGame({ puzzle }));
            }
        });
    }, []);
    
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const gridSize = "min(65vw, 65vh)";
    const outerBackgroundColor = "rgba(0, 0, 100, 0.8)";

    const cellSize = `calc(${gridSize} / ${rows.length})`;
    const cellBorderColor = `2px solid ${outerBackgroundColor}`;

    return (
        <Paper sx={{
            bgcolor: outerBackgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }} elevation={4}>
            <Grid container direction="column" >
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