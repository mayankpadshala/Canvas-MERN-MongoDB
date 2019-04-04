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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { getQuizByCourse, createQuiz, getQuizQuestions, addQuizQuestion } from '../../UserFunctions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 884,
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
  },
  form: {
    margin: '32px'
  }

});

class Quizzes extends React.Component {
  state = {
    open: true,
    SJSUID: '',
    COURSEID: '',
    FLAG: false,
    quizzes: [],
    createQuiz: false,
    QUIZNAME: '',
    DUEDATE: '',
    addQuestions: false,
    currentCreatingQuiz: 0,
    value: 1,
    addedQuestions: [],
    QUESTION: '',
    OPTION1: '',
    OPTION2: '',
    OPTION3: '',
    OPTION4: '',
    viewQuiz: false,
    takeQuiz: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  initialRender = () => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      COURSEID: this.props.COURSEID,
      FLAG: decoded.FLAG,
    })

    //Get the Quizes of this course
    getQuizByCourse(this.props.COURSEID)
    .then(res => {
      this.setState({quizzes: res.data})
    })

    // this.getCurrentCreatingQuizData()

  }

  componentWillMount() {
      this.initialRender();
  }
  
  takeQuiz = () => {
    console.log("Implement TakeQuiz");
  }

  createQuiz = () => {
    console.log("Implement CreateQuiz");  
    this.setState({createQuiz: true});
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getCurrentCreatingQuizData = () => {
    getQuizQuestions(this.state.currentCreatingQuiz)
    .then(response => {
      console.log(response)
      this.setState({addedQuestions: response.data})
    })
  }

  getQuizData = (id) => {
    getQuizQuestions(id)
    .then(response => {
      console.log(response)
      this.setState({addedQuestions: response.data})
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    createQuiz({
      COURSEID: this.state.COURSEID,
      SJSUID: this.state.SJSUID,
      QUIZNAME: this.state.QUIZNAME,
      DUEDATE: this.state.DUEDATE,
    })
    .then(res => {
      this.setState({currentCreatingQuiz: res.data.ID})
      console.log(res.data.ID);

    })

    this.setState({
      addQuestions: true,
    })

  }

  submitQuestion = () => {
    const quizData = {
      QUIZID: this.state.currentCreatingQuiz,
      QUESTION: this.state.QUESTION,
      OPTION1: this.state.OPTION1,
      OPTION2: this.state.OPTION2,
      OPTION3: this.state.OPTION3,
      OPTION4: this.state.OPTION4,
      ANSWER: this.state.value,      
  }

  addQuizQuestion(quizData)
  .then(response => {
    console.log(response);
    this.getQuizData(this.state.currentCreatingQuiz)
  })

  

  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  viewQuiz = (id) => {
    console.log(id);
    this.getQuizData(id);
    this.setState({viewQuiz: true, currentCreatingQuiz: id})
  }

  takeQuiz = (id) => {
    this.getQuizData(id);
    this.setState({takeQuiz: true,  currentCreatingQuiz: id})
  }
  
  render() {
    const { classes } = this.props;

      //Views
      const header = (
        <div style={{textAlign: 'center'}}>
          {/* <Paper style={{textAlign: 'center'}}> */}
              <Button variant="contained" className={classes.post} onClick={() => this.createQuiz()}>
                Create Quiz
              </Button>
          {/* </Paper> */}
        </div>
      )

      const CreateQuiz = (
        <div>
          <Paper>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <div style={{    display: "flex", flexDirection: "column", width: '60%'}}>
                  <div className={classes.heading}>QUIZNAME : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="QUIZNAME"
                    onChange={this.onChange}
                  />

                 

                  <div className={classes.heading}>DUEDATE : </div>
                  <TextField
                        required='true'
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

                  {/* <Paper className={classes.header}> */}
                  <div className={classes.heading}>
                    <Button variant="contained" className={classes.post} type='submit'>
                      Create Quiz
                    </Button>
                    </div>
                  {/* </Paper> */}
                  </div>
            </form>
          </Paper>
        </div>
      )

      const ViewQuizzes = (
        <div>
          <div>
            {this.state.FLAG ? header: <div></div>}
          </div>


          <List
          component="nav"
          // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
          className={classes.root}
          >
            <ListItem button onClick={this.handleClick}>
              {/* <ListItemText inset primary="Course Quizzes" /> */}
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
              <Typography variant="h6" gutterBottom> 
                <strong>Course Quizzes</strong>
              </Typography>
              
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit className={classes.listItemText}>
                  
                      {Object.keys(this.state.quizzes).map((key, index) => (
                          
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
                              <Grid item xs={10}>
                                  <Grid
                                      container
                                      direction="column"
                                      justify="flex-start"
                                      alignItems="flex-start"
                                  >
                                      <Typography variant="h6" gutterBottom>
                                          <strong>{this.state.quizzes[key].QUIZNAME}</strong>
                                      </Typography>
                                      <Typography variant="body1" gutterBottom>
                                          {/* <strong>Available until</strong> {this.state.quizzes[key].DUEDATE} |&nbsp; */}
                                          <strong>Due</strong> {this.state.quizzes[key].DUEDATE} |&nbsp;
                                          {/* <strong>-/{this.state.quizzes[key].QUIZNAME}</strong> pts */}
                                      </Typography>

                                  </Grid>
                              </Grid>
                              <Grid item xs={1}>
                                  {this.state.FLAG ? <button onClick={() => this.viewQuiz(this.state.quizzes[key].ID)}>View</button> : <button onClick={() => this.takeQuiz(this.state.quizzes[key].ID)}>Take</button>}
                              </Grid>
                          </Grid>
                          
                      ))}

            </Collapse>
            
            </List>
          </div>
      )

      const AddQuestions = (
        <div>
          {console.log(this.state.value)}
          <Paper>
            {/* <form className={classes.form} onSubmit={this.submitQuestion}> */}
              <div style={{    display: "flex", flexDirection: "column", width: '60%'}}>
                  <div className={classes.heading}>QUESTION : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="QUESTION"
                    onChange={this.onChange}
                  />

                  <div className={classes.heading}>OPTION1 : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="OPTION1"
                    onChange={this.onChange}
                  />

                  <div className={classes.heading}>OPTION2 : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="OPTION2"
                    onChange={this.onChange}
                  />

                  <div className={classes.heading}>OPTION3 : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="OPTION3"
                    onChange={this.onChange}
                  />

                  <div className={classes.heading}>OPTION4 : </div>
                  <TextField
                    // id="outlined-multiline-static
                    // multiline
                    required='true'
                    rows="1"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="OPTION4"
                    onChange={this.onChange}
                  />

                  <div className={classes.heading}>Select correct answer option(default - 1) : </div>
                      <RadioGroup
                        required='true'
                        aria-label="Options"
                        name="Options"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        
                      </RadioGroup>

                  {/* <Paper className={classes.header}> */}
                    <div className={classes.heading}>
                      <Button variant="contained" className={classes.post} onClick={this.submitQuestion}>
                        Add Question
                      </Button>
                    </div>

                    <div className={classes.heading}>
                      <Button variant="contained" className={classes.post} onClick={() => {this.setState({createQuiz: false, addQuestions: false})}}>
                        Back
                      </Button>
                    </div>

                  {/* </Paper> */}
                  </div>
            {/* </form> */}
          </Paper>

          <div>
            <h1>Already Created Questions</h1>
          {Object.keys(this.state.addedQuestions).map((key, index) => (
            <div>
              <h1>{this.state.addedQuestions[key].QUESTION}</h1>
                      
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION1}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION2}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION3}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION4}</h4>
            </div>
          )) }
          </div>

        </div>
      )

      const TakeQuiz = (
        <div>
          <button onClick={() => {this.setState({takeQuiz: false})}}>Back</button>
          {Object.keys(this.state.addedQuestions).map((key, index) => (
            <div>
              <h1>{this.state.addedQuestions[key].QUESTION}</h1>
                        <RadioGroup
                          required='true'
                          aria-label="Options"
                          name="Options"
                          className={classes.group}
                          value={this.state.value}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel value={this.state.addedQuestions[key].OPTION1} control={<Radio />} label={this.state.addedQuestions[key].OPTION1} />
                          <FormControlLabel value={this.state.addedQuestions[key].OPTION2} control={<Radio />} label={this.state.addedQuestions[key].OPTION2} />
                          <FormControlLabel value={this.state.addedQuestions[key].OPTION3} control={<Radio />} label={this.state.addedQuestions[key].OPTION3} />
                          <FormControlLabel value={this.state.addedQuestions[key].OPTION4} control={<Radio />} label={this.state.addedQuestions[key].OPTION4} />
                          
                        </RadioGroup>
            </div>
          )) }
        </div>
      )

      const ViewQuiz = (
        <div>
          <button onClick={() => {this.setState({viewQuiz: false})}}>Back</button>
          {Object.keys(this.state.addedQuestions).map((key, index) => (
            <div>
              <h1>{this.state.addedQuestions[key].QUESTION}</h1>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION1}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION2}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION3}</h4>
              <h4 style={{marginLeft: '32px'}}>{this.state.addedQuestions[key].OPTION4}</h4>
            </div>
          )) }
        </div>
      )
      

    return (
      <div style={{marginTop: '32px'}}>
        
        {this.state.takeQuiz? TakeQuiz : this.state.viewQuiz? ViewQuiz : this.state.addQuestions ? AddQuestions :this.state.createQuiz ? CreateQuiz : ViewQuizzes}
        
      </div>
    );
  }
}

Quizzes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quizzes);