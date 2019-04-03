import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import {Switch, Route, Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

//Icons import 
import Divider from '@material-ui/core/Divider';

// Import logo and icons
import SJSUlogo from '../../../utils/img/sjsu-logo-gold.png'
import Profile from '../../../utils/img/profile.png'

import Arrow from '../../../utils/arrow.svg'
import Dashboard from '../../../utils/dashboard.svg'
import Library from '../../../utils/book.svg'
import Calender from '../../../utils/calender.svg'
import Help from '../../../utils/help.svg'
import Inbox from '../../../utils/inbox.svg'
import Course from '../../../utils/course.svg'

//Import the childnav and the main contents page
import ChildNav from './ChildNav'
import CourseMain from './CourseMain'
import DashboardMain from './DashboardMain'
import RegisterMain from './RegisterMain'
import ProfileMain from './ProfileMain'
import CreateMain from './CreateMain'
import AddCodeEnroll from './AddCodeEnroll'


const drawerWidth = 86;

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    height: '100vh',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  img_rotate: {
    transform: 'rotate3d(0, 1, 0, -180deg)',
    margin: 'auto',
    'transition-property': 'all',
    'transition-duration': '0.4s',
    'transition-timing-function': 'ease',
    'transition-delay': '0s',
    },
  menu_icon_svg_open: {
    paddingLeft: '0px',
    width: '80px',
    height: '40px',
  },
  menu_icon_svg: {
    width: '24px',
    height: '24px',
  },
  menu_icon_svg_logo: {
    width: '56px',
    height: '28px',
  },
  menu_item_name: {
    fontSize: '0.85em',
    color: '#ffffff !important',
},
  profileImg_open: {
    width: '48px',
    height: '40px',
  },
  profileImg: {
    width: '32px',
    height: '32px',
  },
  flex_clm: {
    'display': 'flex',
    'flex-direction': 'column',
    paddingTop: '8px',
    paddingBottom: '7px',
},
  logo_sjsu: {
    'display': 'flex',
    'flex-direction': 'column',
    paddingLeft: '16px',
    paddingTop: '7px',
    paddingBottom: '7px',
},
  icon_set1: {
    marginRight: '0px'
  },
  my_z_index: {
        zIndex: 1400,
    },
  link : {
    textDecoration: 'none',
  }
});

class SideNav extends Component {

  componentDidMount(){

    // console.log("SideDrawer State = " + this.state)

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    // localStorage.setItem('selectedcourse', '');

    this.setState({
      SJSUID: decoded.SJSUID,
      FLAG: decoded.FLAG,
      FNAME: decoded.FNAME,
      LNAME: decoded.LNAME,
      PROFILEIMG: decoded.PROFILEIMG,
    })
  }

    constructor() {
        super()
        this.state = {
            open: true,
            rootDrawerWidth: 86,
            accountTabOpen: false,
            coursesTabOpen: false,
            openDashboard: false,
            SJSUID: '',
            FLAG: false,
            selectedCourse: '',
            PROFILEIMG: '',
            
        }
      }


      handleDrawerToggle = () => {
        if(this.state.open){
          this.setState({ open: false, rootDrawerWidth: 56 });
        }else{
            this.setState({ open: true, rootDrawerWidth: 84 });
        }

      };

      handleAccountDrawerToggle = () => {
        if(this.state.accountTabOpen){
            this.setState({ accountTabOpen: false, coursesTabOpen: false });
          }else{
              this.setState({ accountTabOpen: true, coursesTabOpen: false });
          }
      };

      handleCourseDrawerToggle = () => {
        if(this.state.coursesTabOpen){
            this.setState({ accountTabOpen: false, coursesTabOpen: false });
          }else{
              this.setState({ accountTabOpen: false, coursesTabOpen: true });
          }
      };

      getSelectedCourse = (course) => {
        // this.setState({selectedCourse: course});
        localStorage.setItem('selected', course);
      };

      handleDashboardClick = () => {
          this.setState({ openDashboard: true});
      }

      handleOpenProfile = () => {
        this.setState({ openDashboard: false});
      }
    

