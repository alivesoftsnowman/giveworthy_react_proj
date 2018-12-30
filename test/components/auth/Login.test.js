import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import { Login } from '@components/auth/Login';

describe('<Login />', () => {

  it('should match snapshot', () => {
    const wrapper = shallow(<Login />);

    snapshot(toJson(wrapper));
  });

  it('should contain a onGoogleSignIn function', () => {
    const wrapper = shallow(<Login />);

    expect(typeof wrapper.instance().onGoogleSignIn).to.equal('function');
  });

  it('should contain the correct props on google signin button', () => {
    const wrapper = shallow(<Login />);
    const func = wrapper.instance().onGoogleSignIn;

    expect(wrapper.find('.login-button.login-google').first().props()).to.deep.include({
      clientId: '1051526831495-k97buaru1epuj4h12s1h1pet8rqutirr.apps.googleusercontent.com',
      onSuccess: func,
      onFailure: func
    });
  });

  it('should issue dispatch(loginUser) on onGoogleSignIn', () => {
    const loginUser = sinon.spy();
    const wrapper = shallow(<Login loginUser={loginUser} />);

    const googleUser = {
      getBasicProfile: () => ({U3: '123'}),
      getAuthResponse: () => ({id_token: '234'})
    };

    wrapper.instance().onGoogleSignIn(googleUser);

    expect( loginUser.calledOnceWith('123', '234') ).to.be.true;
  });
});