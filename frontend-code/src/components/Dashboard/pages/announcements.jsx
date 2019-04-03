import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';

import { getAnnounByCors, getUser, createAnnouncement, delAnnouncement } from '../../UserFunctions'
import { Paper } from '@material-ui/core';

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
    SJSUID: '',
    COURSEID: '',
    announcements: [],
    FLAG: false,
    posting: false,
    TITLE: '',
    DESCRIPTION: '',
  }

  initialRender = () => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
      // console.log(decoded.SJSUID);
      this.setState({
        SJSUID : decoded.SJSUID,
        COURSEID: this.props.COURSEID,
        FLAG: decoded.FLAG,
        posting: false,
      });

      getAnnounByCors(this.props.COURSEID)
      .then(res => {
        // console.log(res.data.announcements);
        this.setState({announcements: res.data.announcements});
      })

  }

  componentWillMount() {
    this.initialRender();
    // console.log(this.state.announcements)
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    // console.log(this.state.TITLE);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const announce = {
      COURSEID : this.state.COURSEID,
      TITLE : this.state.TITLE,
      DESCRIPTION : this.state.DESCRIPTION,
      CREATEDBY : this.state.SJSUID
    }
    //  console.log(this.state.TITLE);
    //  console.log(this.state.DESCRIPTION);
    createAnnouncement(announce)
    .then(res => {
      console.log(res);
    })

    this.initialRender();
    
  }

  delete = (id) => {
    delAnnouncement(id)
    .then(res => {
      console.log(res);
      this.initialRender();
    })
  }

  
  render() {
    const { classes } = this.props;

    const displayAnnouncements = (
      <div>
          {Object.keys(this.state.announcements).map((key, index) => (
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
                    <Typography variant="h6" gutterBottom> {this.state.announcements[key].TITLE} </Typography>
                    <Typography noWrap className={classes.textHidden} variant="subheading" > {this.state.announcements[key].DESCRIPTION} </Typography>
                </Grid>
                
                <Grid
                item xs={2}
                container
                direction="column"
                justify="center"
                className={classes.bgPaper}
                >
                    <Typography variant="subtitle1" > Posted On </Typography>
                    <Typography> {this.state.announcements[key].TIMESTAMP} </Typography>
                </Grid>

                <Grid item xs={1}>
                  {this.state.FLAG ? <button onClick={() => {this.delete(this.state.announcements[key].ID)}}>Delete</button>: <div></div>}
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
              name="TITLE"
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
              name="DESCRIPTION"
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
      <div style={{marginTop: '64px'}}>     
          {this.state.FLAG ? 
            
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
  };
  
export default withStyles(styles)(Announcements);
