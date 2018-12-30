import React, { PureComponent } from 'react';
import {List} from "immutable";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import {getActivePageInfo } from '@selectors/questionnaires';

import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateCause,saveCause} from  '@actions/cause';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stepper from '@components/BarStepper';
import getCause from '@selectors/getCause';


const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto',
        position:"relative"
    },
    form:{
      width:300, 
      margin:'30px auto',
      display:'block'
    },
    formControl:{
      width:200, 
      margin:'0px auto',
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

    var tags = cause.get("tags");
    var tagsString = tags?tags.join(","):"";
    this.state={
      "environmental":tagsString.indexOf("environmental")>-1,
      "social":tagsString.indexOf("social")>-1,
      "educational":tagsString.indexOf("education")>-1,
      "animal":tagsString.indexOf("animal")>-1,
      "ngos":tagsString.indexOf("ngos")>-1,
      "health":tagsString.indexOf("health")>-1,
      "art_culture":tagsString.indexOf("art_culture")>-1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.handleBack = this.handleBack.bind(this);
    setActiveQuestionnaire(2);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.checked });
  };
  
  handleSubmit(){
    const { nextPage, 
      saveCause,
      cause,
      updateCause } = this.props;
    const state = this.state;
    var tags = [];
    Object.keys(state).forEach(key => {
      if (state[key])
        tags.push(key);
    });
    updateCause("tags", List(tags));
    saveCause({
      id:cause.get("id"),
      tags:tags
    })
    nextPage();
    this.props.history.push('/charity-questionnarie-step-3'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/charity-questionnarie-step-1'); 
  }
  handleSkip(){
    const { nextPage} = this.props;
    nextPage();
    this.props.history.push('/charity-questionnarie-step-3'); 
  }
  render() {
    const { 
      activePageInfo
    } = this.props;
    const causeTypeList = [{
      value:"environmental",
      label:"Environmental"
    },{
      value:"social",
      label:"Social"
    },{
      value:"educational",
      label:"Educational"
    },{
      value:"animal",
      label:"Animal"
    },{
      value:"ngos",
      label:"International NGOs"
    },{
      value:"health",
      label:"Health"
    },{
      value:"art_culture",
      label:"Art & Culture"
    }];
    const self = this;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          What Causes do you related to?
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          
        </Typography>
        
          <FormControl 
            style={styles.formControl}
           component="fieldset">
            <FormGroup>
            {causeTypeList.map((item)=>{
              return (<FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    checked={self.state[item.value]}
                    onChange={self.handleChange(item.value)}
                    value={item.value}
                  />
                }
                label={item.label}
              />);
            })}
            </FormGroup>
          </FormControl>
          <Button type="submit" variant="contained" onClick={this.handleSubmit} className="login-button email-signin-button">
          Next
          </Button>

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