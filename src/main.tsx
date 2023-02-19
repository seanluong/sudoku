import { Stack } from '@mui/material';
import { Controls } from './Controls';
import { Sudoku } from './Sudoku';


export const Main = () => {
    // TODO: update the github link
    const gitHubUrl = "/TBD";

    return (
        <Stack component={"main"} sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw",
            paddingTop: "1rem",
        }} spacing={3}>
            <Sudoku />
            <Controls />
        </Stack>
    );
}