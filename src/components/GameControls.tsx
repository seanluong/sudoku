import { Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellsState, newGame, resetAllCells, validate } from "../reducers/CellsReducer";
import { SudokuAppState } from "../reducers/reducer";
import { fetchPuzzle } from "../utils/puzzleFetcher";

// Can only get a new game after some time
const CAN_CHANGE_GAME_TIMEOUT = 1000;

export const GameControls = () => {
    const dispatch = useDispatch();
    const { cells, gameStatus } = useSelector<SudokuAppState, CellsState>(state => state.cells);
    const [canChangeGame, setCanChangeGame] = useState<boolean>(false);

    useEffect(() => {
        if (gameStatus === 'SOLVED') {
            setCanChangeGame(true);
        } else {
            setCanChangeGame(false);
            const timer = setTimeout(() => {
                setCanChangeGame(true);
            }, CAN_CHANGE_GAME_TIMEOUT);
    
            return () => clearTimeout(timer);
        }
    }, [gameStatus]);

    const handleResetAllClicked = (event: React.MouseEvent) => {
        dispatch(resetAllCells())
    }
    const handleValidateClicked = (event: React.MouseEvent) => {
        dispatch(validate());
    }
    const handleNewGameClicked = (event: React.MouseEvent) => {
        // TODO display UI based on the status of loading a new puzzle
        fetchPuzzle().then(() => {
            dispatch(newGame());
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
                        disabled={!canChangeGame}
                        onClick={handleNewGameClicked}>
                    New Game
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
                                    onClick={handleValidateClicked}
                                    disabled={!isBoardFull}>
                                Validate
                            </Button>
                            <Button variant="contained"
                                    color="secondary"
                                    disabled={!canResetBoard}
                                    onClick={handleResetAllClicked}>
                                Reset All
                            </Button>
                        </>
                    )
                }
        </Stack>
    );
}