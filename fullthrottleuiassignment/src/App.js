import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar } from '@material-ui/core';


import UserDetails from "./UserDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}


function App() {
  return (
    <React.Fragment>
      <ButtonAppBar />
      <UserDetails />
    </React.Fragment>
  );
}

export default App;
