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
import {connect} from 'react-redux';
import {register} from '../../redux/actions/loginAction'

import { Link } from 'react-router-dom'

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
        sjsuid: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        flag: false,
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
        
        sjsuid: this.state.sjsuid,
        password: this.state.password,
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        flag: this.state.flag,
      }

      this.props.register(user).then(res => {
          this.props.history.push(`/login`);
      })
  }

  render() {
    const { classes } = this.props;

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
              <Input name="fname" type="text" id="fname" onChange={this.onChange}/>
            </FormControl>
            
            {/* LNAME */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Last Name</InputLabel>
              <Input name="lname" type="text" id="lname"  autoFocus onChange={this.onChange}/>
            </FormControl>
  
            {/* SJSU ID */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">SJSU ID</InputLabel>
              <Input name="sjsuid" type="text" id="sjsuid"  autoFocus onChange={this.onChange}/>
            </FormControl>
            
            {/* PASSWORD */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.onChange}/>
            </FormControl>
  
            {/* EMAIL */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" type="email" id="EMAIL" autoComplete="email" autoFocus onChange={this.onChange}/>
            </FormControl>
  
            {/* PHONE */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Phone</InputLabel>
              <Input name="phone" type="text" id="PHONE" onChange={this.onChange}/>
              {/* <Input name="password" type="password" id="password" autoComplete="current-password" /> */}
            </FormControl>
  
            {/* FACULTY BOOLEAN */}
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  checked={this.state.flag}
                  onChange={this.handleChange('flag')}
                  value="flag"
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
              to='/login' 
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
    register : PropTypes.func.isRequired
};
  
export default connect(null, {register})(withStyles(styles)(SignUp));