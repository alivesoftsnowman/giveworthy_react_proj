import { use, expect } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
import snapshot from 'snap-shot-it';
use(chaiImmutable);

import questionnairesReducer, {initialState} from '@reducers/questionnaires';

import {
  setActiveQuestionnaire,
  closeActiveQuestionnaire,
  nextPage,
  prevPage,
  setField
} from '@actions/questionnaires';

describe('questionnaires initialState', () => {
  it('should match snapshot', () => {
    snapshot(initialState.toJSON());
  });
});

describe('questionnairesReducer', () => {
  it('should handle @@INIT', () => {
    expect(questionnairesReducer(initialState, {type: '@@INIT'}))
      .to.equal(initialState);
  });

  it('should handle SET_ACTIVE_QUESTIONNAIRE', () => {
    const preState = initialState.set('activePageNumber', 2);

    const expectedResult = initialState
      .set('activeQuestionnaire', 'test')
      .set('fields', Map({test: 'test'}));

    expect(questionnairesReducer(preState, 
      setActiveQuestionnaire('test', Map({test: 'test'}))
    )).to.deep.equal(expectedResult);
  });

  it('should handle CLOSE_ACTIVE_QUESTIONNAIRE', () => {
    const preState = initialState.set('activeQuestionnaire', 'test');
    const expectedResult = preState.set('activeQuestionnaire', null);

    expect(questionnairesReducer(preState,
      closeActiveQuestionnaire()
    )).to.equal(expectedResult);
  });

  it('should hande NEXT_PAGE', () => {
    const expectedResult = initialState.set('activePageNumber', 2);

    expect(questionnairesReducer(initialState,
      nextPage()
    )).to.equal(expectedResult);
  });

  it('should handle PREV_PAGE', () => {
    const preState = initialState.set('activePageNumber', 2);
    const expectedResult = preState.set('activePageNumber', 1);

    expect(questionnairesReducer(preState,
      prevPage()
    )).to.equal(expectedResult);
  });

  it('should handle SET_FIELD', () => {
    const preState = initialState.set('fields', Map({test: 'test'}));
    const expectedResult = initialState.set('fields', Map({test: 'test', test2: 'test2'}));

    expect(questionnairesReducer(preState,
      setField('test2', 'test2')
    )).to.deep.equal(expectedResult);
  });
});