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

import { courseSection, updateMarks} from '../../../../redux/actions/courseActions'

import PDF from "react-pdf-js";

const styles = theme => ({
    root_outer: {
      width: '100%',
      maxWidth: 924,
      padding: '32px',
      margin: '12px 0px 0px 120px',
  },
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 874,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '8px 0px 0px 10px',
},
input_marks: {
  margin: 'auto',
  textAlign: 'right'
}
  });

class DisplaySubmissions extends Component {
    state={
      index : 0,
      total_submissions: 0,
      fileshowing : ''
    }

    componentWillMount() {
      const submission = this.props.selectedCourse.assignmentDisplayed.submission;
      this.setState({
        submissions : submission 
      })
      const files = []

      Object.keys(submission).map((key) => {
        files.push([submission[key].file, submission[key].submitedBy, submission[key].submissoinNumber, submission[key].marks])
        this.setState({
          files: files,
        })
      })

    }

    getMarks = (e) => {
      this.setState({
        marks: e.target.value
      })
    }

    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
      }
    
      handlePrevious = () => {
        this.setState({ page: this.state.page - 1 });
      }
    
      handleNext = () => {
        this.setState({ page: this.state.page + 1 });
      }

      handlePrevious_assign = () => {
        if(this.state.index > 0){
          this.setState({
            index: this.state.index - 1,
          })
        }
      }
    
      handleNext_assign = () => {
        if(this.state.files.length-1 > this.state.index){
          // console.log(this.state.index)
          this.setState({
            index: this.state.index + 1,
          })
        }
      }
    
      renderPagination = () => {
        return (
          <>
            <button onClick={this.handlePrevious}>&lt;</button>
            <button onClick={this.handleNext}>&gt;</button>
          </>
        );
      }

      renderPagination_assign = () => {
        return (
          <>
            <button onClick={this.handlePrevious_assign}>&lt;</button>
            <button onClick={this.handleNext_assign}>&gt;</button>
          </>
        );
      }


  render() {
      

    const { classes } = this.props;

    console.log(this.state);

    let pagination = null;

    let pagination_assign = null

    if (this.state.pages) {
      pagination = this.renderPagination();
    }

    if (this.state.files) {
      pagination_assign = this.renderPagination_assign();
    }

    const viewPdf = (index) => (
      
      <div className={classes.root}>
        <div>
          <PDF
            file={this.state.files[index][0]}
            // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
            // file={pdfToView}
            page={this.state.page}
            onDocumentComplete={this.onDocumentComplete}
            />  
            <p>Page {this.state.page} of {this.state.pages}</p>
          {/* {console.log(this.state.displayFile)} */}
          <div style={{textAlign:'right'}}> 
            {pagination}
          </div>    
        </div>  
        <div className={classes.input_marks}>
        
          <h3>Submitted By: {this.state.files[this.state.index][1].sjsuId}</h3>
          <h6>Submission Number: {this.state.files[this.state.index][2]}</h6>
          <h6>Given Marks: {this.state.files[this.state.index][3]}</h6>
          <input type='text' onChange={this.getMarks}></input>
          <button onClick={() =>{this.props.updateMarks(this.props.selectedCourse.assignmentDisplayed._id, this.state.files[this.state.index][2], this.state.marks)}}>Submit Marks</button>
        </div>
      </div>
        
    )

    return (
      <div className={classes.root_outer}>
        <button onClick={() => {this.props.courseSection('assignments', this.props.history)}}>Back</button>

            {viewPdf(this.state.index)}
    
        <div style={{textAlign:'right'}}> 
          {pagination_assign}
        </div>
      </div>
    )
  }
}

DisplaySubmissions.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    selectedCourse: PropTypes.object.isRequired,
  };
    
  
  const mapStateToProps = (state) => ({
    nav : state.nav,
    selectedCourse : state.selectedCourse
  })
  
  export default connect(mapStateToProps, { courseSection, updateMarks })(withStyles(styles)(withRouter(DisplaySubmissions)));
  