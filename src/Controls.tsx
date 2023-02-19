import { Box, Button, Stack, TextField } from "@mui/material"

export interface ControlsProps {

}

export const Controls = () => {

    return (
        <Stack direction={"row"} 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <TextField variant="filled"/>
            <Button variant="contained">Set</Button>
            <Button variant="contained" color="secondary">Reset</Button>
        </Stack>
    );
}