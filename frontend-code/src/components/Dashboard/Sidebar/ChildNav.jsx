import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import Profile from '../../../utils/img/profile.png';
import Close from '../../../utils/close.svg'
import jwt_decode from 'jwt-decode';

import { getEnrolledCourses, getCoursesbyID } from '../../UserFunctions';

const drawerWidth = 240;

const styles = theme => ({
  
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  avatar: {
    margin: 30,
  },
  //   My styles
  lettersAvtar: {
    padding: 30,
    marginTop: 30,
    color: '#0055a2',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    fontSize: '27px',
    fontWeight: 'bold',
  },
  setMarginClose: {
    marginLeft: "72px",
  },
  setMarginOpen: {
    marginLeft: '86px',
  },
  logout_button: {
      marginBottom: "30px"
  },
  profileImg: {
    marginTop: '64px',
    width: '96px',
    height: '96px',
  },
  closeBtn: {
    display: 'flex',
    flexDirection: 'row-reverse'
}
});

class ChildNav extends React.Component {

  getUserCourses() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    
    this.setState({
      PROFILEIMG: decoded.PROFILEIMG,
      FNAME: decoded.FNAME,
      LNAME: decoded.LNAME,
    })

    const user = {
      SJSUID: decoded.SJSUID,
      FLAG: decoded.FLAG,
    }

    !decoded.FLAG ? 
    getEnrolledCourses(user)
    .then(res => {
      // console.log(res);
      var result = res.course.filter(course => course.enrollment != null);
      this.setState({courses: result});
    }) 
    :
    getCoursesbyID(user)
    .then(res => {
      // console.log(res);
      var result = res.course;
      // console.log(result);
      this.setState({courses: result});
    })
  }

  componentWillMount() {
    this.getUserCourses();
  }

  constructor (props) {
    super(props)
    this.state = {
        account: false,
        course: false,
        selectedCourse: '',
        courses: [],
        PROFILEIMG: '',
        FNAME: '',
        LNAME: ''
    }
  }


  componentWillReceiveProps(props) {
    this.setState({
        account: props.parentDrawer.accountTabOpen,
        course: props.parentDrawer.coursesTabOpen,
    });
    this.getUserCourses();
  }

  logout = () => {
    // console.log("UserToken" + localStorage.getItem('usertoken'));
    localStorage.setItem('usertoken', '');

  }


  // toggleAccountDrawer = (open) => () => {
  //   this.setState({
  //     account: open
  //   });
  // };
  // toggleCourseDrawer = (open) => () => {
  //   this.setState({
  //       course: open
  //   });
  // };

  render() {

    // this.selectCourse();
    // console.log(this.state.courses)
    const { classes } = this.props;
    const accountNav = (
      <div className={classNames(classes.list ,this.props.parentDrawer.open ? classes.setMarginOpen : classes.setMarginClose)}>
                <div className={classes.closeBtn}>
                    <div  style={{border: '2px solid #0055a2', borderRadius: '10%', color:'#0055a2', padding: '4px', margin: '8px'}}>
                      <img src={Close}></img>        
                    </div>
                </div>
        <Grid container justify = "center" direction="column" alignItems="center">
          {/* <Avatar className={classes.lettersAvtar}>MP</Avatar> */}
          <Avatar alt="Remy Sharp" src={this.state.PROFILEIMG} className={classes.profileImg} /> 
          <Typography variant="h5" gutterBottom>
            {this.state.FNAME + " " + this.state.LNAME}
          </Typography>
          <Link
              style={{textDecoration: 'none'}}   
              to="/login"  
            >
              <Button variant="outlined" className={classNames(classes.button, classes.logout_button)} onClick={this.logout}>
                Log Out
              </Button>
            </Link>
        </Grid>
       
        <Divider />
        <List>
            
          {[['Profile', 'profile'], ['Settings', 'settings'], ['Notifications', 'notification'], ['Files', 'files'], ['ePortfolios', 'eportfolio']].map((text, index) => (
            <Link
              key={`${text[1]}`}
              style={{textDecoration: 'none'}}   
              to={"/student/" + text[1]} 
            >
            <ListItem button key={text[1]}>
              <ListItemText primary={text[0]} />
            </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
    const courseListNav = (
      <div className={classNames(classes.list ,this.props.parentDrawer.open ? classes.setMarginOpen : classes.setMarginClose)}>
            <div className={classes.closeBtn}>
                    <div  style={{border: '2px solid #0055a2', borderRadius: '10%', color:'#0055a2', padding: '4px', margin: '8px'}}>
                      <img src={Close}></img>        
                    </div>
            </div>
        <Grid container justify = "center" direction="column" alignItems="center">    
          <Typography variant="h5" gutterBottom>
            Courses
          </Typography>
        </Grid>

        <Divider />
        
            {
              Object.keys(this.state.courses).map((key, index) => (
              <Link
              key={index}
              style={{textDecoration: 'none'}}   
              to="/student/courses/assignments" 
            >
             <ListItem button onClick={() => {this.setState({selectedCourse: this.state.courses[key].COURSEID}); this.props.getSelectedCourse(this.state.courses[key].COURSEID)}}>
               <ListItemText primary={this.state.courses[key].DEPARTMENT + " " + this.state.courses[key].COURSEID + " : " +this.state.courses[key].CNAME + " "  }/>
               {/* <Button onClick={this.selectCourse(text[1])}> Select</Button> */}
             </ListItem>
            </Link>
          ))}
          {/* </List> */}
        <Divider />
      </div>
    );
    if(this.props.parentDrawer.accountTabOpen){
      return (
          <div>
            <Drawer open={this.props.parentDrawer.accountTabOpen} onClose={this.props.handleAccountDrawerToggle}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.props.handleAccountDrawerToggle}
                onKeyDown={this.props.handleAccountDrawerToggle}
              >
              {accountNav}
              </div>
            </Drawer>
          </div>
        );
    }else if(this.props.parentDrawer.coursesTabOpen){
      return (
          <div>
            <Drawer open={this.props.parentDrawer.coursesTabOpen} onClose={this.props.handleCourseDrawerToggle}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.props.handleCourseDrawerToggle}
                onKeyDown={this.props.handleCourseDrawerToggle}
              >
              {courseListNav}
              </div>
            </Drawer>
          </div>
        );
    }else{
      return (
          <div>
          </div>
        );
    }

  }
}

ChildNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChildNav);