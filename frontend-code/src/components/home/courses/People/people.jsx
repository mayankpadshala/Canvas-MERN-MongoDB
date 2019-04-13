import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import jwt_decode from 'jwt-decode';
// import SearchBar from 'material-ui-search-bar';
import Grid from '@material-ui/core/Grid';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {sendMessage} from '../../../../redux/actions/courseActions'

const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 8,
    marginLeft: 120
    // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '15px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    },
  iconButton: {
    padding: 10,
    },
  profileImg: {
    margin: 'auto',
  }
  
});


class People extends React.Component {

  state = {
    open: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleClickOpen = (user_id) => {
    this.setState({ open: true, sender_id : user_id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);

    this.setState({
      isFaculty: decoded.faculty,
      user_id : decoded.id
    })

    console.log(decoded._id);
    
  }  

  delete = (userId) => {
    axios
        .post('/api/courses/unenroll', {userId})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        }) 
  }

  sendMessage = () => {
    // console.log(this.state);
    this.handleClose()

    const message = {
      sendTo : this.state.user_id,
      message : this.state.message
    }

    this.props.sendMessage(message)
  }
  
  render() {
    const { classes } = this.props;

    const studentsEnrolled = this.props.selectedCourse.selectedCourse.studentsEnrolled
    
    const popup = (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* Send Message */}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Message"
              name="message"
              onChange={this.onChange}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.sendMessage} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

    return (
      <div>
        {/* {console.log(this.state.enrolledPeople)} */}
        <Paper className={classes.root}>

          <Paper className={classes.searchBar} elevation={1}>
            <InputBase className={classes.input} placeholder="Search People" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Grid
              container
              direction="row"
              justify="space-evenly"
              // alignItems="center"
              item xs={8}
          >
          
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell >Name</CustomTableCell>
                <CustomTableCell >Role</CustomTableCell>
                
                <CustomTableCell align="center">SJSUID</CustomTableCell>
                <CustomTableCell align="center">Email</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {popup}
              {Object.keys(studentsEnrolled).map(key => (
                <TableRow className={classes.row} key={studentsEnrolled[key].user.fname + " " + studentsEnrolled[key].user.fname}>
                  {/* {console.log(studentsEnrolled[key])} */}
                  {/* <CustomTableCell align="right">
                  <Avatar alt="Remy Sharp"  className={classes.profileImg} src={studentsEnrolled[key].user.file}>MP</Avatar>
                  </CustomTableCell> */}
                  <CustomTableCell>{studentsEnrolled[key].user.fname + ' ' + studentsEnrolled[key].user.lname}</CustomTableCell>
                  <CustomTableCell align="center">{studentsEnrolled[key].user.faculty? "Faculty" : "Student"}</CustomTableCell>
                  <CustomTableCell align="center">{studentsEnrolled[key].user.sjsuId}</CustomTableCell>
                  <CustomTableCell align="center">{studentsEnrolled[key].user.email}</CustomTableCell>
                  <CustomTableCell>
                    {
                      this.state.isFaculty 
                      ? 
                      !studentsEnrolled[key].user.faculty
                        ? 
                        <button onClick={() => {this.delete(studentsEnrolled[key].user._id)}}>Delete</button>
                        : 
                        <div></div> 
                      : 
                      !studentsEnrolled[key].user.faculty
                        ? 
                        (studentsEnrolled[key].user._id !== this.state.user_id) 
                          ?
                          // <button onClick={() => {this.chat(studentsEnrolled[key].user._id)}}>Send Message</button>
                          <button onClick={() => {this.handleClickOpen(studentsEnrolled[key].user._id)}}>Send Message</button>
                          : 
                          <div>Current User</div> 
                        : 
                        <div>Course Faculty</div> 
                    }
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Grid>
        </Paper>
      </div>
          

    );
  }
}

People.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})

export default connect(mapStateToProps, { sendMessage })(withStyles(styles)(withRouter(People)));
