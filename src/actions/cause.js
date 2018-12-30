export const ADD_CAUSE= 'ADD_CAUSE';
export const DEL_CAUSE = 'DEL_CAUSE';
export const UPDATE_CAUSE = 'UPDATE_CAUSE';
export const SAVE_CAUSE = 'SAVE_CAUSE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const GET_CAUSE_STATUS = 'GET_CAUSE_STATUS';
export const addCause = (payload) => ({
  type: ADD_CAUSE,
  payload
});

export const delCause = () => ({
  type: DEL_CAUSE
});
export const updateCause = (key, value) => ({
    type: UPDATE_CAUSE,
    key,
    value
});
export const saveCause = (payload,callback) => ({
    type: SAVE_CAUSE,
    payload,
    callback
});
export const uploadFile = (payload,key,callback) => ({
  type: UPLOAD_FILE,
  payload,
  key, 
  callback
});
export const getCauseStatus = (payload,callback) => ({
  type: GET_CAUSE_STATUS,
  payload,
  callback
});