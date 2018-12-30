import { expect } from 'chai';
import { Map } from 'immutable';

import { 
  getActiveQuestionnaire,
  getActivePageNumber,
  getFields,
  getField
} from '@selectors/questionnaires';

const fields = Map({
  field1: 'test1',
  field2: 'test2'
}); 

const state = {
  questionnaires: Map({
    activeQuestionnaire: 'test',
    activePageNumber: 2,
    fields
  })
};

describe('getActiveQuestionnaire', () => {
  it('should return activeQuestionnaire', () => {
    expect(getActiveQuestionnaire(state)).to.equal('test');
  });
});

describe('getActivePageNumber', () => {
  it('should return 2', () => {
    expect(getActivePageNumber(state)).to.equal(2);
  });
});

describe('getFields', () => {
  it('should return fields', () => {
    expect(getFields(state)).to.equal(fields);
  });
});