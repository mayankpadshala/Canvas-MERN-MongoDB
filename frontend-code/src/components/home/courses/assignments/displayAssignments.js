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

import { courseSection} from '../../../../redux/actions/courseActions'

import PDF from "react-pdf-js";

const styles = theme => ({
    root_outer: {
      width: '100%',
      maxWidth: 894,
      padding: '32px',
      margin: '12px 0px 0px 120px',
  },
  root: {
    width: '100%',
    maxWidth: 874,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '8px 0px 0px 10px',
},
  });

class DisplayAssignments extends Component {
    state={
          
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
    
      renderPagination = () => {
        return (
          <>
            <button onClick={this.handlePrevious}>&lt;</button>
            <button onClick={this.handleNext}>&gt;</button>
          </>
        );
      }


  render() {
      

    const { classes } = this.props;

    const assignment = this.props.selectedCourse.assignmentDisplayed;

    let pagination = null;

    if (this.state.pages) {
      pagination = this.renderPagination();
    }

    return (
      <div className={classes.root_outer}>
        <button onClick={() => {this.props.courseSection('assignments', this.props.history)}}>Back</button>
        <div className={classes.root}>
        <PDF
        file={assignment.file}
        // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
        // file={pdfToView}
        page={this.state.page}
        onDocumentComplete={this.onDocumentComplete}
        />
        
        {/* {console.log(this.state.displayFile)} */}
        <div style={{textAlign:'right'}}> 
          {pagination}
        </div>
      </div>
      
      </div>
    )
  }
}

DisplayAssignments.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    selectedCourse: PropTypes.object.isRequired,
  };
    
  
  const mapStateToProps = (state) => ({
    nav : state.nav,
    selectedCourse : state.selectedCourse
  })
  
  export default connect(mapStateToProps, { courseSection })(withStyles(styles)(withRouter(DisplayAssignments)));
  