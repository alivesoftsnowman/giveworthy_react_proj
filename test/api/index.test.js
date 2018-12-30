import { expect, use } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
use(chaiAsPromised);

import { url, login } from '@api';

const params = [
  'austin.d.benesh@gmail.com',
  'asdf'
];

describe('api.login', () => {
  it('should be a function', () => {
    expect(typeof login).to.equal('function');
  });

  it('should call axios.get', () => {
    sinon.spy(axios, 'get');
    login(...params);

    expect(axios.get.calledOnceWith(`${url}/login/${params[0]}`, {params: {token: params[1]}})).to.be.true;
  });

  it('should catch errors in axios', async () => {
    sinon.stub(axios, 'get').rejects(new Error('asdfg'));

    return await expect(login(...params)).to.eventually.be.rejectedWith('asdfg');
  });

  it('should throw an error if response is not 200', async () => {
    sinon.stub(axios, 'get').resolves({
      status: 401,
      statusText: "oogabooga"
    });

    return await expect(login(...params)).to.eventually.be.rejectedWith('Login failed with status: 401');
  });

  it('should return one object', async () => {
    const data = {
      gender: "male",
      affiliatedOrgs: [],
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiYWZmaWxpYXRlZE9yZ3MiOltdLCJnaXZlbk5hbWUiOiJBdXN0aW4iLCJ1cGRhdGVkQXQiOjE1Mjc3ODg3NzAsImZhbWlseU5hbWUiOiJCZW5lc2giLCJyb2xlIjoyLCJkb2IiOjYyNDQ5OTIwMCwiaWQiOiI0NDlmNTU1ZC0zNzJhLTQ2YjUtOWUzNS1kYjljM2RiZTZmMGMiLCJjcmVhdGVkQXQiOjE1Mjc3ODg3NzAsImVtYWlsIjoiYXVzdGluLmQuYmVuZXNoQGdtYWlsLmNvbSIsImlhdCI6MTUyNzg3MjU4Mn0.VFg3kUMKvrCjTYZEdE-wG-EtngFmIIpfbaLodwkIwFY",
      givenName: "Austin",
      updatedAt: 1527788770,
      familyName: "Benesh",
      role: 2,
      dob: 624499200,
      id: "449f555d-372a-46b5-9e35-db9c3dbe6f0c",
      createdAt: 1527788770,
      email: "austin.d.benesh@gmail.com"
    };

    sinon.stub(axios, 'get').resolves({
      data,
      status: 200,
      statusText: 'OK'
    });

    expect(await login(...params)).to.deep.equal(data);
  });

  afterEach(() => {
    if (axios.get.restore)
      axios.get.restore();
  });
});