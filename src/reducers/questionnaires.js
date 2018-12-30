import { Map } from 'immutable';

import {
  SET_ACTIVE_QUESTIONNAIRE,
  CLOSE_ACTIVE_QUESTIONNAIRE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_FIELD
} from '@actions/questionnaires';

export const NUMBERS_OF_QUESTIONS = 5;

function initAcitvePageAStatus(){
  var ActivePageInfo = [];
  for (var i=0;i<NUMBERS_OF_QUESTIONS;i++) ActivePageInfo.push(false);
  return ActivePageInfo;
}


export const initialState = Map({
  activeQuestionnaire: null,
  activePageNumber: 1,
  activePageInfo:initAcitvePageAStatus()
});

export default function(state = initialState, action) {
  var arr = initAcitvePageAStatus(),
      av = state.get('activePageNumber');

  switch (action.type) {
    case SET_ACTIVE_QUESTIONNAIRE:
      av = action.pageNumber;
      if (av>0)
        arr[av-1] = true;
      return state
        .set('activePageInfo', arr)
        .set('activePageNumber',  action.pageNumber);

    case CLOSE_ACTIVE_QUESTIONNAIRE:
      return state.set('activeQuestionnaire', null);

    case NEXT_PAGE:
      if (av<NUMBERS_OF_QUESTIONS){
        arr[av] = false;
      }
      return state.update('activePageNumber', num => num + 1)
                  .set('activePageInfo', arr);

    case PREV_PAGE:
      if (av > 1){
        arr[av-2] = true;
      }
      return state.update('activePageNumber', num => num - 1)
                  .set('activePageInfo', arr);

    case SET_FIELD:
      return state.update('fields', fields => fields.set(action.key, action.value));
    
    default:
      return state;  
  }
}