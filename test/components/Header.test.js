import 'jsdom-global/register';
import { Map } from 'immutable';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import {Header, mapStateToProps} from '@components/Header';
import User from '@models/User';

describe('<Header/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Header currentUser={new User} />);

    snapshot(toJson(wrapper));
  });

  it('should render admin option if role > 0', () => {
    const wrapper = shallow(<Header currentUser={new User({role: 2})}/>);

    expect(wrapper.find('.standard-option.admin')).to.have.length(1);
  });

  it('should not render admin option if role == 0', () => {
    const wrapper = shallow(<Header currentUser={new User} />);

    expect(wrapper.find('.standard-option.admin')).to.have.length(0);
  });
});

describe('header mapStateToProps', () => {
  it('should get current user', () => {
    const currentUser = new User;
    const state = {
      users: Map({
        current: currentUser
      })
    };

    expect(mapStateToProps(state)).to.deep.equal({
      currentUser
    });
  });
});