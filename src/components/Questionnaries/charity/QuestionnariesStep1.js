import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage} from '@actions/questionnaires';
import {updateCause} from  '@actions/cause';
import { Button } from '@material-ui/core';

import Stepper from '@components/BarStepper';
import { ValidatorForm, TextValidator} from '@components/Validators';
import getCause from '@selectors/getCause';
import { saveCause } from '@actions/cause';

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto'
    },
    form:{
        width:500, 
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
   }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  getCause,
  ( activePageInfo, cause) => ({
    activePageInfo,
    cause
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { cause, setActiveQuestionnaire } = props;
    this.state={
      description:cause.description||"",
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    setActiveQuestionn
    aire(1);
  }
  
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleSubmit(){
    const { nextPage, 
      saveCause,
      cause,
      updateCause } = this.props;
    const state = this.state;
    Object.keys(state).forEach(key => {
      updateCause(key, state[key]);
    });
    saveCause({
      id:cause.get("id"),
      ...this.state
    })
    nextPage();
    this.props.history.push('/charity-questionnarie-step-2'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-2'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Hi,
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Tell us a little about your charity
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
          <TextValidator
            fullWidth
            id="description"
            name="description"
            multiline={true}
            placeholder = "Mission statement"
            rows="4"
            formcontrolstyle={styles.form}
            value={this.state.description}
            validators={['required']}
            errorMessages={['Your note is required']}
            onChange={this.handleChange('description')}
          />
                    
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            Next
            </Button>
        </ValidatorForm>
        <Button  style={styles.skipBtn} onClick={this.handleSkip}>
        Skip
        </Button>
        <Stepper steps={activePageInfo}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  updateCause,
  saveCause,
  setActiveQuestionnaire
})(QuestionnarieComponent));