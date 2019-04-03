import React, { Component } from 'react'
import {Route, Switch, Link, Redirect, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {createCourse} from '../../../redux/actions/courseActions'
import {connect} from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
  root_main: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
    drawerPaperOpen: {
        marginTop: '64px',
        marginLeft: '84px',
        width: drawerWidth,
    },
    root: {
      width: '100%',
      maxWidth: 884,
      backgroundColor: '#f5f5f5',
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    button: {
      marginTop: 32
    },
    profileImg: {
      marginTop: 32,
      width: 128,
      height: 128,
    },
    formFields: {
      padding: 32
    },
    heading: {
      margin: "16px 0px 0px 0px",
      fontWeight: 'bold',
      fontSize: '1.2em',
    },
    textDisplay: {
      margin: "0px 0px 32px 8px",
      fontWeight: 'bold',
    }
});

class CreateMain extends Component {
      constructor() {
        super()
        this.state = {
        }
      }

      componentWillMount() {
      
        const token = localStorage.jwtToken;
        
        const decoded = jwt_decode(token);
        // console.log(decoded);
  
        this.setState({
          id: decoded.id,
        })
  
      }

      onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

      onSubmit = (e) => {
        
        e.preventDefault();        
        // console.log(this.state)

        const courseDetails = {
            courseId: this.state.courseId,
            courseName: this.state.courseName,
            department: this.state.department,
            description: this.state.description,
            courseRoom: this.state.courseRoom,
            courseCapacity: this.state.courseCapacity,
            waitlistCapacity: this.state.waitlistCapacity,
            createdBy: this.state.id
        }
        // console.log(courseDetails)

        this.props.createCourse(courseDetails, this.props.history);

      }
      

    render() {
        const { classes, theme } = this.props;
      

            return (
                
                <div className={classNames(classes.root_main)}>    
                    <div className={classNames(classes.content, classes.drawerPaperOpen)}>
                      <div>
                          <Grid
                              container
                              direction="row"
                              justify="space-evenly"
                              // alignItems="center"
                          >
                              <Grid item xs={2}>
                                  {/* <Avatar alt="Remy Sharp" src={ProfileImg} className={classes.profileImg} />  */}
                              </Grid>
                              <Grid item xs={8}>
                                  <Grid
                                      container
                                      direction="column"
                                      className={classes.formFields}
                                      alignItems="left"
                                  >
                                      
                                      <div style={{    display: "flex", flexDirection: "column"}}>               
                                        <form className={classes.form} onSubmit={this.onSubmit}>
                                          <div style={{    display: "flex", flexDirection: "column"}}>
                                              <div className={classes.heading}>Course ID(only Numbers) : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="courseId"
                                                onChange={this.onChange}
                                              />
                                        
                                              <div className={classes.heading}>Course Name : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="courseName"
                                                onChange={this.onChange}
                                              />

                                              <div className={classes.heading}>Department : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="department"
                                                onChange={this.onChange}
                                              />
                                        
                                              <div className={classes.heading}> Description : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="description"
                                                onChange={this.onChange}
                                              />

                                              <div className={classes.heading}>Class Room : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="courseRoom"
                                                onChange={this.onChange}
                                              />
                                        
                                              <div className={classes.heading}>Course Capacity : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="courseCapacity"
                                                onChange={this.onChange}
                                              /> 

                                        
                                              <div className={classes.heading}>Waitlist Capacity : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="waitlistCapacity"
                                                onChange={this.onChange}
                                              />
                                              
                                              <div className={classes.heading}>Course Term : </div>
                                              <TextField
                                                // id="outlined-multiline-static
                                                // multiline
                                                rows="1"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                required = "true"
                                                name="term"
                                                onChange={this.onChange}
                                              />

                                              <Button variant="contained" className={classes.button} type='submit'>
                                                Submit
                                              </Button>
                                              
                                          </div>
                                        </form>
                                      </div>

                                  </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                  {/* <Button variant="outlined" className={classes.button} onClick={this.toggleEditButton}>
                                      <EditIcon></EditIcon> Edit Profile
                                  </Button>          */}
                              </Grid>
                          </Grid>                            
                      </div>
                    </div>
                </div>
                
                );
       
        
        }
    }
    
    CreateMain.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
      
  const mapStateToProps = (state) => ({
   
  })
  
  export default connect(mapStateToProps, { createCourse })(withStyles(styles)(withRouter(CreateMain)));

