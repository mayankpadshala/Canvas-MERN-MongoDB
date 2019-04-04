import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';

import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import {connect} from 'react-redux';

import { withRouter } from 'react-router-dom';

import {getCurrentProfile, createProfile} from '../../../redux/actions/profileActions'

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
    padding: "18px 32px"
  },
  heading: {
    margin: "16px 0px 0px 0px",
    fontWeight: 'bold',
    fontSize: '1em',
  },
  textDisplay: {
    margin: "0px 0px 32px 8px",
    fontWeight: 'bold',
  },
});

class Profile extends React.Component {

    // initialRender = () => {

    //   const token = localStorage.jwtToken;
      
    //   const decoded = jwt_decode(token);
    //   console.log(decoded);

    //   const user = {
    //     id: decoded.id
    //   }

    // }


    constructor() {

      super()
      this.state = {
        editButtonState: true,
        fname: '',
        lname: '',
        email: '',
        phone: '',
        bio: '',
        city: '',
        sjsuId: '',
        company: '',
        country: '',
        gender: '',
        hometown: '',
      }
      
    }

    componentWillMount() {
      
      const token = localStorage.jwtToken;
      
      const decoded = jwt_decode(token);
      // console.log(decoded);

      this.setState({
        fname: decoded.fname,
        lname: decoded.lname,
        email: decoded.email,
        sjsuId: decoded.sjsuId
      })

      this.props.getCurrentProfile();

    }

    componentDidMount() {
      
      const  {profile} = this.props.userProfile;
      console.log(profile)
      
      this.setState({
        phone: profile.phone,
        bio: profile.bio,
        city: profile.city,
        company: profile.company,
        country: profile.country,
        gender: profile.gender,
        hometown: profile.hometown,
      })
    }

      onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

      onSubmit = (e) => {
        e.preventDefault();

        const user = {
          phone: this.state.phone,
          bio: this.state.bio,
          city: this.state.city,
          company: this.state.company,
          country: this.state.country,
          gender: this.state.gender,
          hometown: this.state.hometown,
        }

        this.props.createProfile(user, this.props.history)

          this.setState({editButtonState: !this.state.editButtonState});
      }

  render() {

    const { classes } = this.props;
    
    const  profileData = this.props.userProfile.profile;

    const profile = (
      <div style={{    display: "flex", flexDirection: "column"}}>
        <div className={classes.heading}>First Name : </div>
        <div className={classes.textDisplay}>{this.state.fname}</div>

        <div className={classes.heading}>Last Name : </div>
        <div className={classes.textDisplay}>{this.state.lname}</div>

        <div className={classes.heading}>Email : </div>
        <div className={classes.textDisplay}>{this.state.email}</div>

        <div className={classes.heading}>SJSU ID : </div>
        <div className={classes.textDisplay}>{this.state.sjsuId}</div>

        <div className={classes.heading}>Phone : </div>
        <div className={classes.textDisplay}>{profileData.phone}</div>

        <div className={classes.heading}>About Me : </div>
        <div className={classes.textDisplay}>{profileData.about}</div>

        <div className={classes.heading}>City : </div>
        <div className={classes.textDisplay}>{profileData.city}</div>


        <div className={classes.heading}>Company : </div>
        <div className={classes.textDisplay}>{profileData.company}</div>

        <div className={classes.heading}>Country : </div>
        <div className={classes.textDisplay}>{profileData.country}</div>

        <div className={classes.heading}>Gender : </div>
        <div className={classes.textDisplay}>{profileData.gender}</div>

        <div className={classes.heading}>Home Town : </div>
        <div className={classes.textDisplay}>{profileData.hometown}</div>

        
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
              name="fname"
              value={this.state.fname}
              disabled= 'true'
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
              name="lname"
              value={this.state.lname}
              disabled= 'true'
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
              name="email"
              value={this.state.email}
              disabled= 'true'
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
              name="sjsuId"
              value={this.state.sjsuId}
              disabled= 'true'
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
              name="phone"
              onChange={this.onChange}
              value={this.state.phone}
            />

            <div className={classes.heading}>About Me : </div>
            <TextField
              // id="outlined-multiline-static
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="bio"
              onChange={this.onChange}
              value={this.state.bio}
            />

            <div className={classes.heading}>City : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="city"
              onChange={this.onChange}
              value={this.state.city}
            />

            <div className={classes.heading}>Company : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="company"
              onChange={this.onChange}
              value={this.state.company}
            />

            <div className={classes.heading}>Country : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="country"
              onChange={this.onChange}
              value={this.state.country}
            />

            <div className={classes.heading}>Gender : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="gender"
              onChange={this.onChange}
              value={this.state.gender}
            />

            <div className={classes.heading}>Home Town : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="hometown"
              onChange={this.onChange}
              value={this.state.hometown}
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
        >
        
            <Grid item xs={2}>
                <input type='file' onChange={this.updateImage} style={{display: 'none'}} ref={fileInput => this.fileInput = fileInput}></input>
                <Avatar alt="Remy Sharp" src={this.state.avatar} className={classes.profileImg} onClick={() => {this.fileInput.click()}} /> 
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
                <Button variant="outlined" className={classes.button} onClick={() => {this.setState({editButtonState: !this.state.editButtonState})}}>
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
  userProfile: PropTypes.object.isRequired,
};
    
const mapStateToProps = (state) => ({
  userProfile : state.userProfile,
})

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withStyles(styles)(withRouter(Profile)));
