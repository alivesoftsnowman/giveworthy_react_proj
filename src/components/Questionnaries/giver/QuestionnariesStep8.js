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
import {Slider} from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputRange from 'react-input-range';

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
        politicalIdeology:currentUser.politicalIdeology||0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    
    dismissError();
    dismissStatus();
    this.ideologies=["liberal", "moderate","conservative"];
  }
  
  
  handleChange (value){
    this.setState({politicalIdeology : value});
  };
  handleSubmit(){
    const {updateUserInfo, saveUserInfo} = this.props;
    updateUserInfo("politicalIdeology", this.state.politicalIdeology);
    saveUserInfo({token:jwt.sign({id:this.state.id, politicalIdeology:this.state.politicalIdeology}, process.env.SECRET_KEY)},"giver-questionnarie-step-9");
  }
  handleBack(){
    this.props.history.push('/giver-questionnarie-step-7'); 
  }
  render() {
    const { 
        error, 
        status
      } = this.props;
    const self = this;
    
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Where do you place your political ideology?
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={{...styles.form, marginTop:20, }}
            onError={errors => console.log(errors)}
        >
            
            <div style={styles.inputRange}>
                {/* <Typography id="label" variant="subheading">{"Selected value: "+this.ideologies[this.state.politicalIdeology].toUpperCase()}</Typography> */}
                <InputRange 
                    formatLabel={value => `${this.ideologies[value].toUpperCase()}`}
                    value={this.state.politicalIdeology||0} 
                    minValue={0} maxValue={2} step={1} 
                    onChange={this.handleChange} />
            </div>
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