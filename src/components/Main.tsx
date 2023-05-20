import { Stack } from '@mui/material';
import { SetResetCellControls } from './SetResetCellControls';
import { GameControls } from './GameControls';
import { Sudoku } from './Sudoku';

export const Main = () => {
    return (
        <Stack
            component={"main"}
            className='items-center pt-3 w-screen'
            gap={3}
        >
            <GameControls />
            <Sudoku />
            <SetResetCellControls />
        </Stack>
    );
}