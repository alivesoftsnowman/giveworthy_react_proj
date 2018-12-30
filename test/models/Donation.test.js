import 'jsdom-global/register';
import { expect, use } from 'chai';
import Immutable, { List } from 'immutable';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';
use(chaiImmutable);

import Donation from '@models/Donation';

describe('Donation model', () => {
  const myDonation = new Donation;
  it('should have the correct keys', () => {
    expect(myDonation).to.have.keys([
      'id',
      'causeId',
      'amount',
      'date' 
    ]);
  });

  it('should set id to null', () => {
    expect(myDonation.id).to.be.null;
  });

  it('should set causeId to be null', () => {
    expect(myDonation.causeId).to.be.null;
  });

  it('should set amount to 0', () => {
    expect(myDonation.amount).to.equal(0);
  });

  it('should set date to null', () => {
    expect(myDonation.date).to.be.null;
  });
});

describe('Donation.fromJS', () => {
  it('should handle basic strings', () => {
    const myDonation = Donation.fromJS({
      id: '123',
      causeId: '234'
    });

    expect(myDonation).to.deep.equal(new Donation({
      id: '123',
      causeId: '234'
    }));
  });

  it('should handle amount', () => {
    const myDonation = Donation.fromJS({
      amount: '2233'
    });

    expect(myDonation).to.deep.equal(new Donation({
      amount: 2233
    }));
  });

  it('should set date to a moment object from a unix timestamp', () => {
    const myDonation = Donation.fromJS({
      date: '111111111'
    });

    expect(myDonation).to.deep.equal(new Donation({
      date: moment.unix(111111111)
    }));
  });
});