import React, { Component } from 'react'

import PDF from "react-pdf-js";

import {getAllSubmissions} from '../../UserFunctions';


export class ViewSubmissions extends Component {

    state = {
      submittedAssignments: [],
      viewCurrentSubmission: null,
      viewId: 0,
    }

    initialRender = () => {

        const data ={
            ASSIGNMENTID: this.props.assignmentId,
            COURSEID: this.props.courseId,
        }
        getAllSubmissions(data).
        then(res=> {
            this.setState({
              submittedAssignments: res,
            })
            
        })

    }

    componentWillMount() {
        this.initialRender();

    }


    handlePrevious = () => {
      // console.log(this.state)
      this.setState({ viewCurrentSubmission: this.state.submittedAssignments[0]});
    }
  
    handleNext = () => {
      // console.log(this.state)
      this.setState({ viewCurrentSubmission: this.state.submittedAssignments[1]});
    }

    submitGrade = () => {
      console.log("Submit Grade and next");
    }
    

  render() {


    return (
      <div> 

        {this.state.viewCurrentSubmission ? 
        <div style={{display:'flex', flexDirection: 'row'}}>
          <div>
            <PDF
              file={this.state.viewCurrentSubmission.SUBMISSIONPATH}
              // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
              // file={pdfToView}
              page={this.state.page}
              onDocumentComplete={this.onDocumentComplete}
            />
            <button onClick={this.handlePrevious}>&lt;</button>
            <button onClick={this.handleNext}>&gt;</button>
          </div>
          <div style={{display:'flex', alignSelf: 'center', flexDirection: 'column'}}>
            <h1>SJSUID: {this.state.viewCurrentSubmission.SJSUID}</h1>
            <h3>Input Marks</h3>
            <input type='text'></input>
            <button onClick={this.submitGrade}>Submit Grade</button>
          </div>
        </div>
          :
        <div>
          
        <button onClick={this.handlePrevious}>&lt;</button>
        <button onClick={this.handleNext}>&gt;</button>
        </div>
        }
        
                   
        {/* {Object.keys(this.state.viewCurrentSubmission).map((key, index) => (
            <div key={index}>
              <div></div>
              <PDF
                file={this.state.viewCurrentSubmission.SUBMISSIONPATH}
                // file="http://localhost:5000/uploads/Assignments/Assignment-1552597171058.pdf"
                // file={pdfToView}
                page={this.state.page}
                onDocumentComplete={this.onDocumentComplete}
              />
              {pagination}
            </div>
          )) */}


      </div>
    )
  }
}

export default ViewSubmissions
