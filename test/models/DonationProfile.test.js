import 'jsdom-global/register';
import { expect, use } from 'chai';
import Immutable, { List } from 'immutable';
import chaiImmutable from 'chai-immutable';

import DonationProfile from '@models/DonationProfile';
describe('DonationProfile model', () => {
  const myDonationProfile = new DonationProfile;
  it('should have the correct keys', () => {
    expect(myDonationProfile).to.have.keys([
      'id',
      'userId',
      'amountTotal',
      'donations',
      'percentile'
    ]);
  });

  it('should set id to null', () => {
    expect(myDonationProfile.id).to.be.null;
  });

  it('should set userId to null', () => {
    expect(myDonationProfile.userId).to.be.null;
  });

  it('should set amountTotal to 0', () => {
    expect(myDonationProfile.amountTotal).to.equal(0);
  });

  it('should set donations to be empty List', () => {
    expect(myDonationProfile.donations).to.deep.equal(List());
  });

  it('should set percentile to be 0', () => {
    expect(myDonationProfile.percentile).to.equal(0);
  })
});

describe('DonationProfile.fromJS', () => {
  it('should set basic strings', () => {
    const donationProfile = DonationProfile.fromJS({
      id: '123',
      userId: '234'
    });

    expect(donationProfile).to.deep.equal(new DonationProfile({
      id: '123',
      userId: '234'
    }));
  });

  it('should set amountTotal to be a number', () => {
    const donationProfile = DonationProfile.fromJS({
      amountTotal: '2233'
    });

    expect(donationProfile).to.deep.equal(new DonationProfile({
      amountTotal: 2233
    }));
  });

  it('should set donations properly if array', () => {
    const donationProfile = DonationProfile.fromJS({
      donations: ['1', '2', '3']
    });

    expect(donationProfile).to.deep.equal(new DonationProfile({
      donations: List(['1', '2', '3'])
    }));
  });

  it('should set donations properly if List', () => {
    const donationProfile = DonationProfile.fromJS({
      donations: List(['1', '2', '3'])
    });

    expect(donationProfile).to.deep.equal(new DonationProfile({
      donations: List(['1', '2', '3'])
    }));
  });

  it('should set percentile correctly', () => {
    const donationProfile = DonationProfile.fromJS({
      percentile: '0.111'
    });
    expect(donationProfile).to.deep.equal(new DonationProfile({
      percentile: 0.111
    }));
  });
});