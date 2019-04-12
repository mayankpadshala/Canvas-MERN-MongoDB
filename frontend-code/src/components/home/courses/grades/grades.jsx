import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {setGrades} from "../../../../redux/actions/courseActions.js";

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
    marginTop: theme.spacing.unit * 6,
    marginLeft: 64,
    // overflowX: 'auto',
  },
  table: {
    marginLeft: 64,
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
    width: 200,
    margin: '15px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    },
  iconButton: {
    padding: 10,
    },
  divider: {
    width: '100%',
    border: '1px solid black',
    margin: 0,
  },
});



class Grades extends React.Component {
  
  state={

  }

  componentWillMount(){
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);

    this.setState({
      isFaculty: decoded.faculty,
    })

    this.props.setGrades();
  }

  render() {
    const { classes } = this.props;
    // const assignmens = []
    const assignmens = this.props.selectedCourse.selectedCourse.assignments
    // console.log(assignmenstts)
    
    const studentsEnrolled = this.props.selectedCourse.selectedCourse.studentsEnrolled
    // console.log(assignmenstts)

    const userGrades = this.props.selectedCourse.grades

    const studentGrades = (
      
      <Paper className={classes.root}>
      {console.log(this.state)}
      <div>
        <h1>Grades For Mayank Padshala</h1>
      </div>

      <div style={{display: 'flex'}}>
        <div>
          <h4 style={{marginLeft: '24px'}}>Course</h4>
          <Paper className={classes.searchBar} elevation={1}>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div>
          <h4 style={{marginLeft: '24px'}}>Due Date</h4>
          <Paper className={classes.searchBar} elevation={1}>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>

      <Grid
          container
          direction="row"
          justify="space-evenly"
          // alignItems="center"
          item xs={9}
      >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Name</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                    <CustomTableCell align="right">Score</CustomTableCell>
                    <CustomTableCell align="right">Out Of</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(assignmens).map(key => (
                    <TableRow className={classes.row} key={assignmens[key].assignment._id}>
                      <CustomTableCell component="th" scope="row">
                        {assignmens[key].assignment.title}
                      </CustomTableCell>
                      {/* <CustomTableCell align="right">{assignmens[key].assignment.dueDate}</CustomTableCell> */}
                      <CustomTableCell align="right">{}</CustomTableCell>
                      <CustomTableCell align="right">{}</CustomTableCell>
                      <CustomTableCell align="right">{assignmens[key].assignment.totalPoints}</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                  ))}
                  {Object.keys(userGrades).map(key => (
                    <TableRow className={classes.row} key={userGrades[key]._id}>
                      <CustomTableCell component="th" scope="row">
                        {userGrades[key].name}
                      </CustomTableCell>
                      <CustomTableCell align="right">{}</CustomTableCell>
                      <CustomTableCell align="right">{userGrades[key].marksObtained}</CustomTableCell>
                      <CustomTableCell align="right">{userGrades[key].totalMarks}</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                  ))}
                 
                    {/* <TableRow className={classes.row} >
                      <CustomTableCell component="th" scope="row">
                        Quiz 1
                      </CustomTableCell>
                      <CustomTableCell align="right">2019-03-12</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row} >
                      <CustomTableCell component="th" scope="row">
                      <strong>Total</strong>
                      </CustomTableCell>
                      <CustomTableCell align="right">-</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right">75</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow> */}
                </TableBody>
              </Table>
        </Grid>
    </Paper>

    )

    const facultyGrades = (
      
      <Paper className={classes.root}>
      {console.log(this.state)}
      <div>
        <h1>Grades For Mayank Padshala</h1>
      </div>

      <div style={{display: 'flex'}}>
        <div>
          <h4 style={{marginLeft: '24px'}}>Course</h4>
          <Paper className={classes.searchBar} elevation={1}>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div>
          <h4 style={{marginLeft: '24px'}}>Due Date</h4>
          <Paper className={classes.searchBar} elevation={1}>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>

      <Grid
          container
          direction="row"
          justify="space-evenly"
          // alignItems="center"
          item xs={9}
      >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Name</CustomTableCell>
                    <CustomTableCell align="right">Due</CustomTableCell>
                    <CustomTableCell align="right">Score</CustomTableCell>
                    <CustomTableCell align="right">Out Of</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(studentsEnrolled).filter(key => !studentsEnrolled[key].user.faculty).map(key => (
                    <TableRow className={classes.row} key={studentsEnrolled[key].user._id}>
                      <CustomTableCell component="th" scope="row">
                        {studentsEnrolled[key].user.fname + " " + studentsEnrolled[key].user.fname}
                      </CustomTableCell>
                      <CustomTableCell align="right">{studentsEnrolled[key].user.dueDate}</CustomTableCell>
                      <CustomTableCell align="right">{}</CustomTableCell>
                      <CustomTableCell align="right">{studentsEnrolled[key].user.totalPoints}</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                  ))}
                 
                    <TableRow className={classes.row} >
                      <CustomTableCell component="th" scope="row">
                        Quiz 1
                      </CustomTableCell>
                      <CustomTableCell align="right">2019-03-12</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                    <TableRow className={classes.row} >
                      <CustomTableCell component="th" scope="row">
                      <strong>Total</strong>
                      </CustomTableCell>
                      <CustomTableCell align="right">-</CustomTableCell>
                      <CustomTableCell align="right">5</CustomTableCell>
                      <CustomTableCell align="right">75</CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
                </TableBody>
              </Table>
        </Grid>
    </Paper>

    )

    return (
      <div>
        
      {!this.state.isFaculty? studentGrades : <div className={classes.root}><h1>Yet to develop</h1></div>}
      </div>
    );
  }
}

Grades.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})

export default connect(mapStateToProps, { setGrades })(withStyles(styles)(withRouter(Grades)));

