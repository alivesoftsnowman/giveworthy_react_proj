import 'jsdom-global/register';
import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import {QuestionnairePageHOC, mapStateToProps} from '@components/HOC/QuestionnairePageHOC';

const MyTestComponent = props => <div className="test"></div>;

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

describe('mapStateToProps', () => {
  it('should have the correct keys', () => {
    expect(mapStateToProps(state)).to.have.keys([
      'activePageNumber',
      'fields'
    ]);
  });
});

describe('QuestionnairePageHOC', () => {
  it('should be a function', () => {
    expect(typeof QuestionnairePageHOC).to.equal('function');
  });

  it('should render WrappedComponent', () => {
    const MyTestComponentWrapped = QuestionnairePageHOC(MyTestComponent);

    const wrapper = mount(<MyTestComponentWrapped />);
    
    expect(wrapper.find('div.test')).to.have.length(1);
  });
});