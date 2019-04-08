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
import jwt_decode from 'jwt-decode';
// import SearchBar from 'material-ui-search-bar';
import Grid from '@material-ui/core/Grid';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';

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

  };

  componentWillMount() {

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);

    this.setState({
      isFaculty: decoded.faculty,
    })
    
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

  render() {
    const { classes } = this.props;

    
    const studentsEnrolled = this.props.selectedCourse.selectedCourse.studentsEnrolled
    
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
                    {this.state.isFaculty ? !studentsEnrolled[key].user.faculty? <button onClick={() => {this.delete(studentsEnrolled[key].user._id)}}>Delete</button>: <div></div> : <div></div>}
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

export default connect(mapStateToProps, {  })(withStyles(styles)(withRouter(People)));
