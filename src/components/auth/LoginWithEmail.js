import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { loginUser } from '@actions/users';
import { hot } from 'react-hot-loader';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import  {Link}  from  'react-router-dom';
import { ValidatorForm, InputValidator} from '@components/Validators';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createSelector } from 'reselect';
import getError from '@selectors/getError';
import getStatus from '@selectors/getStatus';
import {
  dismissError
} from '@actions/errors';
import {
  dismissStatus
} from '@actions/status';

const jwt = require('jsonwebtoken');

const styles={
    root:{
        maxWidth:500,
        flexDirection:'row',
        alignItems:'center',
        margin:'0 auto'
    },
    form:{
        width:300, 
        margin:'30px auto',
        display:'block'
    },
    signupLink:{
       textAlign:'center',
       fontSize:16,
       margin: "40px auto",
       display: "block",
       color:"#ADADAD",
       textTransform: "initial"
    }
}
export class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
        email:"",
        password:"",
        showPassword: false
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const { dismissError,dismissStatus } = props;
    dismissError();
    dismissStatus();
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword(){
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleMouseDownPassword (event){
    event.preventDefault();
  };
  handleSubmit(){
    const {loginUser,dismissError} = this.props;
    const user = {
      email:this.state.email,
      password:this.state.password
    };
    dismissError();
    loginUser(user.email, jwt.sign(user, process.env.SECRET_KEY))
  }
  render() {
    const {error, status} = this.props;
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Howdy!
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let's get you logged in
        </Typography>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            style={styles.form}
            onError={errors => console.log(errors)}
        >
          <FormHelperText 
            className = "helper-text"
            error={error?true:false}>
            {error||""}
          </FormHelperText>
          <InputValidator
              fullWidth
              id="email"
              name="email"
              ref="email"
              formControlStyle={styles.form}
              inputLabel="Email Address"
              type="email"
              value={this.state.email}
              validators={['required', 'isEmail']}
              errorMessages={['User Email is required', 'User Email is not valid']}
              onChange={this.handleChange('email')}
          />
      
          <InputValidator
              fullWidth
              id="password"
              name="password"
              ref="password"
              formControlStyle={styles.form}
              inputLabel="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              validators={['required', 'minStringLength:8','maxStringLength:50']}
              errorMessages={['Password is required', 'Password length must be more than 8', 'Password length must be less than 50']}
              onChange={this.handleChange('password')}
              endAdornment={
              <InputAdornment position="end">
                  <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
              }
          />

          <Button type="submit" variant="contained"  className="login-button email-signin-button">
          {status?<CircularProgress size={20}/>:'Log in'}
          </Button>
        </ValidatorForm>
        <Link to="/signup"  className="link-button"  >
            <Button  style={styles.signupLink}>
                Create an Account
            </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getError,
  getStatus,
  ( error, status) => ({
    error,
    status
  })
);


export default hot(module)(connect(mapStateToProps, {
  loginUser ,
  dismissError,
  dismissStatus
})(Login));