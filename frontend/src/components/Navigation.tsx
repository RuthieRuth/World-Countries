import { AppBar, Button, Toolbar } from '@mui/material';
//import {useAuth} from '../context/auth-context';
import {useAuth} from '../context/AuthContext';
import {Link as RouterLink} from 'react-router-dom';

export const Navigation = () => {
    const {user, signOut} = useAuth();

    return (

        <AppBar position="static" sx={{mb:3}}>
            <Toolbar>
                <Button color="inherit" component={RouterLink} to="/">Home</Button>
                <Button color="inherit" component={RouterLink} to="/test">Test</Button>
                {user ? (<Button color="inherit" onClick={signOut}>Logout ({user.email})</Button>)
                      : (<Button color="inherit" component={RouterLink} to="/login">Login</Button>)
                }
            </Toolbar>
        </AppBar>

    )
};