  render() {
        const { classes, theme } = this.props;

        return (
          <div className={classes.root}>
            <CssBaseline />
            
            
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, classes.my_z_index, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
              open={this.state.open}
            >
            
            {/* SJSU Icon */}
                    <ListItem className={classes.logo_sjsu} button style={{backgroundColor: 'white'}}>
                      <ListItemIcon className={classes.icon_set1} >
                          <img alt="sjsu" className={this.state.open? classes.menu_icon_svg_open : classes.menu_icon_svg_logo} src={SJSUlogo} />
                      </ListItemIcon>
                    </ListItem>

              <Divider />

              <List style={{textAlign: 'center', backgroundColor: '#0055a2', height: '100vh', paddingTop: '0px' }}>
                    {/* Account */}
                    <ListItem className={classes.flex_clm} onClick={this.handleAccountDrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <Avatar alt="Remy Sharp" src={this.state.PROFILEIMG} className={this.state.open? classes.profileImg_open : classes.profileImg} /> 
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Account</span>
                    </ListItem>

                    {/* Dashboard */}
                    <Link to="/student/dashboard" className={classes.link}>
                        <ListItem className={classes.flex_clm} onClick={this.handleDashboardClick} button >
                            <ListItemIcon className={classes.icon_set1} >
                                <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Dashboard} />
                            </ListItemIcon>
                            <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Dashboard</span>
                        </ListItem>
                    </Link>

                    {/* Courses */}
                    <ListItem className={classes.flex_clm} onClick={this.handleCourseDrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Course} />
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Courses</span>
                    </ListItem>

                    

                    {
                      this.state.FLAG ? 
                      
                      (
                        <Link to="/faculty/create" className={classes.link}>
                        <ListItem className={classes.flex_clm} button >
                            <ListItemIcon className={classes.icon_set1} >
                                <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Course} />
                            </ListItemIcon>
                            <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Create</span>
                        </ListItem>
                        </Link>
                        )
                      :
                      (
                      <Link to="/student/register" className={classes.link}>
                      <ListItem className={classes.flex_clm} button >
                          <ListItemIcon className={classes.icon_set1} >
                              <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Course} />
                          </ListItemIcon>
                          <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Register</span>
                      </ListItem>
                      </Link>
                      )
                    }

                    {/* Calender */}
                    <ListItem className={classes.flex_clm} onClick={this.handleChild1DrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Calender} /> 
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Calender</span>
                    </ListItem>

                    {/* Inbox */}
                    <ListItem className={classes.flex_clm} onClick={this.handleChild1DrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Inbox} /> 
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Inbox</span>
                    </ListItem>

                    {/* Help */}
                    <ListItem className={classes.flex_clm} onClick={this.handleChild1DrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Help} /> 
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Help</span>
                    </ListItem>

                    {/* Library */}
                    <ListItem className={classes.flex_clm} onClick={this.handleChild1DrawerToggle} button >
                        <ListItemIcon className={classes.icon_set1} >
                            <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Library} /> 
                        </ListItemIcon>
                        <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > Library</span>
                    </ListItem>

                    {/* Enroll Using Add Code */}
                    {
                      this.state.FLAG ? 
                      <div></div>
                      :
                      <Link to="/student/addcodeEnroll" className={classes.link}>
                        <ListItem className={classes.flex_clm} onClick={this.handleChild1DrawerToggle} button >
                            <ListItemIcon className={classes.icon_set1} >
                                <img alt="dashboard" className={this.state.open? classes.manu_icon_svg_open : classes.manu_icon_svg} src={Library} /> 
                            </ListItemIcon>
                            <span className={classNames(classes.menu_item_name, {[classes.hide]: !this.state.open,})}  > AddCode</span>
                        </ListItem>
                      </Link>
                    }

                    <div>
                    <IconButton onClick={this.handleDrawerToggle}>
                      {this.state.open ? <img className={classNames(classes.img_rotate, classes.menu_icon_svg)} alt="nav arrow" src={Arrow} /> : <img className={classes.menu_icon_svg} alt="nav arrow" src={Arrow} />}
                    </IconButton>
                  </div>

              </List>
              
            </Drawer>
            <main className={classes.content}>
                <ChildNav getSelectedCourse={this.getSelectedCourse} parentDrawer={this.state} handleAccountDrawerToggle={this.handleAccountDrawerToggle} handleCourseDrawerToggle={this.handleCourseDrawerToggle} openProfile={this.handleOpenProfile} ></ChildNav>

                <div className={classNames(classes.content)}>
                      {/* {this.state.openDashboard ?<Home /> : <InNav parentData={this.state}></InNav>}                     */}
                      <Route  path='/student/profile' 
                             render={()=> {
                              return <ProfileMain parentData={this.state}/>
                             }}
                      />

                      <Route  path='/student/dashboard' 
                             render={()=> {
                              return <DashboardMain parentData={this.state} getSelectedCourse={this.getSelectedCourse}/>
                             }}
                      />

                      <Route  path='/student/register' 
                              render={()=> {
                                return <RegisterMain parentData={this.state}/>
                              }}
                      />

                      <Route  path='/faculty/create' 
                              render={()=> {
                                return <CreateMain parentData={this.state}/>
                              }}
                      />

                      <Route path='/student/courses' 
                             render={()=> {
                              return <CourseMain parentData={this.state}/>
                             }}
                      />    

                      <Route path='/student/addcodeEnroll' 
                             render={()=> {
                              return <AddCodeEnroll parentData={this.state}/>
                             }}
                      />                          
                </div>
            </main>
          </div>
    );
  }
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(SideNav);