import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

import isUserAuthenticated from '@selectors/isUserAuthenticated';
import userType from '@selectors/getUserType';
export class AuthenticatedRoute extends PureComponent {
  render() {
    const { component: Component, isAuthenticated,userType, type, ...rest } = this.props;
    
    const b = type=="all"?true:(userType==type?true:false);
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated && b ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}

export const mapStateToProps = createSelector(
  isUserAuthenticated,
  userType,
  (isAuthenticated, userType) => ({isAuthenticated, userType}),

);

export default connect(mapStateToProps)(AuthenticatedRoute);