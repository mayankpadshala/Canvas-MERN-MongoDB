import React, { Component } from 'react'
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';

import { displayAssignment, submitAssignment, deleteAssignment, displaySubmissions } from '../../../../redux/actions/courseActions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 884,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '60px 0px 0px 120px',
},
root1: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black'
},
nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
bgPaper: {
    padding: '4px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D3D3D3'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  listItem: {
    background: 'white',
    border: '1px solid gray',
    margin: '0px',
    padding: '0px'
  },
  listItemText: {
    margin: '16px'
  },
  divider: {
    border: '1px dashed black'
  },
  header: {
    textAlign: 'center'
  },
  post: {
    padding: '12px',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#007dc1',
    color: '#fff !important',
    marginBottom: theme.spacing.unit * 3,
  },
  formFields: {
    padding: 32
  },
  heading: {
    textAlign: '-webkit-auto',
    margin: "16px 0px 0px 0px",
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  textField: {
    width: '50%',
  }
});


class ViewAssignment extends Component {
  state = {
    open: true,
    openPast: false,
    assignments: [],
    isFaculty: false
  };

  componentWillMount() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    // console.log(decoded);

    this.setState({
      isFaculty: decoded.faculty,
    })
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickPast = () => {
    this.setState(state => ({ openPast: !state.openPast }));
  }

  compareDate = (d) => {
    // console.log(d)
    var arr = d.split("-").map(index => parseInt(index, 10));
    // console.log(arr)

    var date = new Date();
    // console.log(date)
    var month = date.getMonth()+1;
    // console.log(month)
    var day = date.getDate();
    // console.log(day)
    var year = date.getFullYear();

    if(arr[0]>year){
      console.log(" Not Past Due Date")
      return true
    } else {
      if(arr[1]>month){
        // console.log(" Not Past Due Date")
        return true
      } else {
        if(arr[2]>=day){
          // console.log(" Not Past Due Date");
          return true
        } else {
          // console.log("Past Due Date")
          return false
        }
      }
    } 
    
  }

  displayAssignment = (id) => {
    this.props.displayAssignment(id, this.props.history);
  }

  submitAssignment = (id) => {
    this.props.submitAssignment(id, this.props.history)
  }

  deleteAssignment = (id) => {
    this.props.deleteAssignment(id, this.props.selectedCourse.selectedCourse._id, this.props.history)
  }

  displaySubmissions = (id) => {
    this.props.displaySubmissions(id, this.props.selectedCourse.selectedCourse._id, this.props.history)
  } 

  render() {

    const { classes } = this.props;

    let assignments = this.props.selectedCourse.selectedCourse.assignments;
    
    if(assignments.length === 0 ) {
      assignments = {}
    }

    const header = (
      <div className={classes.root_header}>

        {this.state.isFaculty ? 
        <Link to='create' >Create Assignment</Link>
        : 
        // <Button variant='contained' color='primary' disabled='true'>Assignments</Button>
        <div></div> 
        }
      </div>
    )

    return (
      <div>
        {/* {this.header} */}
      <div>
        
        <List
          component="nav"
          // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
          className={classes.root}
          >
            <ListItem button onClick={this.handleClick}>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
              
              <Typography variant="h6" gutterBottom> 
                <strong>Upcoming Assignments</strong>
              </Typography>
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit className={classes.listItemText}>
   
            {Object.keys(assignments).filter(ky => this.compareDate(assignments[ky].assignment.dueDate)).map((ky, index) => (
                          // <div>{assignments[ky].assignment.title}</div>
                          <Grid
                              key={`${index}`}
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className={classes.bgPaper}
                          >
                              <Grid item xs={1}>
                                  <AssignmentIcon className={classes.icon} />
                                  {/* {console.log(assignments[ky].assignment.dueDate)} */}
                              </Grid>
                              <Grid item xs={8}>
                                  <Grid
                                      container
                                      direction="column"
                                      justify="flex-start"
                                      alignItems="flex-start"
                                  >
                                      <Typography variant="h6" gutterBottom>
                                          <strong>{assignments[ky].assignment.title}</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                          <strong>Due</strong> {assignments[ky].assignment.dueDate} |&nbsp;
                                          <strong>-/{assignments[ky].assignment.totalPoints}</strong> pts
                                      </Typography>
                                      <Typography>
                                      <a href={assignments[ky].assignment.file}>DOWNLOAD FILE</a>
                                      </Typography>

                                  </Grid>
                              </Grid>
                              
                              <Grid item xs={2}>
                                  {this.state.isFaculty ? 
                                  <button onClick={() => {this.displaySubmissions(assignments[ky].assignment._id)}}> Submissions</button> 
                                  :
                                  <button onClick={() => {this.displayAssignment(assignments[ky].assignment._id)}}>View</button>
                                  }
                              </Grid>
                              <Grid item xs={1}>
                                  {this.state.isFaculty ? 
                                  <button onClick={() => {this.deleteAssignment(assignments[ky].assignment._id)}}>Delete</button> 
                                  :
                                  <button onClick={() => {this.submitAssignment(assignments[ky].assignment._id)}}>Submit</button>
                                  }
                              </Grid>
                          </Grid>
                          
                      ))}

            </Collapse>
            <Divider className={classes.divider}/>
            {/* Past Assignments */}
            <ListItem button onClick={this.handleClickPast}>
              {this.state.openPast ? <ExpandLess /> : <ExpandMore />}
              
              <Typography variant="h6" gutterBottom> 
                <strong>Past Assignments</strong>
              </Typography>
              
            </ListItem>
            <Collapse in={this.state.openPast} timeout="auto" unmountOnExit className={classes.listItemText}>
                  
            {Object.keys(assignments).filter(ky => !this.compareDate(assignments[ky].assignment.dueDate)).map((ky, index) => (
                          // <div>{assignments[ky].assignment.title}</div>
                          <Grid
                              key={`${index}`}
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className={classes.bgPaper}
                          >
                              <Grid item xs={1}>
                                  <AssignmentIcon className={classes.icon} />
                                  {/* {console.log(assignments[ky].assignment.dueDate)} */}
                              </Grid>
                              <Grid item xs={8}>
                                  <Grid
                                      container
                                      direction="column"
                                      justify="flex-start"
                                      alignItems="flex-start"
                                  >
                                      <Typography variant="h6" gutterBottom>
                                          <strong>{assignments[ky].assignment.title}</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                          <strong>Due</strong> {assignments[ky].assignment.dueDate} |&nbsp;
                                          <strong>-/{assignments[ky].assignment.totalPoints}</strong> pts
                                      </Typography>
                                      <Typography>
                                      <a href={assignments[ky].assignment.file}>DOWNLOAD FILE</a>
                                      </Typography>

                                  </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                  {this.state.isFaculty ? 
                                  <button onClick={() => {this.displaySubmissions(assignments[ky].assignment._id)}}> Submissions</button> 
                                  :
                                  <button onClick={() => {this.displayAssignment(assignments[ky].assignment._id)}}>View</button>
                                  }
                              </Grid>
                              <Grid item xs={1}>
                                  {this.state.isFaculty ? 
                                  <button onClick={() => {this.deleteAssignment(assignments[ky].assignment._id)}}>Delete</button> 
                                  :
                                  <div></div>
                                  }
                              </Grid>
                          </Grid>
                          
                      ))}

                         

            </Collapse>

            </List>

      </div>
      </div>
    )
  }
}

ViewAssignment.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})

export default connect(mapStateToProps, {  displayAssignment, submitAssignment, deleteAssignment, displaySubmissions })(withStyles(styles)(withRouter(ViewAssignment)));
