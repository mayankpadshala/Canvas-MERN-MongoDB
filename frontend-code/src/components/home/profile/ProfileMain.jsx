import React, { Component } from 'react'
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';


//Import Pages
import Profile from './profile'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
      backgroundColor: '#FFFFFF',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#008ee2',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    //   marginTop: '50px',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
//   my changes start
marginTop: '64px',
//   my changes end
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  contentOpen: {
    flexGrow: 1,
    padding: theme.spacing.unit * 16,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentClose: {
    flexGrow: 1,
    padding: theme.spacing.unit * 12,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  margin_set_open:{
      marginLeft: 86,
    },
    margin_set_close:{
        marginLeft: '72px',
  },
  padding_set_open:{
      paddingLeft: 86,
    },
    padding_set_close:{
        paddingLeft: 72,
  },
  left_set_open:{
      left: 84,
    },
    left_set_close:{
        left: 72,
  },
    drawerPaperOpen: {
        marginTop: '64px',
        marginLeft: '84px',
        width: drawerWidth,
    },
    drawerPaperClose: {
        marginTop: '64px',
        marginLeft: '72px',
        width: drawerWidth,
    },
    textColor1:{
        color: '#008ee2',
    },
    link: {
      textDecoration: 'none',
    }
});

class ProfileMain extends Component {

    state = {
        open: true,
      };

      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };
      handleDrawerToggleMenu = () => {
        if (this.state.open) {
            this.setState({ open: false });
        }else{
            this.setState({ open: true });
        }
      };


  render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        let {parentDrawer} = this.state;
        //Side Navigation Inside
        const insideSideNav = (
            <div>
                <List>
                    {[['Profile', ''], ['Files', ''], ['Settings', ''], ['Notifications', ''] ].map((text, index) => (
                        <Link to="/dashboard/profile" className={classes.link}>
                          <ListItem button key={text[0]}>
                              <ListItemText primary={text[0]} />
                          </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        );

        // The Main part inside the code
        const main = (
            <div>

                    <Route path="/" component={Profile} /> 
          
            </div>
        );

        if (this.props.nav.sideNav) {
            return (
                <div className={classNames(classes.root)}>
                    <CssBaseline />
                    <AppBar
                      position="fixed"
                      className={classNames(classes.appBar, classes.padding_set_open, {
                        // [classes.appBarShift]: open,
                      })}
                    >
                      {/* <Toolbar disableGutters={!open}> */}
                      <Toolbar disableGutters={false}>
                        <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={this.handleDrawerToggleMenu}
                          className={classNames(classes.menuButton)}
                        //   className={classNames(classes.menuButton, open && classes.hide)}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classNames(classes.textColor1)} noWrap>
                          Mayank Padshala's Profile
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    
                    <Drawer
                    className={classNames(classes.drawer)}
                    //   className={classes.drawer}
                      variant="persistent"
                      anchor="left"
                    //   open={parentDrawer}
                      open={open}
                      
                      classes={{
                        paper: classes.drawerPaperOpen,
                      }}
                    >
                        
                      {insideSideNav}
                    </Drawer>
                    <main
                        className={classNames(classes.contentOpen, {
                            [classes.contentShift]: open,
                        })}
                    >
                        {main}
                    </main>
                  </div>
                );
        }else{
            return (
                <div className={classNames(classes.root)}>
                    <CssBaseline />
                    <AppBar
                      position="fixed"
                      className={classNames(classes.appBar, classes.padding_set_close, {
                        // [classes.appBarShift]: open,
                      })}
                    >
                      {/* <Toolbar disableGutters={!open}> */}
                      <Toolbar disableGutters={false}>
                        <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={this.handleDrawerToggleMenu}
                          className={classNames(classes.menuButton)}
                        //   className={classNames(classes.menuButton, open && classes.hide)}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classNames(classes.textColor1)} noWrap>
                          Mayank Padshala's Profile
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    
                    <Drawer
                    className={classNames(classes.drawer, classes.left_set_open)}
                    //   className={classes.drawer}
                      variant="persistent"
                      anchor="left"
                    //   open={parentDrawer}
                      open={open}
                      
                      classes={{
                        paper: classes.drawerPaperClose,
                      }}
                    >
                      {insideSideNav}
                    </Drawer>
                    <main
                      className={classNames(classes.contentClose, {
                        [classes.contentShift]: open,
                      })}
                    >
                      {main}
                    </main>
                  </div>
                );
        }
        
      }
    }
    
    ProfileMain.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,    
      nav: PropTypes.object.isRequired,
    };
        
    const mapStateToProps = (state) => ({
      nav : state.nav,
    })

    
export default connect(mapStateToProps, {  })(withStyles(styles)(withRouter(ProfileMain)));