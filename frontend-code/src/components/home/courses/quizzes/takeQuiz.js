import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography, Button, Paper, TextField, AppBar, Tabs, Tab} from '@material-ui/core';
import {Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, FormHelperText, Input, InputLabel} from '@material-ui/core';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import {quizInfo, questionInfo, questions, createQuiz, createQuestion, getQuizzes, getQuestions, setQuizIndex, submitMarks} from '../../../../redux/actions/quizAction';

import {courseSection} from '../../../../redux/actions/courseActions'

const styles = theme => ({
  root1: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 25,
},
root: {
  boxShadow: 'none',
  width: '100%',
  marginTop: theme.spacing.unit * 10,
},
formControl: {
  margin: theme.spacing.unit * 3,
},
group: {
  margin: `${theme.spacing.unit}px 0`,
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
  textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 5% 5% 5%'
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  fullWidth: {
    width: '100%',
    // float: 'left'
  },
  textField: {
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: '90%',
        
    },
    textField2: {
        marginLeft: 32,
        //marginRight: theme.spacing.unit * 3,
        width: '95%',
    },
    successMsg : {
      color: 'green',
      fontSize: 'x-large',
      fontWeight: 'bold',
    }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


class TakeQuiz extends React.Component {
  state = {
    userId: '',
    is_student: '',
    questionsList : '',
    answerList: [],
    answer: '',
    quizScore: '',
    message: '',
    displayingQuiz: null
  };

  componentWillMount = () => {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const propsData = this.props.selectedCourse.quizzes
    const quizIndex = this.props.selectedCourse.quizIndex;
    
    console.log(quizIndex)
    this.setState({
      userId: decoded.id,
      is_student: decoded.faculty,
      displayingQuiz : propsData[quizIndex].quiz,
      questionsList : propsData[quizIndex].quiz.questions,
      answerList : new Array(propsData[quizIndex].quiz.questions.length),
    })

    // console.log(propsData[quizIndex].quiz)
    
  }


  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleChange = (text, e) => {
    this.setState({ 
      answer : e.target.value
    });
    // console.log("Hello");
    // console.log(text);
    this.state.answerList[text] = e.target.value;
    this.forceUpdate();
  };



 handleRadioChange = event => {
  this.setState({ selectedOption: event.target.value });
};

submitQuiz = (e) => {
  e.preventDefault();
  // console.log("Hello");
  // console.log(this.state.answerList);

  let count = 0;
  let totalMarks = this.state.answerList.length*2
  for(let i = 0; i<this.state.answerList.length; i++)
  {
    if(this.state.answerList[i] === this.state.questionsList[i].answer)
    {
      count = count + 1;
    }
  }
  let marksObtained = count*2
  
  const quizMarks = {
    userId : this.state.userId,
    name: "Quiz " + this.state.displayingQuiz.quizId,
    marksObtained : marksObtained,
    totalMarks : totalMarks
  }

  this.props.submitMarks(quizMarks)

  this.setState({
    quizScore : count*2,
    message: "Your Score is " + count*2 + " out of " + totalMarks,
  })

}

  render() {
    const { classes, theme } = this.props;
    const header = "Quiz"
    return (
      <div style={{marginTop: '32px', width: '70%', marginLeft: '25%'}}>

        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
            
        </div>
        {
          this.state.message === ""
          ?
          <Paper className={classes.paperClass}>
        <label className={classes.successMsg}>{this.state.message}</label>
          <form  className={classes.container}>
            <div>
            {Object.keys(this.state.questionsList).map((text, index) => (
            <Grid
            container
            direction="row"
            // justify="center"
            alignItems="left"
            className={classes.bgPaper}
            >
              
              <div style={{display: this.state.questionsList[text].questionType == 'Essay Question' ? 'block' : 'none'}}>
                <FormControl>
                  <label>{this.state.questionsList[text].question}</label>
                  <Input id={text} aria-describedby="my-helper-text" 
                  value={this.state.answerList[text]}
                  onChange={(e) => this.handleChange(text, e)}/>
                </FormControl>
              </div>

              <div style={{display: this.state.questionsList[text].questionType == 'Multiple Choice Question' ? 'block' : 'none'}}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">{this.state.questionsList[text].question}</FormLabel>
                    <RadioGroup
                      aria-label=""
                      name=""
                      id={text}
                      className={classes.group}
                      value={this.state.answerList[text]}
                      onChange={(e) => this.handleChange(text, e)}
                    >
                      <FormControlLabel value={this.state.questionsList[text].option1} 
                        control={<Radio color="primary" />}
                        label={this.state.questionsList[text].option1} />
                      <FormControlLabel value={this.state.questionsList[text].option2} 
                        control={<Radio color="primary" />}
                      label={this.state.questionsList[text].option2} />
                      <FormControlLabel value={this.state.questionsList[text].option3} 
                        control={<Radio color="primary" />} 
                        label={this.state.questionsList[text].option3} />
                      <FormControlLabel value={this.state.questionsList[text].option4} 
                        control={<Radio color="primary" />} 
                        label={this.state.questionsList[text].option4} />
                    </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            ))}
            
              {
                !this.state.is_student
                ?
                <Button 
                type="submit" variant="contained" color="primary" className={classes.button}
                // style={{display : this.state.is_student == "false" ? 'block' : 'none'}}
                onClick={this.submitQuiz}
                >
                  Submit Quiz
                </Button>
              :
              <div></div>

              }
            </div>
          </form>
  
          
      </Paper>
          :
          <div>
            <label className={classes.successMsg}>{this.state.message}</label>
            <Button 
                type="submit" variant="contained" color="primary" className={classes.button}
                // style={{display : this.state.is_student == "false" ? 'block' : 'none'}}
                onClick={() => this.props.courseSection('quizzes', this.props.history)}
                >
                  Back
            </Button>
          </div>
        }
      </div>
    );
  }
}

TakeQuiz.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})


export default connect(mapStateToProps, {quizInfo, questionInfo, questions, createQuiz, createQuestion, getQuizzes, getQuestions, setQuizIndex, courseSection, submitMarks})(withStyles(styles, { withTheme: true })(withRouter(TakeQuiz)));