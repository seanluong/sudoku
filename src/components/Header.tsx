import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, IconButton, Toolbar } from '@mui/material';

export const Header = () => {
    const gitHubUrl = "https://github.com/seanluong/sudoku";

return (
        <AppBar position='static' data-testid='header'>
            <Toolbar className='justify-center' data-testid='toolbar'>
                <IconButton href={gitHubUrl} target={"_blank"} rel="noreferrer noopener" data-testid='icon-button'>
                    <GitHubIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}