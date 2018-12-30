import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { ValidatorForm, InputValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import FormHelperText from '@material-ui/core/FormHelperText';
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
        textAlign:'center'
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
    this.menuItem =[
      {value:1, label:"1.00"},
      {value:15, label:"15.00"},
      {value:30, label:"30.00"},
      {value:50, label:"50.00"},
      {value:100, label:"100.00"},
      {value:0, label:"Custom"}
    ]
    var dm = eval(currentUser.donationAmount)||1;
    var b = this.checkCustomValue(dm);
     this.state={
      id:currentUser.id,
      donationAmount:b?0:dm,
      customDonationAmount:b?dm:0,
      showamountInputbox:b
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    dismissError();
    dismissStatus();
  }
  checkCustomValue(value){
    for(var i=0;i<this.menuItem.length;i++){
      if (this.menuItem[i].value!=0 && this.menuItem[i].value==value){
        return false;
      } 
    }
    return true;
  }
  handleChange = prop => event => {
    var value = event.target.value, b = false;
    if (prop=="customDonationAmount" || value==0) b=true;
    if(b){
      this.setState({donationAmount:0});
    }else{
      this.setState({customDonationAmount:0});
    }
    this.setState({[prop] : value, showamountInputbox:b});
  };
  
  handleSubmit(){
    var donationAmount = this.state.customDonationAmount>0?this.state.customDonationAmount:this.state.donationAmount;
    donationAmount = eval(donationAmount);
    if (donationAmount>0){
      const {updateUserInfo, saveUserInfo} = this.props;
      updateUserInfo("donationAmount", donationAmount);
      saveUserInfo({token:jwt.sign({id:this.state.id, donationAmount:donationAmount}, process.env.SECRET_KEY)},"charities-grid");
    }
  }
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-8'); 
  }
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;

    const menuItem =this.menuItem;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          How much are you able to give per month?
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={{...styles.form, marginTop:20, }}
            onError={errors => console.log(errors)}
        >
            <TextField
                id="select-donAmount"
                style={{width:'100%'}}
                InputProps={{style:{ fontSize:"22px"}}}
                select
                value={this.state.donationAmount}
                onChange={this.handleChange("donationAmount")}
                SelectProps={{
                    MenuProps: {
                        style: styles.menu,
                    },
                }}
                margin="normal"
                >
                {menuItem.map(option => {
                    return (<MenuItem key={option.value} value={option.value} style={{textAlign:'center'}} >
                    {option.label}   
                    </MenuItem>)
                })}
            
            </TextField>
            {this.state.showamountInputbox&&<InputValidator
                fullWidth
                id="amount"
                name="amount"
                ref="amount"
                value={this.state.customDonationAmount||0}
                formControlStyle={styles.form}
                inputLabel="Custom Donation Amount"
                type="number"
                validators={['required', 'minNumber:1']}
                errorMessages={['Your donation amount is required', 'Amount must be more than 0.']}
                onChange = {this.handleChange("customDonationAmount")}
            />}
            <FormHelperText 
                className = "helper-text"
                error={error?true:false}>
                {error||""}
            </FormHelperText>
            <Button type="submit" variant="contained"  className="login-button email-signin-button">
            {status?<CircularProgress size={20}/>:'See charities'}
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