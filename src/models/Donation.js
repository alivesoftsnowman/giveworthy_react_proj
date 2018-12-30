import { Map, Record } from 'immutable';
import moment from 'moment';

const shape = {
  id: null,
  causeId: null,
  amount: 0,
  date: null
};

class Donation extends Record(shape) {
  static fromJS(pojo) {
    return new Donation({
      id: pojo.id || null,
      causeId: pojo.causeId || null,
      amount: pojo.amount ? +pojo.amount : 0,
      date: pojo.date ? moment.unix(+pojo.date) : null
    });
  }
}

export default Donation;