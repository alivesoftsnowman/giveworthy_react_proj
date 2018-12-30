import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { getActivePageNumber, getFields } from '@selectors/questionnaires';

export const mapStateToProps = createSelector(
  getActivePageNumber,
  getFields,
  (activePageNumber, fields) => ({
    activePageNumber,
    fields
  })
);

export const QuestionnairePageHOC = (WrappedComponent) => 
  class extends PureComponent {
    render() {
      return (
        <WrappedComponent />
      );
    }
  };


export default WrappedComponent => connect(mapStateToProps)(QuestionnairePageHOC(WrappedComponent));