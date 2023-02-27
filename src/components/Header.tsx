import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, IconButton, Toolbar } from '@mui/material';

export const Header = () => {
    // TODO: update the github link
    const gitHubUrl = "/TBD";

    return (
        <>
            <AppBar position='static' sx={{
            }}>
                <Toolbar sx={{
                    justifyContent: "center",
                }}>
                    <IconButton href={gitHubUrl} target={"_blank"} rel="noreferrer noopener">
                        <GitHubIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}