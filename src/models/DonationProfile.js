import { Record, List, fromJS } from 'immutable';

const shape = {
  id: null,
  userId: null,
  amountTotal: 0,
  donations: List(),
  percentile: 0
};

class DonationProfile extends Record(shape) {
  static fromJS(pojo) {
    return new DonationProfile({
      id: pojo.id || null,
      userId: pojo.userId || null,
      amountTotal: +pojo.amountTotal || 0,
      donations: pojo.donations ? fromJS(pojo.donations) : List(),
      percentile: pojo.percentile ? +pojo.percentile : 0
    })
  }
};

export default DonationProfile;