import { List, Record, fromJS } from 'immutable';
import moment from 'moment';
import DonationProfile from '@models/DonationProfile';

const shape = {
  id: null,
  givenName: null,
  familyName: null,
  fullName:null,
  email: null,
  password:null,
  gender: null,
  dob: null,
  role: 0,
  jwt: null,
  affiliatedOrgs: List(),
  donationProfile: new DonationProfile,
  imageURL: null,
  createdAt: null,
  updatedAt: null,
  googleID:null,
  facebookID:null,
  zipcode:null,
  type:null,
  note:null,
  paymentInfo:null,
  loi:null,
  politicalIdeology:null,
  donationAmount:null
};

class User extends Record(shape) {
  static fromJS(pojo) {
    return new User({
      id: pojo.id || null,
      givenName: pojo.givenName || null,
      familyName: pojo.familyName || null,
      fullName:pojo.fullName,
      email: pojo.email || null,
      password: pojo.password || null,
      gender: pojo.gender || null,
      dob: pojo.dob ? moment.unix(+pojo.dob) : null,
      role: pojo.role ? +pojo.role : 0,
      jwt: pojo.jwt || null,
      affiliatedOrgs: pojo.affiliatedOrgs ? fromJS(pojo.affiliatedOrgs) : List(),
      donationProfile: pojo.donationProfile || new DonationProfile,
      imageURL: pojo.imageURL || null,
      googleID:pojo.googleID||"",
      facebookID:pojo.facebookID||"",
      created_at: pojo.createdAt ? moment.unix(+pojo.createdAt) : null,
      updated_at: pojo.updatedAt ? moment.unix(+pojo.updatedAt) : null,
      zipcode:pojo.zipcode ||null,
      type:pojo.type||"giver",
      note:pojo.note ||null,
      paymentInfo:pojo.paymentInfo||null,
      loi:pojo.loi||null,
      politicalIdeology:pojo.politicalIdeology || null,
      donationAmount:pojo.donationAmount||null
    });
  }
}

export default User;