import 'jsdom-global/register';
import { expect, use } from 'chai';
import Immutable, { List } from 'immutable';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';
use(chaiImmutable);

import Cause from '@models/Cause';

describe('Cause model', () => {
  const myCause = new Cause;
  it('should have the correct keys', () => {
    expect(myCause).to.have.keys([
      'id',
      'ownerId',
      'adminIds',
      'name',
      'primaryVideoLink',
      'primaryPhotoLink',
      'webLink',
      'tags',
      'description',
      'summary',
      'donationIds'
    ]);
  });
});

describe('Cause.fromJS', () => {
  it('should handle strings', () => {
    const shape = {
      id: '123',
      ownerId: '234',
      name: 'cause',
      primaryVideoLink: 'asdf',
      primaryPhotoLink: 'sdfg',
      webLink: 'weqr',
      description: 'About me',
      summary: 'About me'
    };

    const myCause = Cause.fromJS(shape);

    expect(myCause).to.deep.equal(new Cause(shape));
  });

  it('should set adminIds if array', () => {
    const adminIds = ['1','2','3'];

    expect(Cause.fromJS({adminIds})).to.deep.equal(new Cause({
      adminIds: List(adminIds)
    }));
  });

  it('should set adminIds if List', () => {
    const adminIds = List(['1', '2', '3']);

    expect(Cause.fromJS({adminIds})).to.deep.equal(new Cause({
      adminIds
    }));
  });

  it('should set tags if array', () => {
    const tags = ['a', 'b', 'c'];

    expect(Cause.fromJS({tags})).to.deep.equal(new Cause({
      tags: List(tags)
    }));
  });

  it('should set tags if List', () => {
    const tags = List(['a', 'b', 'c']);

    expect(Cause.fromJS({tags})).to.deep.equal(new Cause({
      tags
    }));
  });

  it('should set donationIds if array', () => {
    const donationIds = ['1', '2', '3'];

    expect(Cause.fromJS({donationIds})).to.deep.equal(new Cause({
      donationIds: List(donationIds)
    }));
  });

  it('should set donationIds if List', () => {
    const donationIds = List(['1', '2', '3']);

    expect(Cause.fromJS({donationIds})).to.deep.equal(new Cause({
      donationIds
    }));
  });
});