import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateCause} from  '@actions/cause';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from '@components/Validators';
import Stepper from '@components/BarStepper';
import getCause from '@selectors/getCause';
import { saveCause } from '@actions/cause';
const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:"relative"
    },
    form:{
      width:500, 
      margin:'30px auto',
      display:'block'
    },
    backBtn:{
      fontSize:20,
      fontWeight:400,
      margin: "10px auto",
      color:"#ADADAD",
      textTransform: "initial",
      left:"-20%",
      top:0,
      position:"absolute",
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
      details:cause.details||""
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
    this.props.history.push('/charity-questionnarie-step-5'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/charity-questionnarie-step-3'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-5'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          What are you tring to achive?
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          some details about what you want to accomplish
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
          <TextValidator
            fullWidth
            id="details"
            name="details"
            multiline={true}
            placeholder = "Initiatives that they are tring to fund at the moment"
            rows="4"
            formcontrolstyle={styles.form}
            value={this.state.details}
            validators={['required']}
            errorMessages={['Your details is required']}
            onChange={this.handleChange('details')}
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
  saveCause,
  updateCause,
  setActiveQuestionnaire
})(QuestionnarieComponent));