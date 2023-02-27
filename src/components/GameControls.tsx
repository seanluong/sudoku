import { Button, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { CellsState, newGame, resetAllCells, validate } from "../reducers/CellsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { fetchPuzzle, Puzzle } from "../utils/puzzleFetcher";

export const GameControls = () => {
    const dispatch = useDispatch();
    const { cells, gameStatus } = useSelector<SudokuAppState, CellsState>(state => state.cells);

    const handleResetAllClicked = (event: React.MouseEvent) => {
        dispatch(resetAllCells())
    }
    const handleValidateClicked = (event: React.MouseEvent) => {
        dispatch(validate());
    }
    const handleNewGameClicked = (event: React.MouseEvent) => {
        // TODO display UI based on the status of loading a new puzzle
        fetchPuzzle().then((puzzle?: Puzzle) => {
            if (puzzle) {
                dispatch(newGame({ puzzle }));
            }
        });
    }

    const isBoardFull = Object.keys(cells).length === 81;
    const canResetBoard = Object.values(cells).some((cellValue) => cellValue.isOriginal === false);
    const gameSolved = gameStatus === 'SOLVED';
    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Button variant="contained"
                        onClick={handleNewGameClicked}
                        size="medium">
                    New
                </Button>
                {
                    gameSolved ? (
                        <>
                            <Typography variant="h5">
                                Congratulations!
                            </Typography>
                        </>
                    ) : 
                    (
                        <>
                            <Button variant="contained"
                                    size="medium"
                                    onClick={handleValidateClicked}
                                    disabled={!isBoardFull}>
                                Validate
                            </Button>
                            <Button variant="contained"
                                    size="medium"
                                    color="secondary"
                                    disabled={!canResetBoard}
                                    onClick={handleResetAllClicked}>
                                Reset
                            </Button>
                        </>
                    )
                }
        </Stack>
    );
}