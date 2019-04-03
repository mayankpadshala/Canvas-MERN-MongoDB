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

import Grid from '@material-ui/core/Grid';
import {uploadAssignment, getAssignByCourse, delAssignment, uploadSubmission} from '../../UserFunctions'

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
    marginTop: theme.spacing.unit * 3,
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
  

  state = {
    SJSUID: '',
    COURSEID: '',
    assignments: [],
  }

  initialRender() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      COURSEID: this.props.COURSEID,
    })

    getAssignByCourse(this.props.COURSEID)
    .then(res => {
      // console.log(res);
      this.setState({assignments: res});
    })

  }

  componentWillMount(){
    this.initialRender();
  }

  render() {
    const { classes } = this.props;

    return (
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
                      {Object.keys(this.state.assignments).map(key => (
                        <TableRow className={classes.row} key={this.state.assignments[key].ID}>
                          <CustomTableCell component="th" scope="row">
                            {this.state.assignments[key].NAME}
                          </CustomTableCell>
                          <CustomTableCell align="right">{this.state.assignments[key].DUEDATE}</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                          <CustomTableCell align="right">{this.state.assignments[key].TOTALPOINTS}</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                        </TableRow>
                      ))}
                      {/* <TableRow className={classes.row} >
                          <CustomTableCell component="th" scope="row">
                            <strong>Assignments</strong>
                          </CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                          <CustomTableCell align="right">100%</CustomTableCell>
                          <CustomTableCell align="right">30/40</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                          <CustomTableCell component="th" scope="row">
                          <strong>Lab</strong>
                          </CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                          <CustomTableCell align="right">N/A</CustomTableCell>
                          <CustomTableCell align="right">N/A</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                          <CustomTableCell component="th" scope="row">
                            <strong>Group Project</strong>
                          </CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                          <CustomTableCell align="right">100%</CustomTableCell>
                          <CustomTableCell align="right">30/40</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                          <Divider className={classes.divider} />
                          <Divider className={classes.divider} />
                          <Divider className={classes.divider} />
                          <Divider className={classes.divider} />
                          <Divider className={classes.divider} />
                          <Divider className={classes.divider} />
                        </TableRow> */}
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

    );
  }
}

Grades.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grades);