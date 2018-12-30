import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';


export class Profile extends PureComponent {

  constructor(props){
    super(props);
   
  }

  render() {
    const {user} = this.props;
    return (
      <div >
     
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps)(Profile));