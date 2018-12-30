import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router';
import Enzyme, { shallow } from 'enzyme';
import { Route, Redirect, Switch } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import snapshot from 'snap-shot-it';
Enzyme.configure({ adapter: new Adapter() });

import Routes from '@routes';

describe('<Routes />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Routes />);

    snapshot(toJson(wrapper));
  });
});