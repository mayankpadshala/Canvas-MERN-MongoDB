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
    border: '0.5px solid black'
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

class Assignment extends React.Component {
  state = {
    open: true,
    openPast: false,
    SJSUID: '',
    FLAG: '',
    COURSEID: '',
    create: false,
    file: null,
    TITLE: '',
    TOTALPOINTS: 0,
    DUEDATE: null,
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

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = () => {
    return (
      <>
        <button onClick={this.handlePrevious}>&lt;</button>
        <button onClick={this.handleNext}>&gt;</button>
      </>
    );
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }


  initialRender = () => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      FLAG: decoded.FLAG,
      COURSEID: this.props.COURSEID,
    })

    getAssignByCourse(this.props.COURSEID)
    .then(res => {
      // console.log(res);
      this.setState({assignments: res});
    })

  }

  deleteAssignment = (ID) => {
    delAssignment(ID);
    this.initialRender();
  }

  compareDate = (date) => {
    var arr = date.split("-").map(index => parseInt(index, 10));
    console.log(arr)

    var date = new Date();
    console.log(date)
    var month = date.getMonth()+1;
    var day = date.getDate();
    var year = date.getFullYear();

    if(arr[0]>year){
      return true
    } else {
      if(arr[1]>month){
        return true
    } else {
      if(arr[2]>=day){
        return true
      } else {
        // console.log("Past Due Date")
        return false
      }
    }
    } 
    
  }

  componentWillMount(){
    this.initialRender();
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickPast = () => {
    this.setState(state => ({ openPast: !state.openPast }));
  }

  setAssignment  = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);

    this.setState({
      file: event.target.files[0],
    })
    
    console.log(this.state);
  }

  setAssignmentSubmission  = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);

    console.log(event.target.value);

    this.setState({
      submissionFile: event.target.files[0],
      
    })
    
    console.log(this.state);
  }

  submitAssignment = (e) => {
    e.preventDefault();
    console.log("Please submit assignment");

    uploadSubmission({
      submissionFile: this.state.submissionFile,
      SJSUID: this.state.SJSUID,
      ASSIGNMENTID: this.state.currentSubmissionId,
      COURSEID: this.state.COURSEID,
    })

    this.setState({
      submission: !this.state.submission,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    uploadAssignment({
      file: this.state.file,
      SJSUID: this.state.SJSUID,
      COURSEID: this.state.COURSEID,
      NAME: this.state.TITLE,
      DUEDATE: this.state.DUEDATE,
      TOTALPOINTS: this.state.TOTALPOINTS,
    })

    this.initialRender();

    this.setState({
      create: !this.state.create,
    })

  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showSubmission = (assignmentId) => {
    this.setState({
      submission: true,
      currentSubmissionId: assignmentId,
    });

  }

  viewSubmission = (assignmentId) => {
    this.setState({
      viewSubmission: true,
      currentAssignementId: assignmentId,
    });
    
  }
  

  render() {
    const { classes } = this.props;
    // console.log(this.state);

    let pagination = null;

    if (this.state.pages) {
      pagination = this.renderPagination();
    }

    const submitForm = (
      <div>

              <div className={classes.heading}>Select File to Submit : </div>
              <div className={classes.heading}>
              <input type="file" onChange={this.setAssignmentSubmission}/>
              </div>
              <div className={classes.heading}>
                <Button variant="contained" className={classes.post} onClick={this.submitAssignment}>
                  Submit
                </Button>
                </div>
              
      </div>
    )

    const viewPdf = (
      <div>

        <button onClick={() => {this.setState({view: false})}}>Back</button>

        {/* <Document
          // file={this.state.displayFile}
          // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
          file = './Mayank.pdf'
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p> */}
        
        <PDF
          file={this.state.displayFile}
          // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
          // file={pdfToView}
          page={this.state.page}
          onDocumentComplete={this.onDocumentComplete}
        />
        {pagination}
        {console.log(this.state.displayFile)}
      </div>
    )

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

    const displayAssignment = (
      <div>

        <List
          component="nav"
          // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
          className={classes.root1}
          >
        <ListItem button onClick={this.handleClick}>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
              
              <Typography variant="h6" gutterBottom> 
                <strong>Assignments</strong>
              </Typography>
              
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit className={classes.listItemText}>
              {Object.keys(this.state.assignments).map((key, index) => (
                          
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
                              <Grid item xs={8}>
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
                                  {/* <button onClick={() => this.viewSubmission(this.state.assignments[key].ID)}>View Submissions</button> */}
                              
                              </Grid>
                              
                              <Grid item xs={1}>
                                  <button onClick={() => this.viewSubmission(this.state.assignments[key].ID)}>View Submissions</button>
                              
                              </Grid>

                              <Grid item xs={1}>
                                  <button onClick={() => {this.deleteAssignment(this.state.assignments[key].ID)}}>Delete</button>
                              </Grid>
                          </Grid>
                          
                      ))}
  
            </Collapse>
            </List>
      </div>
    )

    const createAssign = (
      <div>
        <form className={classes.form} onSubmit={this.onSubmit}>
        <div style={{    display: "flex", flexDirection: "column", width: '60%'}}>
            <div className={classes.heading}>TITLE : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="TITLE"
              onChange={this.onChange}
            />

            {/* <div className={classes.heading}>DESCRIPTION : </div>
            <TextField
              // id="outlined-multiline-static
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="DESCRIPTION"
              onChange={this.onChange}
            /> */}

            {/* <div className={classes.heading}>DUEDATE : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="DUEDATE"
              onChange={this.onChange}
            /> */}

            <div className={classes.heading}>DUEDATE : </div>
            <TextField
                  id="date"
                  type="date"
                  name="DUEDATE"
                  onChange={this.onChange}
                  defaultValue="----------"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <div className={classes.heading}></div>

            <div className={classes.heading}>TOTALPOINTS : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              label="TOTALPOINTS"
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="TOTALPOINTS"
              onChange={this.onChange}
            />
            

            <div className={classes.heading}>Select Supported File : </div>
            <div className={classes.heading}>
            <input type="file" onChange={this.setAssignment}/>
            </div>
            {/* <Paper className={classes.header}> */}
            <div className={classes.heading}>
              <Button variant="contained" className={classes.post} type='submit'>
                Create Assignment
              </Button>
              </div>
            {/* </Paper> */}
        </div>
      </form>
      </div>
    )

    const profAssignment = (
      <div style={{textAlign: 'center'}} className={classes.header}>
        <Paper className={classes.header}>

          <Button 
          variant="contained" 
          className={classes.post} 
          // type="submit" 
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              create: !this.state.create
            });
            
          }}
          >
          Create Assignment
          </Button>

        </Paper>
        {console.log(this.state.create)}
        {this.state.create ? createAssign : displayAssignment}

      </div>
    )

    return (
      <div style={{marginTop: '32px'}}>
        
        {this.state.viewSubmission ?
          <ViewSubmissions assignmentId={this.state.currentAssignementId} courseId={this.state.COURSEID}/>
          :
          this.state.submission ? 
          submitForm
          : 
          this.state.view ? 
            viewPdf 
            : 
            this.state.FLAG ? 
              profAssignment 
              : 
              studentAssignments
        }
      </div>
    );
  }
}

Assignment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Assignment);