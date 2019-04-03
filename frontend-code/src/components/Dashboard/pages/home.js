import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom'

import { getEnrolledCourses, getCoursesbyID } from '../../UserFunctions';


const styles = {
  card: {
    maxWidth: 256,
  },
  cardHeading: {
    width: '100%',
    boxShadow: 'none',
    background: 'none'
  },
  media: {
    height: 140,
  },
  heading: {
    fontSize: '32px',
    
  },
  link: {
    textDecoration: 'none',
  }
};


const ITEM_HEIGHT = 48;

class Home extends React.Component {

  getUserCourses() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    console.log(decoded);
    

    const user = {
      SJSUID: decoded.SJSUID,
      FLAG: decoded.FLAG,
    }

    !decoded.FLAG ? 
    getEnrolledCourses(user)
    .then(res => {
      console.log(res);
      var result = res.course.filter(course => course.enrollment != null);
      this.setState({courses: result});
    }) 
    :
    getCoursesbyID(user)
    .then(res => {
      console.log(res);
      var result = res.course;
      // console.log(result);
      this.setState({courses: result});
    })
  }
  
  componentWillMount(){

   this.getUserCourses();

  }

  state = {
    anchorEl: null,
    courses: [],
    redirect: false,
    selectedCourse: '',
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }




  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);    

    const menuVert = (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
         
            

            <Link to="/student/profile" className={classes.link}>
              <MenuItem onClick={this.handleClose}>
                 Profile
              </MenuItem>
            </Link>

            <Link to="/student/settings" className={classes.link}>
              <MenuItem onClick={this.handleClose}>
                 Settings
              </MenuItem>
            </Link>

        
        </Menu>
      </div>
    )

  return (
        <div>
          {/* {console.log(this.state.courses)}   */}
            <Grid
              container
              direction="column"
              item xs={10}
            > 
            
              <Card className={classes.cardHeading}>
                  <CardHeader
                    action={
                      menuVert
                      }
                    title="Dashboard"
                  />
              </Card>
              <Divider/>
            </Grid>
          
          <Grid
            container
            direction="row"
            item xs={9}
            // justify="space-evenly"
            // alignItems="center"
          >
            {
              Object.keys(this.state.courses).length === 0 ? 
                <div style={{margin: '64px', color:'red', fontWeight: 'bold'}}>
                  You have no courses to display
                </div> 
                : 
                <div></div>}
          
            {
              Object.keys(this.state.courses).map((key, index) => (            
              <Grid item xs={4} key={key} >
                
                    <Card className={classes.card} style={{margin: '16px'}} >
                      <Link
                        key={index}
                        style={{textDecoration: 'none'}}   
                        to="/student/courses/assignments" 
                        onClick={() => {this.props.getSelectedCourse(this.state.courses[key].COURSEID)}}
                      >
                      <CardActionArea>
                        <CardMedia
                          style={{background: this.getRandomColor()}}
                          className={classes.media}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          {/* <Typography gutterBottom variant="h5" component="h2">
                          {this.state.courses[key].DEPARTMENT + " " + this.state.courses[key].COURSEID + " : " +this.state.courses[key].CNAME + " "  }
                          </Typography> */}
                          <div>
                            <h2>
                              <span>{this.state.courses[key].DEPARTMENT}</span>
                            </h2>
                            <div>
                              {this.state.courses[key].COURSEID} : {this.state.courses[key].CNAME}
                            </div>
                            <div>
                            {this.state.courses[key].COURSETERM}
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        {/* <Button size="small" color="primary" >
                          Select
                        </Button>
                        <Button size="small" color="primary" >
                          Learn More
                        </Button> */}
                      </CardActions>
                    </Link>
                    </Card>
                </Grid>       
              ))}
          </Grid>
        </div>


        
    
  );
}
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
