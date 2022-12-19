import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {
  Link,
} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {

  },
  title: {

  },
  root: {
    background: theme.palette.primary.dark,
  },
}));

  
const MenuBar = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Jari Reponen
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          <ListItem button key="home" component={Link} to="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="publicTransport" component={Link} to="/joukkoliikenne" onClick={handleDrawerClose}>
            <ListItemText primary="Public Transport" />
          </ListItem>
          <ListItem button key="rogainingPage" component={Link} to="/rogaining" onClick={handleDrawerClose}>
            <ListItemText primary="Rogaining" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default MenuBar;
