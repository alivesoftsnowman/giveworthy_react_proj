import { expect, use } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
use(chaiImmutable);

import {
  setActiveQuestionnaire,
  closeActiveQuestionnaire,
  nextPage,
  prevPage,
  setField
} from '@actions/questionnaires';

describe('questionnaires actions', () => {
  it('should handle setActiveQuestionnaire', () => {
    expect(setActiveQuestionnaire('qName', Map({test: 'test'}))).to.deep.equal({
      type: 'SET_ACTIVE_QUESTIONNAIRE',
      name: 'qName',
      fields: Map({test: 'test'})
    });
  });

  it('should handle closeActiveQuestionnaire', () => {
    expect(closeActiveQuestionnaire()).to.deep.equal({
      type: 'CLOSE_ACTIVE_QUESTIONNAIRE'
    });
  });

  it('should handle nextPage', () => {
    expect(nextPage()).to.deep.equal({
      type: 'NEXT_PAGE'
    });
  });

  it('should handle prevPage', () => {
    expect(prevPage()).to.deep.equal({
      type: 'PREV_PAGE'
    });
  });

  it('should handle setField', () => {
    expect(setField('key', 'value')).to.deep.equal({
      type: 'SET_FIELD',
      key: 'key',
      value: 'value'
    });
  });
});