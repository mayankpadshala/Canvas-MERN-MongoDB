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

import {getEnrolledPeople, getUser, deleteUser} from '../../UserFunctions';


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




// const rows = [ {
//                   name: 'Mayank Padshala',
//                   section: 'Section 1',
//                   role: 'Student',
//                 },
//                 {
//                   name: 'Arivoli',
//                   section: 'Section 1',
//                   role: 'Teacher',
//                 },
//                 {
//                   name: 'Anurag',
//                   section: 'Section 1',
//                   role: 'TA',
//                 }, 
//              ];

class People extends React.Component {

  state = {
    enrolledPeople: [],
    SJSUID: '',
    FLAG: ''
  };

  initialRender = () => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      FLAG: decoded.FLAG
    })

    // console.log(this.props);
    const course = {
      COURSEID : this.props.COURSEID
    }

    var peopleSJSUID = [];

    getEnrolledPeople(course)
    .then(res => {
      Object.keys(res.people).filter(key => res.people[key].course != null).map(x => {
        // console.log(res.people[x].SJSUID);
        peopleSJSUID.push(res.people[x].SJSUID);
      })
      // res.people.filter(people => people.course != null).map(people => {
      //     console.log(people);
      //     peopleSJSUID.push(people.SJSUID);
      // });

      var peopleData = [];

      peopleSJSUID.map(sjsuid => {
        // console.log(x);
        getUser({SJSUID: sjsuid})
        .then(res => {
          // console.log(res.user.FNAME);
          // console.log(res.user)
          peopleData.push(res.user);
          this.setState({enrolledPeople: peopleData});
      // console.log(peopleData)
        })
      })

      
    }) 
  }

  componentWillMount() {

    this.initialRender();
    
  }

  delete = (sjsuid) => {
 
    console.log(sjsuid);
    const deleteuser = {
      SJSUID: sjsuid,
      COURSEID: this.props.COURSEID,
    }

    deleteUser(deleteuser)
    .then(res => {
      console.log(res);
      if(res.status) {
        console.log("res.status " + res.status);
      } else if (res.error) {
        console.log("res.error "+ res.error);
      }         
    })
    .catch(err => {
      console.log(err);
    })

    this.initialRender();

  }
  

  render() {
    const { classes } = this.props;
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
                <CustomTableCell align="right"></CustomTableCell>
                <CustomTableCell >Name</CustomTableCell>
                <CustomTableCell align="center">Section</CustomTableCell>
                <CustomTableCell align="center">Role</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.enrolledPeople.map(row => (
                <TableRow className={classes.row} key={row.name}>
                  {console.log(row)}
                  <CustomTableCell align="right">
                  <Avatar alt="Remy Sharp"  className={classes.profileImg} src={row.PROFILEIMG}>MP</Avatar>
                  </CustomTableCell>
                  <CustomTableCell>{row.FNAME + ' ' + row.LNAME}</CustomTableCell>
                  <CustomTableCell align="center">{row.CITY}</CustomTableCell>
                  <CustomTableCell align="center">{row.EMAIL}</CustomTableCell>
                  <CustomTableCell>
                    {this.state.FLAG ? <button onClick={() => {this.delete(row.SJSUID)}}>Delete</button>: <div></div>}
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
};

export default withStyles(styles)(People);