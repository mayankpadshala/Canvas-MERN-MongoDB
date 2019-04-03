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

import { getbyCOURSEID, getCourse } from '../../UserFunctions'
import jwt_decode from 'jwt-decode';


//Import Pages
import Assignment from '../pages/assignments'
import Announcements from '../pages/announcements'
import Grades from '../pages/grades';
import People from '../pages/people'
import Files from '../pages/files'
import Quizzes from '../pages/quizzes'
import AddCode from '../pages/addcode'

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
    }
});

class CourseMain extends Component {

    state = {
        open: false,
        parentDrawer: true,
        selectedCourse: '',
        course: [], 
        FLAG: false,
      };

      componentWillMount() {

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        const crsID = localStorage.getItem('selected');

        this.setState({
          parentDrawer: this.props.parentData.open,
          selectedCourse: crsID,
          FLAG: decoded.FLAG,
      });

        
      }

      componentDidMount() {
        const cours = {
          COURSEID: this.state.selectedCourse,
          }
          getbyCOURSEID(cours)
          .then(res => {
            this.setState({course: res.course});
            // console.log(this.state.course);
            // console.log(this.state.course.course);
          })
      }

      // componentWillReceiveProps(props) {
        
      //   this.setState({
      //       parentDrawer: props.parentData.open,
      //       selectedCourse: props.parentData.selectedCourse,
            
      //   });

      //   const cours = {
      //     COURSEID: props.parentData.selectedCourse  | '266',
      //     }
      //     getbyCOURSEID(cours)
      //     .then(res => {
      //       this.setState({course: res.course});
      //       // console.log(this.state.course);
      //       // console.log(this.state.course.course);
      //     })

       
      // }  

      shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextState);
        // console.log(nextProps);
        // console.log(nextState + " &&&&&&&&&&&&&&&&&&&&&&&&&&& " + nextProps);
        return true
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


  render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        let {parentDrawer} = this.state;
        //Side Navigation Inside
        const insideSideNav = (
            <div>
                {/* {console.log(this.props)} */}
                <List>
                    {[['Assignments', 'assignments'], ['Announcement', 'announcement'], ['Grades', 'grades'], ['People', 'people'], ['Files', 'files'], ['Quizzes', 'quizzes']].map((text, index) => (
                        <Link to={text[1]} className={classes.link} key={text[0]}>
                          <ListItem button key={text[0]}>
                              <ListItemText primary={text[0]} key={text[0]}/>
                          </ListItem>
                        </Link>
                    ))}
                
                    {
                      this.state.FLAG ? 
                      <Link to='addcode' className={classes.link} >
                          <ListItem button>
                              <ListItemText primary={'Generate Add Code'}/>
                          </ListItem>
                        </Link>
                        :
                        <div></div>
                    }
                        
                </List>
            </div>
        );

        // The Main part inside the code
        const main = (
            <div>   
                    <Route  path='/student/courses/assignments' 
                             render={()=> {
                              return <Assignment COURSEID={this.state.selectedCourse}/>
                             }}
                    />

                    <Route  path='/student/courses/announcement' 
                             render={()=> {
                              return <Announcements COURSEID={this.state.selectedCourse}/>
                             }}
                    />
                    <Route  path='/student/courses/grades' 
                             render={()=> {
                              return <Grades COURSEID={this.state.selectedCourse}/>
                             }}
                    />

                    <Route  path='/student/courses/people' 
                             render={()=> {
                              return <People COURSEID={this.state.selectedCourse}/>
                             }}
                    />
                    <Route  path='/student/courses/files' 
                             render={()=> {
                              return <Files COURSEID={this.state.selectedCourse}/>
                             }}
                    />

                    <Route  path='/student/courses/quizzes' 
                             render={()=> {
                              return <Quizzes COURSEID={this.state.selectedCourse}/>
                             }}
                    />

                  <Route  path='/student/courses/addcode' 
                             render={()=> {
                              return <AddCode COURSEID={this.state.selectedCourse}/>
                             }}
                    />
                                      
            </div>
        );

        if (parentDrawer) {
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
                        {/* {this.props.parentData.selectedCourse} */}
                        {this.state.course.CNAME + ' : ' + this.state.course.COURSEID}
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
                          {this.props.selectedCourse}
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
    
    CourseMain.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
    };

    
export default withStyles(styles, { withTheme: true })(CourseMain);
