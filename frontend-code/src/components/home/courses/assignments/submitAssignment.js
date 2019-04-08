import React, { Component } from 'react'
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import {submitUploadAssignment} from '../../../../redux/actions/courseActions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 874,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '120px 0px 0px 120px',
},
post: {
    padding: '12px',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#007dc1',
    color: '#fff !important',
    marginBottom: theme.spacing.unit * 3,
  },
  heading: {
    textAlign: '-webkit-auto',
    margin: "16px 0px 0px 0px",
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  });

class SubmitAssignment extends Component {
    state={
          
    }
    setAssignmentSubmission  = (event) => {
        event.preventDefault();
        // console.log(event.target.files[0]);
    
        this.setState({
          file: event.target.files[0],
        })
        
        console.log(this.state);
      }

    submitAssignment = (e) => {
        e.preventDefault();
        console.log("Please submit assignment");
        const fd = new FormData();
        
        fd.append("Submission",this.state.file);
        fd.append("assignmentId", this.props.selectedCourse.submittingAssignment);

        this.props.submitUploadAssignment(fd, this.props.history);
      }

  render() {
      

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        
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
      
      </div>
    )
  }
}

SubmitAssignment.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    selectedCourse: PropTypes.object.isRequired,
  };
    
  
  const mapStateToProps = (state) => ({
    nav : state.nav,
    selectedCourse : state.selectedCourse
  })
  
  export default connect(mapStateToProps, { submitUploadAssignment })(withStyles(styles)(withRouter(SubmitAssignment)));
  