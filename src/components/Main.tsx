import { Stack } from '@mui/material';
import { SetResetCellControls } from './SetResetCellControls';
import { GameControls } from './GameControls';
import { Sudoku } from './Sudoku';

export const Main = () => {
    return (
        <Stack component={"main"} sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw",
            paddingTop: "1rem",
        }} spacing={3}>
            <GameControls />
            <Sudoku />
            <SetResetCellControls />
        </Stack>
    );
}