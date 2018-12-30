import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { hot } from 'react-hot-loader';

import { getActiveQuestionnaire, getActivePageNumber } from '@selectors/questionnaires';
import { setActiveQuestionnaire } from '@actions/questionnaires';

import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export const mapStateToProps = createSelector(
  getActiveQuestionnaire,
  getActivePageNumber,
  (activeQuestionnaire, activePageNumber) => ({
    activeQuestionnaire,
    activePageNumber
  })
);

export class Questionnaire extends PureComponent {
  render() {
    const { 
      activeQuestionnaire, 
      activePageNumber, 
      questionnaireName, 
      children,
      dispatch
    } = this.props;

    // testing only!
    window.openQ = (name) => dispatch(setActiveQuestionnaire(name));
    //
    return (
      <Dialog 
        open={activeQuestionnaire == questionnaireName}
        fullscreen={true}
        aria-labelledby="questionnaire"
        aria-describedby="fill out the questionnaire"
        className="questionnaire">
        <Stepper activeStep={activePageNumber} alternativeLabel>
          {children}
        </Stepper>
      </Dialog>
    );
  }
}

export default hot(module)(connect(mapStateToProps)(withMobileDialog()(Questionnaire)));