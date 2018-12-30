import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';
import getCurrentUser from '@selectors/getCurrentUser';
import {Elements, StripeProvider} from 'react-stripe-elements';
import getError from '@selectors/getError';
import getStatus from '@selectors/getStatus';
import StripeForm from '@components/utils/StripeWrapComponent'

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
        position:"relative"
    },
    form:{
        width:450, 
        margin:'0px auto',
        marginTop:10,
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
   },
   cardElement: {
     margin: "16px 4px 16px",
     borderBottom:"1px solid rgba(0,0,0,0.42)"
   }
}

export const mapStateToProps = createSelector(
  getCurrentUser,
  getError,
  getStatus,
  ( currentUser,err, status) => ({
    currentUser,
    err,
    status
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { currentUser, dismissError,dismissStatus } = props;
    this.state={
        id:currentUser.id,
        paymentInfo:{
            cardnumber:currentUser.paymentInfo?currentUser.paymentInfo.cardnumber:"",
            expiry:currentUser.paymentInfo?currentUser.paymentInfo.expiry:"",
            cvc:currentUser.paymentInfo?currentUser.paymentInfo.cvc:"",
            addr1:currentUser.paymentInfo?currentUser.paymentInfo.addr1:"",
            addr2:currentUser.paymentInfo?currentUser.paymentInfo.addr2:"",
            state:currentUser.paymentInfo?currentUser.paymentInfo.state:"",
            zipcode:currentUser.paymentInfo?currentUser.paymentInfo.zipcode:"",
            name:currentUser.paymentInfo?currentUser.paymentInfo.name:"",
        },
        stripe:null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    dismissError();
    dismissStatus();
  }

  handleChange = prop => event => {
    this.setState({paymentInfo: {
        ...this.state.paymentInfo,
        [prop] : event.target.value
    }});
  };
  
  async handleSubmit(ev){
    ev.preventDefault();
  }
  
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-5'); 
  }
  render() {
    const { 
        error, 
        status,
        updateUserInfo, saveUserInfo
      } = this.props;
    const self = this;    
    return (
    <StripeProvider apiKey={process.env.STRIPE_TEST_PUB_KEY} > 
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Payment Info
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Add your payment info bellow
        </Typography>
        <Elements>
            <StripeForm         
                userid = {this.state.id}                   
                paymentInfo = {this.state.paymentInfo}
                error = {error}
                status = {status}
                updateUserInfo = {updateUserInfo}
                saveUserInfo = {saveUserInfo}
            />
        </Elements>     

        
        <Button className="backBtn" onClick={this.handleBack}>
          &lt; Back
        </Button>
      </div>
      </StripeProvider>
    );
  }
}

export default hot(module)(connect(mapStateToProps,{
  updateUserInfo,
  saveUserInfo, 
  dismissError,
  dismissStatus
})(QuestionnarieComponent));


  