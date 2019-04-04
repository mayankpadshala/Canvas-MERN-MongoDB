import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import PDF from "react-pdf-js";
import ViewSubmissions from './viewSubmissions'

import {uploadAssignment, getAssignByCourse, delAssignment, uploadSubmission} from '../../UserFunctions'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 884,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '120px 0px 0px 120px',
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

class AssignmentMain extends React.Component {
  state = {
    open: true,
    openPast: false,
    create: false,
    file: null,
    assignments: [],
    numPages: null,
    pageNumber: 1,
    displayFile: '',
    view: false,
    submission: false,
    submissionFile: null,
    currentSubmissionId: 0,
    viewSubmission: false,
    currentAssignementId: 0,
  };

  
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickPast = () => {
    this.setState(state => ({ openPast: !state.openPast }));
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state);

    const studentAssignments = (
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
                  
            {Object.keys(this.state.assignments).filter(ky => this.compareDate(this.state.assignments[ky].DUEDATE)).map((key, index) => (
                          
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
                              </Grid>
                              <Grid item xs={9}>
                                  <Grid
                                      container
                                      direction="column"
                                      justify="flex-start"
                                      alignItems="flex-start"
                                  >
                                      <Typography variant="h6" gutterBottom>
                                          <strong>{this.state.assignments[key].NAME}</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                          {/* <strong>Available until</strong> {this.state.assignments[key].NAME} |&nbsp; */}
                                          <strong>Due</strong> {this.state.assignments[key].DUEDATE} |&nbsp;
                                          <strong>-/{this.state.assignments[key].TOTALPOINTS}</strong> pts
                                      </Typography>
                                      <Typography>
                                      <a href={this.state.assignments[key].FILEPATH}>DOWNLOAD FILE</a>
                                      </Typography>
  
                                  </Grid>
                              </Grid>
                              <Grid item xs={1}>
                                  <button onClick={() => {this.setState({displayFile: this.state.assignments[key].FILEPATH, view: true})}}>View</button>
                                  
                              </Grid>
                              <Grid item xs={1}>
                                  <button onClick={() => {this.showSubmission(this.state.assignments[key].ID)}}>Submit</button>
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
                  
            {Object.keys(this.state.assignments).filter(ky => !this.compareDate(this.state.assignments[ky].DUEDATE)).map((key, index) => (
                          
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
                              </Grid>
                              <Grid item xs={9}>
                                  <Grid
                                      container
                                      direction="column"
                                      justify="flex-start"
                                      alignItems="flex-start"
                                  >
                                      <Typography variant="h6" gutterBottom>
                                          <strong>{this.state.assignments[key].NAME}</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                          {/* <strong>Available until</strong> {this.state.assignments[key].NAME} |&nbsp; */}
                                          <strong>Due</strong> {this.state.assignments[key].DUEDATE} |&nbsp;
                                          
                                          
                                          <strong>-/{this.state.assignments[key].TOTALPOINTS}</strong> pts |&nbsp;

                                           
                                      </Typography>
                                      <Typography>
                                      <a href={this.state.assignments[key].FILEPATH}>DOWNLOAD FILE</a>
                                      </Typography>
  
                                  </Grid>
                              </Grid>
                              <Grid item xs={1}>
                                  <button onClick={() => {this.setState({displayFile: this.state.assignments[key].FILEPATH, view: true})}}>View</button>
                              </Grid>
                              {/* <Grid item xs={1}>
                                  <button onClick={() => {this.showSubmission()}}>Submit</button>
                              </Grid> */}
                          </Grid>
                          
                      ))}
  
            </Collapse>
  
            </List>
  
      </div>
    )

    return (
      <div style={{marginTop: '32px'}}>
        
        {studentAssignments}
        
      </div>
    );
  }
}

AssignmentMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssignmentMain);