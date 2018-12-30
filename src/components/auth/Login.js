import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import  {Link}  from  'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import  FacebookLogin  from 'react-facebook-login';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';
import config from '@assets/config';
import getCurrentUser from '@selectors/getCurrentUser';
import { createSelector } from 'reselect';
const jwt = require('jsonwebtoken');

export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.onGoogleSignIn = this.onGoogleSignIn.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
  }
  
  onGoogleSignIn(googleUser) {
    if (!googleUser) return;
    console.log(googleUser)
    const authResponse = googleUser.getAuthResponse();
    const guser = jwt.decode(authResponse.id_token);
    if (!guser) return;
    var user = {
      fullName:guser.name,
      familyName:guser.family_name||"",
      givenName:guser.given_name||"",
      email:guser.email,
      googleID:guser.sub,
      imageURL:guser.picture
    }
    this.socialLogin(user);
  }
  onFacebookLogin(facebookUser){
    
    if (!facebookUser) return;
    var user = {
      fullName:facebookUser.name,
      familyName:facebookUser.name.split(" ")[0],
      givenName:facebookUser.name.replace(facebookUser.name.split(" ")[0],"").trim(),
      email:facebookUser.email,
      facebookID:facebookUser.id,
      imageURL:facebookUser.picture?facebookUser.picture.data.url:null
    }
    this.socialLogin(user);
  } 
  socialLogin(payload){
    const { loginUser } = this.props;
    loginUser(payload.email, jwt.sign(payload, process.env.SECRET_KEY));
  }
  render() {

    var googleID = process.env.NODE_ENV=='development'?config.GOOGLE_CLIENT_ID_LOCAL:config.GOOGLE_CLIENT_ID_DO;
    return (
      <div className="root">
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Good to have you
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          how to do you want to create your account
        </Typography>
        
        <GoogleLogin 
          className="login-button gplus-signin-button"
          buttonText = "Sign in with Google+"
          clientId={googleID}
          autoLoad={false}
          onSuccess={this.onGoogleSignIn}
          onFailure={this.onGoogleSignIn}
          />
      
        <FacebookLogin
          cssClass="login-button facebook-signin-button"
          appId={config.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          textButton = "Sign in with Facebook"
          callback={this.onFacebookLogin}>
        </FacebookLogin>
      
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          - or -
        </Typography>
        <Link to="/loginwithemail" className="link-button">
          <Button type="button" variant="contained"  className="login-button email-signin-button">
            Use Email Address
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps =()=> ({});

export default hot(module)(connect(mapStateToProps, {
  loginUser 
})(Login));