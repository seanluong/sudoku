import { Button, ButtonGroup, Fab, FormControlLabel, Stack, Switch, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { useShowErrorsContext } from "../context/ShowErrorsContext";
import { CellsState, newGame, resetAllCells, validateAll } from "../reducers/CellsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { fetchPuzzle, Puzzle } from "../utils/puzzleFetcher";

export const GameControls = () => {
    const dispatch = useDispatch();
    const { cells, gameStatus } = useSelector<SudokuAppState, CellsState>(state => state.cells);
    const { showErrors, toggleShowErrors } = useShowErrorsContext();

    const handleResetAllClicked = (event: React.MouseEvent) => {
        dispatch(resetAllCells())
    }
    const handleValidateClicked = (event: React.MouseEvent) => {
        dispatch(validateAll());
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
    const buttonFontSize = { xs: "0.5rem", sm: "0.8rem", md: "1rem" };
    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Fab color="primary"
                    aria-label="add"
                    size="medium"
                    onClick={handleNewGameClicked}
                    sx={{
                        position: "absolute",
                        bottom: "2rem",
                        right: "2rem",
                    }}>
                    <AddIcon />
                </Fab>
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
                            <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
                                <Button size="medium"
                                        onClick={handleValidateClicked}
                                        disabled={!isBoardFull}
                                        sx={{
                                            fontSize: buttonFontSize,
                                        }}>
                                    Validate
                                </Button>
                                <Button size="medium"
                                        disabled={!canResetBoard}
                                        onClick={handleResetAllClicked}
                                        sx={{
                                            fontSize: buttonFontSize,
                                        }}>
                                    Reset All
                                </Button>
                            </ButtonGroup>
                            <FormControlLabel
                                label={
                                    <Typography variant="button"
                                                sx={{
                                                    fontSize: buttonFontSize
                                                }}>
                                        Show Errors
                                    </Typography>
                                }
                                control={
                                    <Switch checked={showErrors} size="medium" onChange={toggleShowErrors} name="showErrors" />
                                }
                            />
                        </>
                    )
                }
        </Stack>
    );
}