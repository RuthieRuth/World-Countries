import { AppBar, Box, Button, Toolbar } from '@mui/material';
import {useAuth} from '../context/AuthContext';
import {Link as RouterLink} from 'react-router-dom';
import { Lock } from '@mui/icons-material';

export const Navigation = () => {
    const {user, signOut} = useAuth();

    return (
        < >
        <AppBar position="static" sx={{mb:3}}>
            <Toolbar>
                <Box sx={{ flexGrow:1}} >
                <Button color="inherit" component={RouterLink} to="/">Home</Button>
                <Button color="inherit" component={RouterLink} to="/test">Test</Button>
                <Button color="inherit" component={RouterLink} to="/protected" startIcon={<Lock/>}>Protected Data</Button>
                <Button color="inherit" component={RouterLink} to="/countries">Countries</Button>
                {user && (<Button color="inherit" component={RouterLink} to="/favourites" >Favourites</Button>)}
                </Box>

                {user ? (<Button color="inherit" onClick={signOut}>Logout ({user.email})</Button>)
                      : (<Button color="inherit" component={RouterLink} to="/login">Login</Button>)
                }
                {/* if  user is logged in then they see   startIcon="favourites"*/}
            </Toolbar>
        </AppBar>
        </>
    )
};