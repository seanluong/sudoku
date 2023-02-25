import { Button, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { CellsState, resetAllCells, validate } from "./reducers/CellsReducer";
import { SudokuAppState } from "./reducers/reducer";

export const GameControls = () => {
    const dispatch = useDispatch();
    const { cells, gameStatus } = useSelector<SudokuAppState, CellsState>(state => state.cells);

    const handleResetAllClicked = (event: React.MouseEvent) => {
        dispatch(resetAllCells({}))
    }
    const handleValidateClicked = (event: React.MouseEvent) => {
        dispatch(validate({}));
    }

    const isBoardFull = Object.keys(cells).length === 81;
    const gameSolved = gameStatus === 'SOLVED';
    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Button variant="contained" onClick={handleValidateClicked}>New Game</Button>
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
                                disabled={!isBoardFull}>Validate</Button>
                            <Button variant="contained"
                                color="secondary"
                                onClick={handleResetAllClicked}>
                                Reset All
                            </Button>
                        </>
                    )
                }
        </Stack>
    );
}