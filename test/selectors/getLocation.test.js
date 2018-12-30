import { expect } from 'chai';

import getLocation from '@selectors/getLocation';

describe('getLocation', () => {
  it('should get location from state', () => {
    const state = {
      router: {
        location: {
          state: 'abc'
        } 
      }
    };

    expect(getLocation(state)).to.deep.equal(state.router.location);
  });
})