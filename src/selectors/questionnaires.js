import { createSelector } from 'reselect';

const getQuestionnairesSlice = state => state.questionnaires;

export const getActiveQuestionnaire = createSelector(
  getQuestionnairesSlice,
  (questionnaires) => questionnaires.get('activeQuestionnaire')
);

export const getActivePageNumber = createSelector(
  getQuestionnairesSlice,
  (questionnaires) => questionnaires.get('activePageNumber')
);

export const getFields = createSelector(
  getQuestionnairesSlice,
  (questionnaires) => questionnaires.get('fields')
);
export const getActivePageInfo = createSelector(
  getQuestionnairesSlice,
  (questionnaires) => questionnaires.get('activePageInfo')
);