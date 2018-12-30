import { Record, List, fromJS } from 'immutable';

const shape = {
  id: null,
  ownerId: null,
  adminIds: List(),
  name: null,
  primaryVideoLink: null,
  photoLinks: List(),
  webLink: null,
  tags: List(),
  description: null,
  summary: null,
  details:null,
  donationIds: List(),
  percentile:null,
  financialDocLink:null
};

class Cause extends Record(shape) {
  static fromJS(pojo) {
    return new Cause({
      id: pojo.id || null,
      ownerId: pojo.ownerId || null,
      name: pojo.name || null,
      primaryVideoLink: pojo.primaryVideoLink || null,
      photoLinks: pojo.photoLinks ? pojo.photoLinks : [], 
      webLink: pojo.webLink || null,
      description: pojo.description || null,
      summary: pojo.summary || null,
      details: pojo.details || null,
      adminIds: pojo.adminIds ? fromJS(pojo.adminIds) : List(),
      tags: pojo.tags ? fromJS(pojo.tags) : List(),
      donationIds: pojo.donationIds ? fromJS(pojo.donationIds) : List(),
      percentile:pojo.percentile || null,
      financialDocLink:pojo.financialDocLink ||null
    });
  }
}

export default Cause;