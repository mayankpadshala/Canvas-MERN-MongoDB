import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';

import { Paper } from '@material-ui/core';

import {createAnncouncement, deleteAnnouncement} from '../../../../redux/actions/courseActions'

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 884,
      backgroundColor: '#f0f0f0',
      padding: '32px',
      border: '0.5px solid black'
  },
  header: {
    textAlign: 'center'
  },
  nested: {
      paddingLeft: theme.spacing.unit * 4,
      paddingRight: theme.spacing.unit * 4,
    },
  bgPaper: {
      padding: '4px',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    listItemText: {
      margin: '16px'
    },
    divider: {
      border: '0.5px solid black'
    },
    textHidden: {
      width: "800px",
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
      margin: "16px 0px 0px 0px",
      fontWeight: 'bold',
      fontSize: '1.2em',
    },
  });

class Announcements extends Component {

  state = {
    posting: false
  }

  componentWillMount() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    // console.log(decoded);

    this.setState({
      isFaculty: decoded.faculty,
    })
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    // console.log(this.state.TITLE);
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.createAnncouncement(this.props.selectedCourse.selectedCourse._id , this.state.title, this.state.description)
    this.setState({
      posting: !this.state.posting
    });
  }

  delete = (announcementId) => {
    this.props.deleteAnnouncement(this.props.selectedCourse.selectedCourse._id, announcementId)
  }

  
  render() {
    const { classes } = this.props;

    const announcement = this.props.selectedCourse.selectedCourse.announcement

    const displayAnnouncements = (
      <div>
          {Object.keys(announcement).map((key, index) => (
          <div>     
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.bgPaper}
            >
                <Grid item xs={1}>
                <Avatar alt="Remy Sharp"  className={classes.profileImg} >MP</Avatar>
                </Grid>
                <Grid
                item xs={8}
                container
                direction="column"
                justify="center"
                width='100%'
                className={classes.bgPaper}
                >
                    <Typography variant="h6" gutterBottom> {announcement[key].title} </Typography>
                    <Typography noWrap className={classes.textHidden} variant="subheading" > {announcement[key].description} </Typography>
                </Grid>
                
                <Grid
                item xs={2}
                container
                direction="column"
                justify="center"
                className={classes.bgPaper}
                >
                    <Typography variant="subtitle1" > Posted On </Typography>
                    <Typography> {announcement[key].date} </Typography>
                </Grid>

                <Grid item xs={1}>
                  {this.state.isFaculty ? <button onClick={() => {this.delete(announcement[key]._id)}}>Delete</button>: <div></div>}
                </Grid>
                
            </Grid>
  
            <Divider className={classes.divider}/>
          </div>
  
        ))}
      </div>
    )

    const postingForm = (
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
              name="title"
              onChange={this.onChange}
            />

            <div className={classes.heading}>DESCRIPTION : </div>
            <TextField
              // id="outlined-multiline-static
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="description"
              onChange={this.onChange}
            />

            <Paper className={classes.header}>
              <Button variant="contained" className={classes.post} type='submit'>
                Submit Announcement
              </Button>
            </Paper>
        </div>
      </form>
      </div>
    )

    return (
      <div style={{margin: '64px 0 0 120px'}}>     
          {this.state.isFaculty ? 
            
            <Paper className={classes.header}>

                <Button 
                variant="contained" 
                className={classes.post} 
                // type="submit" 
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    posting: !this.state.posting
                  });
                  
                }}
                >
                POST ANNOUNCEMNET
                </Button>

            </Paper>
            :
            <div>

            </div>

          }

      <Divider className={classes.divider}/>
        
        {
          this.state.posting ?
          postingForm
          :
          displayAnnouncements
        }
      </div>
    );
  }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    selectedCourse: PropTypes.object.isRequired,
  };
    
  
  const mapStateToProps = (state) => ({
    nav : state.nav,
    selectedCourse : state.selectedCourse
  })
  
  export default connect(mapStateToProps, { createAnncouncement, deleteAnnouncement })(withStyles(styles)(withRouter(Announcements)));

