import React, { Component } from 'react'
import {Route, Switch, Link} from 'react-router-dom'
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
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import jwt_decode from 'jwt-decode';

import {enrollUsingAddCode} from '../../UserFunctions'


//Import Pages
import Home from '../pages/home';
import CourseCreate from '../pages/courseCreate'

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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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
    },
    main : {
      boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    },
    paper: {
        margin: '32px',
    },
    post: {
      padding: '12px',
      marginTop: theme.spacing.unit * 3,
      backgroundColor: '#007dc1',
      color: '#fff !important',
      marginBottom: theme.spacing.unit * 3,
    },
});

class AddCodeEnroll extends Component {

    componentWillMount() {
      const token = localStorage.usertoken;
      
      const decoded = jwt_decode(token);
      console.log(decoded.SJSUID);

      this.setState({SJSUID: decoded.SJSUID});
    }

    state = {
        open: false,
        parentDrawer: true,
        COURSEID: '',
        ADDCODE: '',
        SJSUID: '',
        result: ''
      };

      componentWillReceiveProps(props) {
        this.setState({
            parentDrawer: props.parentData.open,
        });
        // console.log(props.parentData.open)
        // console.log(this.state.parentDrawer)
      }
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

      onSubmit = () => {
        const data = {
          COURSEID: this.state.COURSEID,
          ADDCODE: this.state.ADDCODE,
          SJSUID: this.state.SJSUID,
        }
        enrollUsingAddCode(data)
        .then(res => {
          console.log(res);
          if(res.data.status){
            this.setState({result: res.data.status})
          } else {
            this.setState({result: res.data.error})
          }
        })
      }

      onChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }


  render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        let {parentDrawer} = this.state;
        //Side Navigation Inside
        

        // The Main part inside the code
        const main = (
            <div>
                    <Paper className={classes.main}>
                    <div>
                        <h1>Enroll using Add Code</h1>
                    </div>
                    <div>
                    <Paper className={classes.paper}>
                        {/* <form className={classes.paper} onSubmit={this.onSubmit}> */}
                        <div className={classes.paper}>
                        <div style={{    display: "flex", flexDirection: "column", width: '30%'}}>
                            <div className={classes.heading}>COURSEID : </div>
                            <TextField
                                // id="outlined-multiline-static
                                // multiline
                                required='true'
                                rows="1"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="COURSEID"
                                onChange={this.onChange}
                            />

                            <div className={classes.heading}>ADDCODE : </div>
                            <TextField
                                // id="outlined-multiline-static
                                // multiline
                                required='true'
                                rows="1"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="ADDCODE"
                                onChange={this.onChange}
                            />


                            {/* <Paper className={classes.header}> */}
                            <div className={classes.heading}>
                                <Button variant="contained" className={classes.post} onClick={this.onSubmit}>
                                    Enroll
                                </Button>
                                </div>
                            {/* </Paper> */}
                            </div>
                          </div>
                        {/* </form> */}
                    </Paper>
                    <h2>
                      {this.state.result}
                    </h2>
                </div>
            </Paper>
                                      
            </div>
        );

        if (parentDrawer) {
            return (
                <div className={classNames(classes.root)}>
                    <CssBaseline />
                    
                    
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
                        
                      {/* {insideSideNav} */}
                    </Drawer>
                    <main
                        className={classNames(classes.content, {
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
                      {/* {insideSideNav} */}
                    </Drawer>
                    <main
                      className={classNames(classes.content, {
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
    
    AddCodeEnroll.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
    };

    
export default withStyles(styles, { withTheme: true })(AddCodeEnroll);
