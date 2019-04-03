import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';

import {withRouter} from 'react-router-dom';

import classnames from 'classnames';

import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { registerUser } from '../../redux/actions/authActions'
const Logo = require('../../utils/img/sjsuLogo.png');

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
      width: '60px',
      height: '60px'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    divider: {
      width: '100%',
      padding: '2px',
      margin: '32px 0 32px 0',
    }
  });

export class SignUp extends Component {

  //Register Functions
  constructor() {
    super()
    this.state = {
        sjsuId: '',
        faculty: false,
        fname: '',
        lname: '',
        email: '',
        password: '',
        password2: '',
        errors : {},
    }
  }
  
  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit = (e) => {
      e.preventDefault();

      console.log(this.state);

      const user = {        
          sjsuId: this.state.sjsuId,
          faculty: this.state.faculty,
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
      }

      this.props.registerUser(user, this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors : nextProps.errors});
    }
  }

  render() {
    const { classes } = this.props;

    const { errors } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            SJSU
          </Avatar> */}
          
          <img src={Logo}></img>

          <Divider className={classes.divider}/>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            {/* FNAME */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">First Name</InputLabel>
              <Input name="fname" type="text" id="fname" onChange={this.onChange} /> {/* className={classnames({'is-invalid' : errors.fname})} */}
              {errors.fname && (<div style={{color: 'red'}}>{errors.fname}</div>)}
            </FormControl>
            
            {/* LNAME */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Last Name</InputLabel>
              <Input name="lname" type="text" id="lname"  autoFocus onChange={this.onChange}/>
              {errors.lname && (<div style={{color: 'red'}}>{errors.lname}</div>)}
            </FormControl>
  
            {/* SJSU ID */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">SJSU ID</InputLabel>
              <Input name="sjsuId" type="text" id="sjsuId"  autoFocus onChange={this.onChange}/>
              {errors.sjsuId && (<div style={{color: 'red'}}>{errors.sjsuId}</div>)}
            </FormControl>
  
            {/* EMAIL */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" type="email" id="email" autoComplete="email" autoFocus onChange={this.onChange}/>
              {errors.email && (<div style={{color: 'red'}}>{errors.email}</div>)}
            </FormControl>
            
            {/* PASSWORD */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.onChange}/>
              {errors.password && (<div style={{color: 'red'}}>{errors.password}</div>)}
            </FormControl>
            
            {/* PASSWORD 2*/}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Repeat Password</InputLabel>
              <Input name="password2" type="password" id="password2" onChange={this.onChange}/>
              {errors.password2 && (<div style={{color: 'red'}}>{errors.password2}</div>)}
            </FormControl>
  
            {/* FACULTY BOOLEAN */}
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  checked={this.state.faculty}
                  onChange={this.handleChange('faculty')}
                  value="faculty"
                  />
              }
              label="Faculty"
            />
  
            {/* SUBMIT FORM */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
  
            <Link
              style={{textDecoration: 'none'}} 
              to='/' 
            >
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                
              >
                Sign In
              </Button>
            </Link>
  
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(withRouter(SignUp)));