import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import {updateUserInfo} from  '@actions/users';
import { Button } from '@material-ui/core';
import {saveCause} from '@actions/cause';

import { ValidatorForm, InputValidator} from '@components/Validators';
import getCurrentUser from '@selectors/getCurrentUser';
import getCause from '@selectors/getCause';

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
    chooseBtn:{
      width:"100%",
      textTransform: "initial",
      marginTop:20,
      fontSize:20,
      fontWeight:400,
      padding:10,
      background:"#F2F2F2",
      color:"#757575"
   }
}

export const mapStateToProps = createSelector(
  getCurrentUser,
  getCause,
  ( currentUser, cause) => ({
    currentUser,
    cause
  })
);

export class ChooseAccTypeComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
        type:"giver"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleSubmit= type =>event=>{
    event.preventDefault();
    const {updateUserInfo, saveCause, currentUser, cause } = this.props;
    this.setState({type:type});
    const state = this.state;
    updateUserInfo("type", type);
    
    if (type=="charity"){
      if (cause&&cause.id){
        this.props.history.push(`/${type}-questionnarie-step-1`); 
      }else
        saveCause({
          ownerId:currentUser.id
        });
    }else
      this.props.history.push(`/${type}-questionnarie-step-1`); 
  }
  render() {
  
    return (
      <div className="root" style={styles.root}>
        <Typography variant="title" color="default" className="sub-header-title" gutterBottom>
          Choose your account type.
        </Typography>
        <Typography variant="title" color="default" className="sub-header-desc" gutterBottom>
          Let us know what are you wanting to do
        </Typography>
        <Button  variant="contained" onClick={this.handleSubmit("giver")} style={styles.chooseBtn} >
          I am an individual wanting to donate to charity
        </Button>
        <Button  variant="contained" onClick={this.handleSubmit("charity")} style={styles.chooseBtn} >
          I am a charity wanting to receive donations 
        </Button>
      </div>
    );
  }
}



export default hot(module)(connect(mapStateToProps,{
  updateUserInfo,
  saveCause
})(ChooseAccTypeComponent));