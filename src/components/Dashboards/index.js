import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
import GiverDashboard from '@components/Dashboards/Giver';
import CharityDashboard from '@components/Dashboards/Charity';
import AdminDashboard from '@components/Dashboards/Admin';
import userType from '@selectors/getUserType';

export class Dashboard extends PureComponent {

  constructor(props){
    super(props);
   
  }

  render() {

    const {userType} = this.props;
    return (
      <div >
        {userType=='giver'&&<GiverDashboard/>}
        {userType=='charity'&&<CharityDashboard/>}
        {userType=='admin'&&<AdminDashboard/>}
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  userType,
  (userType) => ({
    userType
  })
);

export default hot(module)(connect(mapStateToProps)(Dashboard));