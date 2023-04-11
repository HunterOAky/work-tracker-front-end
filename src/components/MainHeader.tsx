import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks'
import authSlice, { loggedIn } from './authSlice';
import { useAuth0 } from '@auth0/auth0-react'

export default function MainHeader() {
  const dispatch = useAppDispatch();

  const {logout} = useAuth0();
  const loggedInValue = useAppSelector((state) => state.auth.loggedIn);

  const logOutEvent = () => {
    dispatch(loggedIn(false));
    logout()
  }

  const logOutButton = (
    <Button onClick={()=>logOutEvent()}>
      Log Out
    </Button>
  )

  return (
    <AppBar position="sticky">
      <Toolbar sx={{backgroundColor:"#6b9080"}}>
        <Typography variant="h4">
          Work Tracker
        </Typography>
        {loggedInValue && logOutButton}
      </Toolbar>
    </AppBar>
  );
}
