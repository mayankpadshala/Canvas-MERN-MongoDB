import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';

import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';


const styles = theme => ({
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

class CourseCreate extends React.Component {


    // user = {
    //   SJSUID: ''
    // }

    componentDidMount(){

      const token = localStorage.jwtToken;
      
      const decoded = jwt_decode(token);
      console.log(decoded.id);
      
      console.log(decoded.fname);

    }

    constructor() {
        super()
        this.state = {
        }
      }


      onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

      onSubmit = (e) => {
        
        e.preventDefault();

        const course = this.state;
        

      }
      renderRedirect = () => {
        if(this.state.redirect) {
          return <Redirect to='/dashboard' />
        }
      }

  

  render() {

    const { classes } = this.props;

    const registerCourse = (
      
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
              name="COURSEID"
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
              name="CNAME"
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
              name="DEPARTMENT"
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
              name="DESCRIPTION"
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
              name="CROOM"
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
              name="CCAPACITY"
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
              name="WAITCAPACITY"
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
              name="COURSETERM"
              onChange={this.onChange}
            />

            <Button variant="contained" className={classes.button} type='submit'>
              Submit
            </Button>
            
        </div>
      </form>
      
    );

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            // alignItems="center"
        >
        {this.renderRedirect()}
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
                      
                      {registerCourse}

                    </div>

                </Grid>
            </Grid>
            <Grid item xs={2}>
                {/* <Button variant="outlined" className={classes.button} onClick={this.toggleEditButton}>
                    <EditIcon></EditIcon> Edit Profile
                </Button>          */}
            </Grid>
        </Grid>
        
           
    );
  }
}

CourseCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseCreate);