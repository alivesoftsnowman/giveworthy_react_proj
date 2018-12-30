import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { ValidatorForm} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import FormHelperText from '@material-ui/core/FormHelperText';
//import {Slider} from '@material-ui/lab';
import InputRange from 'react-input-range';
import CircularProgress from '@material-ui/core/CircularProgress';

const jwt = require('jsonwebtoken');
import {
    dismissError
  } from '@actions/errors';
  import {
    dismissStatus
  } from '@actions/status';
const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'50px auto',
        position:"relative",
    },
    form:{
        width:300, 
        margin:'0px auto',
        marginTop:10,
        display:'block',
        textAlign:"center"
    },
    menu: {
        width: 200,
    },
    inputRange:{
        marginTop:50,
        marginBottom:30
    }
}

export const mapStateToProps = createSelector(
  getCurrentUser,
  ( currentUser) => ({
    currentUser
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { currentUser, dismissError,dismissStatus } = props;
    this.state={
        id:currentUser.id,
        loi:{
            environment:currentUser.loi?currentUser.loi.environment:0,
            social:currentUser.loi?currentUser.loi.social:0,
            educational:currentUser.loi?currentUser.loi.educational:0,
            animal:currentUser.loi?currentUser.loi.animal:0,
            ngos:currentUser.loi?currentUser.loi.ngos:0,
            health:currentUser.loi?currentUser.loi.health:0,
            art_culture:currentUser.loi?currentUser.loi.art_culture:0
        },
        sliderValue:currentUser.loi?currentUser.loi.environment:0,
        currentKey:"environment"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    dismissError();
    dismissStatus();
  }
  
  
  handleChange = prop => event => {
   
    this.setState({[prop] : event.target.value, sliderValue:this.state.loi[event.target.value] });
  };
  handleSliderChange= key=> sliderValue=>{
    this.setState({loi:{...this.state.loi, [key] :sliderValue}});
//    this.setState({sliderValue:sliderValue});

  }
  handleSubmit(){
    const {updateUserInfo, saveUserInfo} = this.props;
    updateUserInfo("loi", this.state.loi);
    saveUserInfo({token:jwt.sign({id:this.state.id, loi:this.state.loi}, process.env.SECRET_KEY)},"giver-questionnarie-step-8");
  }
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-6'); 
  }
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;
    const menuItem =[
        {value:"environment", label:"Environmental causes"},
        {value:"social", label:"Social programs"},
        {value:"educational", label:"Educational programs"},
        {value:"animal",label:"Animal programs"},
        {value:"ngos",label:"International NGOs"},
        {value:"health", label:"Health programs"},
        {value:"art_culture",label:"Art & Culture programs"}
    ]
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          How important are
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={{...styles.form, marginTop:20, }}
            onError={errors => console.log(errors)}
        >
            {/* <TextField
                id="select-loi"
                style={{width:'100%'}}
                InputProps={{style:{ fontSize:"22px"}}}
                select
                value={this.state.currentKey}
                onChange={this.handleChange("currentKey")}
                SelectProps={{
                    MenuProps: {
                        style: styles.menu,
                    },
                }}
                margin="normal"
                >
                {menuItem.map(option => {
                    const val = self.state.loi[option.value];
                    // return (<MenuItem key={option.value} value={option.value} className={val>0?"loi-active":"loi-inactive"} >
                    // {option.label +(val>0?"/"+val:"")}   
                    // </MenuItem>)
                    return(

                    )
                })}
            
            </TextField> */}
            {menuItem.map(option => {
                    const val = self.state.loi[option.value];
                    // return (<MenuItem key={option.value} value={option.value} className={val>0?"loi-active":"loi-inactive"} >
                    // {option.label +(val>0?"/"+val:"")}   
                    // </MenuItem>)
                    return(
                      <div style={styles.inputRange} key={option.value}>
                          <Typography id="label" variant="subheading" align="left" className={val>0?"loi-active":"loi-inactive"} style={{marginBottom:30, fontSize:20}}>{option.label +(val>0?"/"+val:"")}</Typography> 
                          <InputRange style={styles.inputRange} value={val||0} minValue={0} maxValue={10} step={1} onChange={this.handleSliderChange(option.value)} />
                      </div>
                    )
            })}
            
            <FormHelperText 
                className = "helper-text"
                error={error?true:false}>
                {error||""}
            </FormHelperText>
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            {status?<CircularProgress size={20}/>:'Next'}
            </Button>
        </ValidatorForm>
        
        <Button  className="backBtn" onClick={this.handleBack}>
          &lt; Back
        </Button>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  updateUserInfo,
  saveUserInfo, 
  dismissError,
  dismissStatus
})(QuestionnarieComponent));