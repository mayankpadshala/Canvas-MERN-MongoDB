import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';

import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';

//Import Profile Image
import ProfileImg from '../../../utils/img/profile.png'

//Import Axios Api Requests 

import { getUser, updateUser, uploadFile } from '../../UserFunctions';

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
    cursor: 'pointer',
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

class Profile extends React.Component {

    initialRender = () => {
      const token = localStorage.usertoken;
      
      const decoded = jwt_decode(token);
      console.log(decoded.SJSUID);

      const user = {
        SJSUID: decoded.SJSUID
      }

       getUser(user)
       .then(
         res => {
          this.setState({
            FNAME: res.user.FNAME,
            LNAME: res.user.LNAME,
            EMAIL: res.user.EMAIL,
            PHONE: res.user.PHONE,
            ABOUT: res.user.ABOUT,
            CITY: res.user.CITY,
            SJSUID: res.user.SJSUID,
            COMPANY: res.user.COMPANY,
            COUNTRY: res.user.COUNTRY,
            GENDER: res.user.GENDER,
            HOMETOWN: res.user.HOMETOWN,
            PROFILEIMG: res.user.PROFILEIMG
          })
       })
    }

    componentWillMount(){

      this.initialRender();
      
    }

    constructor() {
        super()
        this.state = {
          editButtonState: true,
          FNAME:'',
          LNAME:'',
          EMAIL:'',
          PHONE:'',
          ABOUT:'',
          CITY:'',
          SJSUID:'',
          COMPANY:'',
          COUNTRY:'',
          GENDER:'',
          HOMETOWN:'',
          selectedFile: null,
          PROFILEIMG: '',
        }
      }

      toggleEditButton = () => {
          if(this.state.editButtonState) {
            this.setState({editButtonState: false});
          } else {
            this.setState({editButtonState: true});
          }
      }

      onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

      onSubmit = (e) => {
        e.preventDefault();

        const user = {
          FNAME: this.state.FNAME,
          LNAME: this.state.LNAME,
          EMAIL: this.state.EMAIL,
          PHONE: this.state.PHONE,
          ABOUT: this.state.ABOUT,
          CITY: this.state.CITY,
          SJSUID: this.state.SJSUID,
          COMPANY: this.state.COMPANY,
          COUNTRY: this.state.COUNTRY,
          GENDER: this.state.GENDER,
          HOMETOWN: this.state.HOMETOWN,
        }

        updateUser(user)
        .then(res =>
            console.log(res)
          )

        this.toggleEditButton();

      }

      updateImage = (event) => {
        // console.log(event.target.files[0]);
        uploadFile({
          file: event.target.files[0],
          SJSUID: this.state.SJSUID
        })
        .then( res => {
          this.initialRender();
        }
        )
        
      }
  

  render() {
    const { classes } = this.props;

    const profile = (
      <div style={{    display: "flex", flexDirection: "column"}}>
        <div className={classes.heading}>First Name : </div>
        <div className={classes.textDisplay}>{this.state.FNAME}</div>

        <div className={classes.heading}>Last Name : </div>
        <div className={classes.textDisplay}>{this.state.LNAME}</div>

        <div className={classes.heading}>Email : </div>
        <div className={classes.textDisplay}>{this.state.EMAIL}</div>

        <div className={classes.heading}>Phone : </div>
        <div className={classes.textDisplay}>{this.state.PHONE}</div>

        <div className={classes.heading}>About Me : </div>
        <div className={classes.textDisplay}>{this.state.ABOUT}</div>

        <div className={classes.heading}>City : </div>
        <div className={classes.textDisplay}>{this.state.CITY}</div>

        <div className={classes.heading}>SJSU ID : </div>
        <div className={classes.textDisplay}>{this.state.SJSUID}</div>

        <div className={classes.heading}>Company : </div>
        <div className={classes.textDisplay}>{this.state.COMPANY}</div>

        <div className={classes.heading}>Country : </div>
        <div className={classes.textDisplay}>{this.state.COUNTRY}</div>

        <div className={classes.heading}>Gender : </div>
        <div className={classes.textDisplay}>{this.state.GENDER}</div>

        <div className={classes.heading}>Home Town : </div>
        <div className={classes.textDisplay}>{this.state.HOMETOWN}</div>

        
      </div>
    );

    const editProfile = (
      
      <form className={classes.form} onSubmit={this.onSubmit}>
        <div style={{    display: "flex", flexDirection: "column"}}>
            <div className={classes.heading}>First Name : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="FNAME"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Last Name : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="LNAME"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Email : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="EMAIL"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Phone : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="PHONE"
              onChange={this.onChange}
            />

            <div className={classes.heading}>About Me : </div>
            <TextField
              // id="outlined-multiline-static
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="ABOUT"
              onChange={this.onChange}
            />

            <div className={classes.heading}>City : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="CITY"
              onChange={this.onChange}
            />

            <div className={classes.heading}>SJSU ID : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="SJSUID"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Company : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="COMPANY"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Country : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="COUNTRY"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Gender : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="GENDER"
              onChange={this.onChange}
            />

            <div className={classes.heading}>Home Town : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="HOMETOWN"
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
        
            <Grid item xs={2}>
                <input type='file' onChange={this.updateImage} style={{display: 'none'}} ref={fileInput => this.fileInput = fileInput}></input>
                <Avatar alt="Remy Sharp" src={this.state.PROFILEIMG} className={classes.profileImg} onClick={() => {this.fileInput.click()}} /> 
            </Grid>
            <Grid item xs={8}>
                <Grid
                    container
                    direction="column"
                    className={classes.formFields}
                    alignItems="left"
                >
                    
                    <div style={{    display: "flex", flexDirection: "column"}}>

                      {this.state.editButtonState ? profile : editProfile }

                    </div>

                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" className={classes.button} onClick={this.toggleEditButton}>
                    <EditIcon></EditIcon> Edit Profile
                    {console.log(this.state.profileImgUrl)}
                </Button>         
            </Grid>
        </Grid>
        
           
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);