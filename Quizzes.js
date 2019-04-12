import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SwipeableViews from 'react-swipeable-views';
import {Typography, Button, Paper, TextField, AppBar, Tabs, Tab} from '@material-ui/core';
import {Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, FormHelperText} from '@material-ui/core';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as quizData from '../../actions/quizAction';
import {Redirect} from 'react-router'

const styles = theme => ({
  root1: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 5,
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
    padding: '0% 5% 5%'
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


class Quizzes extends React.Component {
  state = {
    value: 0,
    open: true,
    is_student: '',
    sjsuID: '',
    courseId: '',
    createQuiz: '',
    quizID: '',
    dueDate: '',
    quizType: '',
    totalPoints: '',
    instructions: '',
    questionType: 'Multiple Choice Question',
    question: '',
    showOptions: true,
    errorMessage: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer : '',
    points: '',
    quizzes: '',
    selectedOption: '',
    questionsList : '',
    successMessage: '',
    redirectVar: '',
  };

  componentWillMount = () => {
    let propsData = this.props.quizData.CourseReducer.CourseReducer;
    // const data = {
    //   courseId: window.sessionStorage.getItem('courseId'),
    //   sjsuID: window.sessionStorage.getItem('sjsuID'),
    // }

    this.setState({
      courseId: window.sessionStorage.getItem('courseId'),
      sjsuID: window.sessionStorage.getItem('sjsuID'),
      is_student: window.sessionStorage.getItem('is_student'),
    })

    const data = {
      courseId : propsData.courseId,
    }
    
    this.props.getQuizzes(data)
    .then(response => {
      propsData = this.props.quizData.CourseReducer.CourseReducer;
      if(propsData)
      {
        console.log(propsData);
        this.setState({
          quizzes : propsData.quizzes
        })
      }

    })
    .catch(error => {
      console.log(error)
    })
  }

  checkQuestionType  = (e) => {
  
     if(e.target.value === 'Multiple Choice Question')
     {
        this.setState({
          questionType : e.target.value,
          showOptions : true,
          errorMessage : ''
        })
     }
     else if(e.target.value === 'Essay Question')
     {
        this.setState({
          questionType : e.target.value,
          showOptions : false,
          errorMessage : ''
        })
     }
     
  }   

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeState = name => e => {
    this.setState({
     [name] : e.target.value,
     errorMessage : '',
     successMessage : ''
    })
 }

 showCreate = () => {
   this.setState({
     createQuiz : true
   })
 }

 createQuiz = (e) => {
   e.preventDefault();
  // this.setState({
  //   createQuiz : false
  // })
  const data = this.state;
  console.log(data);
  this.props.createQuiz(data)
  .then(response => {
    console.log(this.props.quizData);
    const propsData = this.props.quizData.CourseReducer.CourseReducer;
    if(propsData.errorMessage != '')
    {
      this.setState({
        errorMessage : propsData.errorMessage,
      })
    }
    else
    {
      this.setState({
        quizzes : propsData.quizzes,
        quizID: '',
        dueDate: '',
        totalPoints: '',
        instructions: '',
        successMessage: 'Quiz created successfully!!! Now add the questions.'
      })
    }
    
  })
  .catch(error => {
    console.log(error);
    
    })
 }


 showQuiz = (e, quizIndex) => {
   e.preventDefault();
   console.log("Hel");
   this.setState({
     redirectVar : <Redirect to={{
        pathname: "/course/takequiz",
        quizIndex: quizIndex
     }}></Redirect>
   })

 } 

 addQuestion = (e) => {
        e.preventDefault();
        
      // this.setState({
      //   createQuiz : false
      // })
      const data = this.state;
      console.log(data);

      this.props.createQuestion(data)
      .then(response => {
        console.log(this.props);
        const propsData = this.props.quizData.CourseReducer.CourseReducer;
        this.setState({
          quizzes : propsData.quizzes,
          quizID: '',
          question: '',
          errorMessage: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer : '',
          successMessage: 'Question created successfully !!!'
        })
      })
      .catch(error => {
          console.log(error);
        })
      
 }

 handleRadioChange = event => {
  this.setState({ selectedOption: event.target.value });
};

  render() {
    const { classes, theme } = this.props;
    const header = "Quizzes"
    const types = ['Multiple Choice Question', 'Essay Question']

    return (
      <div style={{marginTop: '32px'}}>
        {this.state.redirectVar}
        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
            <div style={{display: window.sessionStorage.getItem('is_student') == 'true' ? 'none' : 'initial'}}>
              {
              this.state.is_student 
              ? 
              <Button type="submit" variant="contained" color="primary" className={classes.button}
                onClick={this.showCreate}
                style={{display: this.state.createQuiz ? 'none' : 'initial'}}
              >
                Create Quiz
              </Button>
              :
              <div></div>
              }
            </div>
        </div>
        <Paper className={classes.paperClass}
        style={{display: this.state.createQuiz ? 'block' : 'none'}}>

        <AppBar position="static" color="default">
          <Tabs
            id='value'
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Quiz" />
            <Tab label="Question" />
          </Tabs>
        </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
          <TabContainer dir={theme.direction} style={{ overflowX : 'inherit'}}>
              <form className={classes.container} onSubmit={this.createQuiz}>
                  <div className={classes.fullWidth}>
                    <label style={{color:'red'}}>{this.state.errorMessage}</label>
                    <label style={{color:'green'}}>{this.state.successMessage}</label>
                  </div>
                  <Grid container spacing={12}> 
                    <Grid item xs={12}>
                    <div>
                      <TextField
                        id="quizID"
                        label="Quiz ID"
                        className={classes.textField2}
                        value={this.state.quizID}
                        onChange={this.handleChangeState('quizID')}
                        margin="normal"
                        required
                        >
                      </TextField>
                    </div>
                    <div>
                      <TextField
                        id="instructions"
                        label="Quiz Instructions"
                        className={classes.textField2}
                        value={this.state.instructions}
                        multiline
                        rows="3"
                        onChange={this.handleChangeState('instructions')}
                        margin="normal"
                        >
                      </TextField>
                    </div>
                    </Grid>

                  </Grid>
                  <Grid container spacing={12}> 
                    <Grid item xs={6}>
                    <div>
                      <TextField
                      id="totalPoints"
                      label="Total Points"
                      className={classes.textField}
                      value={this.state.totalPoints}
                      onChange={this.handleChangeState('totalPoints')}
                      margin="normal"
                      required
                      >
                      </TextField>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <TextField
                      id="dueDate"
                      label="Due Date"
                      type="datetime-local"
                      className={classes.textField}
                      value={this.state.dueDate}
                      onChange={this.handleChangeState('dueDate')}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      >
                      </TextField>
                    </div>
                  </Grid>
                  </Grid>

                  <div>
                      <Button
                      type="submit"
                      variant="contained"
                      color="primary" 
                      className={classes.button}
                      >
                      Create Quiz
                      </Button>
                  </div>
              </form>
          </TabContainer>
          <TabContainer dir={theme.direction}>
              <form className={classes.container} onSubmit={this.addQuestion}>
                  <div className={classes.fullWidth}>
                    <label style={{color:'red'}}>{this.state.errorMessage}</label>
                    <label style={{color:'green'}}>{this.state.successMessage}</label>
                  </div>
                  
                  <Grid container spacing={12}> 
                    <Grid item xs={6}>
                    <div>
                      <TextField
                      id="quizID"
                      label="Quiz ID"
                      className={classes.textField}
                      value={this.state.quizID}
                      onChange={this.handleChangeState('quizID')}
                      margin="normal"
                      required
                      >
                      </TextField>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                    <TextField
                        id="questionType"
                        select
                        label="Select Question Type"
                        className={classes.textField}
                        value={this.state.questionType}
                        onChange={this.checkQuestionType}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select question type"
                        margin="normal"
                        >
                        {types.map(option => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                      </TextField>
                    </div>
                  </Grid>
                  </Grid>

                  <Grid container spacing={12}> 
                    <Grid item xs={12}>
                    <div>
                      <TextField
                        id="question"
                        label="Question"
                        className={classes.textField2}
                        value={this.state.question}
                        onChange={this.handleChangeState('question')}
                        margin="normal"
                        required
                        >
                      </TextField>
                    </div>
                    </Grid>
                  </Grid>

                  <div style={{display: this.state.showOptions ? 'block' : 'none'}}>
                    <Grid container spacing={12}> 
                        <Grid item xs={6}>
                        <div>
                          <TextField
                          id="option1"
                          label="Option 1"
                          className={classes.textField}
                          value={this.state.option1}
                          onChange={this.handleChangeState('option1')}
                          margin="normal"
                          
                          >
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <TextField
                          id="option2"
                          label="Option 2"
                          className={classes.textField}
                          value={this.state.option2}
                          onChange={this.handleChangeState('option2')}
                          margin="normal"
                          
                          >
                          </TextField>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={12}> 
                        <Grid item xs={6}>
                        <div>
                          <TextField
                          id="option3"
                          label="Option 3"
                          className={classes.textField}
                          value={this.state.option3}
                          onChange={this.handleChangeState('option3')}
                          margin="normal"
                          
                          >
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <TextField
                          id="option4"
                          label="Option 4"
                          className={classes.textField}
                          value={this.state.option4}
                          onChange={this.handleChangeState('option4')}
                          margin="normal"
                          
                          >
                          </TextField>
                        </div>
                      </Grid>
                  </Grid>
                  </div>

                  <Grid item xs={12}>
                        <div>
                          <TextField
                          id="correctAnswer"
                          label="Correct Answer"
                          className={classes.textField}
                          value={this.state.correctAnswer}
                          onChange={this.handleChangeState('correctAnswer')}
                          margin="normal"
                          required
                          >
                          </TextField>
                        </div>
                      </Grid>

                  <div>
                      <Button
                      type="submit"
                      variant="contained"
                      color="primary" 
                      className={classes.button}
                      >
                      Submit Question
                      </Button>
                  </div>
              </form>
          </TabContainer>
        </SwipeableViews>
            
        </Paper>

            <Paper className={classes.paperClass}>
        <List
        component="nav"
        // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root1}
        >
          <ListItem button onClick={this.handleClick}>
            {/* <ListItemText inset primary="Course Quizzes" /> */}
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
            <Typography variant="h6" gutterBottom> 
              <strong>Course Quizzes</strong>
            </Typography>
            
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit className={classes.listItemText}>
                
                    {/* {[['Quiz1', 'Due date', 'Time', 'points'], ['Quiz2', 'Due date', 'Time', 'points'], ['Quiz3', 'Due date', 'Time', 'points'], ['Quiz4', 'Due date', 'Time', 'points'] ].map((text, index) => ( */}
                      {Object.keys(this.state.quizzes).map((text, index) => (
                        <div>
                        <Grid
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
                                        <strong>{this.state.quizzes[text].QUIZ_ID}</strong>
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {/* <strong>Available until</strong> {text[1]} |&nbsp; */}
                                        <strong>Due Date</strong> {this.state.quizzes[text].DUE_DATE} |&nbsp;
                                        <strong>{this.state.quizzes[text].TOTAL_POINTS}</strong> pts
                                    </Typography>

                                </Grid>

                            </Grid>
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Button 
                                    type="submit" variant="contained" color="primary" className={classes.button}
                                    style={{display : this.state.is_student == "true" ? 'block' : 'none'}}
                                    onClick={(e) => this.showQuiz(e, text)}>
                                      Take Quiz
                                    </Button>
                                    <Button 
                                    type="submit" variant="contained" color="primary" className={classes.button}
                                    style={{display : this.state.is_student == "false" ? 'block' : 'none'}}
                                    onClick={(e) => this.showQuiz(e, text)}>
                                      View Quiz
                                    </Button>

                                </Grid>

                            </Grid>
                        </Grid>
                        
                        
                        </div>
                        
                    ))}

          </Collapse>
          
          </List>
          </Paper>
      </div>
    );
  }
}

Quizzes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    quizData : state
  }
}

const mapDispacthToProps = (dispatch) => {
  return bindActionCreators(quizData, dispatch);
}
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles, { withTheme: true })(Quizzes));