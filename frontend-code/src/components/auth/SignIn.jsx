import React, { Component } from 'react'
// import {shallow} from 'enzyme';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';

import { Link , withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { loginUser } from '../../redux/actions/authActions'

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

export class SignIn extends Component {


  //Login Functions
  constructor() {
    super()
    this.state = {
      sjsuId: '',
      password: '',
      faculty: false,
      loginSuccess: true,
      errors : {},
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      sjsuId: this.state.sjsuId,
      password: this.state.password,
    }
    // console.log(this.state.FACULTY)

    this.props.loginUser(user,  this.props.history)

  }

  render() {
    const { classes } = this.props;

    const { errors } = this.props;
    // console.log(this.props);

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <img src={Logo}></img>

          <Divider className={classes.divider}/>

          <form className={classes.form} onSubmit={this.onSubmit}>
            
            {/* SJSU ID */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">SJSU ID</InputLabel>
              <Input name="sjsuId" type="text" id="sjsuId"  autoFocus onChange={this.onChange} />
              {errors.sjsuId && (<div style={{color: 'red'}}>{errors.sjsuId}</div>)}
            </FormControl>
            
            {/* PASSWORD */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.onChange} />
              {errors.password && (<div style={{color: 'red'}}>{errors.password}</div>)}
            </FormControl>
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            
            <Link
              style={{textDecoration: 'none'}}   
              to='/signup' 
            >
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}   
              >
                Sign Up
              </Button>
            </Link>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,    
  loginUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
auth : state.auth,
errors : state.errors
})


export default connect(mapStateToProps, {loginUser})(withStyles(styles)(withRouter(SignIn)));
