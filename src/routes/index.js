import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Dashboard from '@components/Dashboards';
import Login from '@components/auth/Login';
import LoginWithEmail from '@components/auth/LoginWithEmail';
import Home from '@components/Home';
import Main from '@components/Main';
import AuthenticatedRoute from '@routes/AuthenticatedRoute';
import Signup from '@components/auth/Signup';
import QuestionnariesStep1 from '@components/Questionnaries/giver/QuestionnariesStep1';
import QuestionnariesStep2 from '@components/Questionnaries/giver/QuestionnariesStep2';
import QuestionnariesStep3 from '@components/Questionnaries/giver/QuestionnariesStep3';
import QuestionnariesStep4 from '@components/Questionnaries/giver/QuestionnariesStep4';
import QuestionnariesStep5 from '@components/Questionnaries/giver/QuestionnariesStep5';
import QuestionnariesStep6 from '@components/Questionnaries/giver/QuestionnariesStep6';
import QuestionnariesStep7 from '@components/Questionnaries/giver/QuestionnariesStep7';
import QuestionnariesStep8 from '@components/Questionnaries/giver/QuestionnariesStep8';
import QuestionnariesStep9 from '@components/Questionnaries/giver/QuestionnariesStep9';
import CharityQuestionnariesStep1 from '@components/Questionnaries/charity/QuestionnariesStep1';
import CharityQuestionnariesStep2 from '@components/Questionnaries/charity/QuestionnariesStep2';
import CharityQuestionnariesStep3 from '@components/Questionnaries/charity/QuestionnariesStep3';
import CharityQuestionnariesStep4 from '@components/Questionnaries/charity/QuestionnariesStep4';
import CharityQuestionnariesStep5 from '@components/Questionnaries/charity/QuestionnariesStep5';
import CharitiesGrid from '@components/CharitiesGrid';
import CharityProfile from "@components/Profile/Charity";
import GiverProfile from "@components/Profile/Giver";
import ChooseAccountType from '@components/ChooseAccountType';
import CausesMng from '@components/Charity/CausesMng';
import EditCause from '@components/Charity/EditCause';
import AdminEditCause from '@components/Admin/EditCause';
import UsersMng from '@components/Admin/UsersMng';

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/loginwithemail' component={LoginWithEmail} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Home} />
        
        <Switch>
          {/* <Redirect from='/' to='/dashboard' exact /> */}
          <AuthenticatedRoute exact path='/dashboard' type="all" component={Dashboard} />
          <AuthenticatedRoute exact path='/choose-account-type' type="all" component={ChooseAccountType} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-1' type="giver" component={QuestionnariesStep1} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-2' type="giver" component={QuestionnariesStep2} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-3' type="giver" component={QuestionnariesStep3} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-4' type="giver" component={QuestionnariesStep4} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-5' type="giver" component={QuestionnariesStep5} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-6' type="giver" component={QuestionnariesStep6} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-7' type="giver" component={QuestionnariesStep7} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-8' type="giver" component={QuestionnariesStep8} />
          <AuthenticatedRoute exact path='/giver-questionnarie-step-9' type="giver" component={QuestionnariesStep9} />
          <AuthenticatedRoute exact path='/charity-questionnarie-step-1' type="charity" component={CharityQuestionnariesStep1} />
          <AuthenticatedRoute exact path='/charity-questionnarie-step-2' type="charity" component={CharityQuestionnariesStep2} />
          <AuthenticatedRoute exact path='/charity-questionnarie-step-3' type="charity" component={CharityQuestionnariesStep3} />
          <AuthenticatedRoute exact path='/charity-questionnarie-step-4' type="charity" component={CharityQuestionnariesStep4} />
          <AuthenticatedRoute exact path='/charity-questionnarie-step-5' type="charity" component={CharityQuestionnariesStep5} />
          <AuthenticatedRoute exact path='/charity-profile' type="charity" component={CharityProfile} />
          <AuthenticatedRoute exact path='/giver-profile' type="giver" component={GiverProfile} />
          <AuthenticatedRoute exact path='/charities-grid' type="giver" component={CharitiesGrid} />
          <AuthenticatedRoute exact path='/causes' type="charity" component={CausesMng} />
          <AuthenticatedRoute exact path='/users' type="admin"  component={UsersMng} />
          <AuthenticatedRoute exact path='/editcause' type="charity"  component={EditCause} />
          <AuthenticatedRoute exact path='/admin-editcause' type="admin"  component={AdminEditCause} />
        </Switch>
      </div>
    );
  }
}

export default Routes;