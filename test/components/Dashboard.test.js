import 'jsdom-global/register';
import React from 'react';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import User from '@models/User';
import {Dashboard, mapStateToProps} from '@components/Dashboard';

describe('<Dashboard/>', () => {
  it('should match snapshot', () => {
    const myUser = new User;
    const wrapper = shallow(<Dashboard currentUser={myUser} />);
    
    snapshot(toJson(wrapper));
  });
});

describe('mapStateToProps', () => {
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