import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {getActivePageInfo } from '@selectors/questionnaires';
import {setActiveQuestionnaire,
        nextPage,
        prevPage} from '@actions/questionnaires';
import {updateUserInfo, saveUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';
import Stepper from '@components/BarStepper';
import { ValidatorForm, InputValidator, TextValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserAvatar from 'react-user-avatar';
import FormHelperText from '@material-ui/core/FormHelperText';
const jwt = require('jsonwebtoken');
import getError from '@selectors/getError';
import getStatus from '@selectors/getStatus';
import AvatarCropperDlg from '@components/utils/AvatarCropDialog';
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
      width:"100%"
  },
  addButton:{
    display: "block",
    margin: "40px auto",
    color:"#ADADAD",
    background:"lightgray",
    width:120,
    height:120,
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
  addIconBtn:{
    fontSize: 48,
    margin: "0px auto",
    paddingTop: 35,
    display:"block"
  },
  delIconBtn:{
    position:"absolute",
    left:"90%",
    top:"90%"
  }
}

export const mapStateToProps = createSelector(
  getActivePageInfo,
  getCurrentUser,
  getError,
  getStatus,
  ( activePageInfo, currentUser, error, status) => ({
    activePageInfo,
    currentUser,
    error,
    status
  })
);

export class QuestionnarieComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { currentUser, setActiveQuestionnaire, dismissError,dismissStatus} = props;
    this.state={
      id:currentUser.id,
      type:currentUser.type,
      fullName:currentUser.fullName||"",
      givenName:currentUser.givenName||"",
      familyName:currentUser.familyName||"",
      imageURL:currentUser.imageURL||null,
      email:currentUser.email||"",
      note:currentUser.note||"",
      zipcode:currentUser.zipcode||"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.avatarCallback = this.avatarCallback.bind(this);
    setActiveQuestionnaire(5);
    dismissError();
    dismissStatus();
  }
  
  handlePhotoChange(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({imageURL: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  deletePhoto(e){
    e.preventDefault();
    this.setState({imageURL: null});
  }
  handleSubmit(){
    const { saveUserInfo,
            updateUserInfo } = this.props;
    
    var fullName = this.state.fullName;
    this.state.familyName = fullName.split(" ")[0];
    this.state.givenName = fullName.replace(this.state.familyName,"").trim();
    const state = this.state;
    Object.keys(state).forEach(key => {
      if (key!="id")
        updateUserInfo(key, state[key]);
    });
    
    saveUserInfo({token:jwt.sign(this.state, process.env.SECRET_KEY)},"giver-questionnarie-step-6");
    //this.props.history.push('/questionnarie-step-2'); 
  }
  handleBack(){
    const { prevPage } = this.props;
    prevPage();
    this.props.history.push('/giver-questionnarie-step-4'); 
  }
  openAvartarDlg(){
    this.setState({isOpendAvartarDlg:true});
  }
  avatarCallback(file){
    if (file.name){
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      const self = this;
      reader.onloadend = function() {
        self.setState({imageURL: reader.result});
      }
      
    }
    this.setState({isOpendAvartarDlg:false});
  }

  render() {
    const { 
      activePageInfo,
      currentUser,
      error, 
      status
    } = this.props;
    var username = currentUser?currentUser.fullName||"A":"A";
    return (
      <div className="root" style={styles.root}>
        <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              style={styles.form}
              onError={errors => console.log(errors)}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={3}>
            <Button variant="fab"  component="span" aria-label="AddPhoto" style={styles.addButton} onClick={this.openAvartarDlg.bind(this)} >
              {!this.state.imageURL&&<AddIcon style={styles.addIconBtn}/>}
              {this.state.imageURL&&
                <UserAvatar size="128" name={username} colors={['#BDBDBD']} src={this.state.imageURL} style={{margin:0}} />
              }  
              {this.state.imageURL&&<DeleteIcon style={styles.delIconBtn} onClick={this.deletePhoto}/>}
            </Button>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="title" color="default" className="sub-header-plain" gutterBottom>
              Account details
              </Typography>
              
                <InputValidator
                  fullWidth
                  id="username"
                  name="username"
                  formControlStyle={styles.form}
                  inputLabel="Enter your name"
                  type="text"
                  value={this.state.fullName}
                  onChange={this.handleChange('fullName')}
                />
                <InputValidator
                  fullWidth
                  id="email"
                  name="email"
                  formControlStyle={styles.form}
                  inputLabel="Email Address"
                  type="email"
                  value={this.state.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['User email is required', 'User email is not valid']}
                  onChange={this.handleChange('email')}
                />
                <InputValidator
                  fullWidth
                  id="zipcode"
                  name="zipcode"
                  formControlStyle={styles.form}
                  inputLabel="Zipcode"
                  type="text"
                  value={this.state.zipcode}
                  validators={['required']}
                  errorMessages={['Zipcode is required']}
                  onChange={this.handleChange('zipcode')}
                />
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
                  onChange={this.handleChange('note')}
                />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained"  className="login-button email-signin-button">
            {status?<CircularProgress size={20}/>:'Looks good/Publish'}
          </Button>
          <FormHelperText 
                className = "helper-text"
                error={error?true:false}>
                {error||""}
          </FormHelperText>
        </ValidatorForm>
        <Button  style={styles.backBtn} onClick={this.handleBack}>
          &lt; Back
        </Button>
        <Stepper steps={activePageInfo}/>
        <AvatarCropperDlg open={this.state.isOpendAvartarDlg} callback={this.avatarCallback}/>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  nextPage, 
  prevPage,
  updateUserInfo,
  saveUserInfo,
  setActiveQuestionnaire,
  dismissError,
  dismissStatus
})(QuestionnarieComponent));