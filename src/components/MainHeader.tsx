import { AppBar, Toolbar, Typography } from '@mui/material';

export default function MainHeader() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">
          Work Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
