import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link , withRouter} from 'react-router-dom'

import Close from '../../utils/close.svg'
import jwt_decode from 'jwt-decode';

import {connect} from 'react-redux';
import { getCourses, changeChildNavAccount, changeChildNavCourse } from '../../redux/actions/navActions'

import {logoutUser} from '../../redux/actions/authActions';



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
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    
    this.setState({
      avatar: decoded.avatar,
      fname: decoded.fname,
      lname: decoded.lname,
    })

  }


  constructor (props) {
    super(props)
    this.state = {
        selectedCourse: '',
        courses: [],
        avatar: '',
        fname: '',
        lname: ''
    }
  }

  render() {

    // this.selectCourse();
    // console.log(this.props)
    const { classes } = this.props;
    const accountNav = (
      <div className={classNames(classes.list ,this.props.nav.childNavAccount ? classes.setMarginOpen : classes.setMarginClose)}>
                <div className={classes.closeBtn}>
                    <div  style={{border: '2px solid #0055a2', borderRadius: '10%', color:'#0055a2', padding: '4px', margin: '8px'}}>
                      <img src={Close}></img>        
                    </div>
                </div>
        <Grid container justify = "center" direction="column" alignItems="center">
          {/* <Avatar className={classes.lettersAvtar}>MP</Avatar> */}
          <Avatar alt="Remy Sharp" src={this.state.avatar} className={classes.profileImg} /> 
          <Typography variant="h5" gutterBottom>
            {this.state.fname + " " + this.state.lname}
          </Typography>
          <Link
              style={{textDecoration: 'none'}}   
              to="/"  
            >
              <Button variant="outlined" className={classNames(classes.button, classes.logout_button)} onClick={() => this.props.logoutUser()}>
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
              to={"/dashboard/" + text[1]} 
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
      <div className={classNames(classes.list ,this.props.nav.childNavCourse ? classes.setMarginOpen : classes.setMarginClose)}>
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
              Object.keys(this.props.userProfile.enrolledCourses).map((key, index) => (
              <Link
              key={index}
              style={{textDecoration: 'none'}}   
              to={`/dashboard/courses/?id=${this.props.userProfile.enrolledCourses[key].course._id}` }
            >
             <ListItem button >
               <ListItemText primary={this.props.userProfile.enrolledCourses[key].course.department + " " + this.props.userProfile.enrolledCourses[key].course.courseId + " : " +this.props.userProfile.enrolledCourses[key].course.courseName + " "  }/>
               {/* <Button onClick={this.selectCourse(text[1])}> Select</Button> */}
             </ListItem>
            </Link>
          ))}
          {/* </List> */}
        <Divider />
      </div>
    );
    if(this.props.nav.childNavAccount){
      return (
          <div>
            <Drawer open={this.props.nav.childNavAccount} onClose={this.props.changeChildNavAccount}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.props.changeChildNavAccount}
                onKeyDown={this.props.changeChildNavAccount}
              >
              {accountNav}
              </div>
            </Drawer>
          </div>
        );
    }else if(this.props.nav.childNavCourse){
      return (
          <div>
            <Drawer open={this.props.nav.childNavCourse} onClose={this.props.changeChildNavCourse}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.props.changeChildNavCourse}
                onKeyDown={this.props.changeChildNavCourse}
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
  nav: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile : state.userProfile,
  nav : state.nav,
  auth : state.auth
})
export default connect(mapStateToProps, { getCourses,  changeChildNavAccount, changeChildNavCourse , logoutUser })(withStyles(styles)(withRouter(ChildNav)));