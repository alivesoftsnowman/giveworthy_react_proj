import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';

import Stepper from '@components/BarStepper';
import { ValidatorForm, TextValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:"relative"
    },
    form:{
        width:"100%", 
        margin:'30px auto',
        display:'block'
    },
    skipBtn:{
      textAlign:'center',
      fontSize:16,
      margin: "40px auto",
      display: "block",
      color:"#ADADAD",
      textTransform: "initial"
   },
   backBtn:{
     fontSize:20,
     fontWeight:400,
     margin: "10px auto",
     color:"#ADADAD",
     textTransform: "initial",
     left:"-15%",
     top:0,
     position:"absolute",
   }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  getCurrentUser,
  ( activePageInfo, currentUser) => ({
    activePageInfo,
    currentUser
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { currentUser, setActiveQuestionnaire } = props;
    this.state={
        note:currentUser.note||""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    setActiveQuestionnaire(4);

  }
  
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleSubmit(){
    const { nextPage, 
      updateUserInfo } = this.props;
    
    const state = this.state;
    Object.keys(state).forEach(key => {
      updateUserInfo(key, state[key]);
    });
    nextPage();
    this.props.history.push('/giver-questionnarie-step-5'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage(this.props.history);
    this.props.history.push('/giver-questionnarie-step-5'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/giver-questionnarie-step-3'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Tell us why you help
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Why do you want to give? What driving you?
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
             
            <TextValidator
                fullWidth
                id="note"
                name="note"
                multiline={true}
                placeholder = "You'll enter in the reasons why you like to help, maybe a story or a reason behind what drives you to give."
                ref="note"
                rows="4"
                formcontrolstyle={styles.form}
                value={this.state.note}
                validators={['required']}
                errorMessages={['Your note is required']}
                onChange={this.handleChange('note')}
            />
        
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            Next
            </Button>
        </ValidatorForm>
        <Button  style={styles.skipBtn} onClick={this.handleSkip}>
        Skip
        </Button>
        <Button  style={styles.backBtn} onClick={this.handleBack}>
          &lt; Back
        </Button>
        <Stepper steps={activePageInfo}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  prevPage,
  updateUserInfo,
  setActiveQuestionnaire
})(QuestionnarieComponent));