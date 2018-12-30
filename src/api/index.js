import axios from 'axios';

const url = ((process.env.NODE_ENV=="development")?'http://localhost:8080':process.env.HOST)+"/api";

async function login(email, token) {

  var params = {
    email:email,
    token:token
  }
  const result = await axios.post(`${url}/login`, {params});
  if (result.status !== 200)
    throw new Error(`Login failed with status: ${result.status}`);
  
  return result.data;
}
async function signup(email, token) {

  var params = {
    email:email,
    token:token
  }
  const result = await axios.post(`${url}/signup`, {params});
  if (result.status !== 200)
    throw new Error(`Signup failed with status: ${result.status}`);
  
  return result.data;
}

async function saveUserInfo(params){
  const result = await axios.post(`${url}/saveuserinfo`, {params});
  if (result.status !== 200)
    throw new Error(`Save user information failed with status: ${result.status}`);
  
  return result.data;
}
async function savecause(params){
  const result = await axios.post(`${url}/savecause`, {params});
  if (result.status !== 200)
    throw new Error(`Save cause failed with status: ${result.status}`);
  
  return result.data;
}
async function getCause(userID) {

  var params = {
    id:userID
  }
  const result = await axios.post(`${url}/getCause`, {params});
  if (result.status !== 200)
    throw new Error(`get cause failed with status: ${result.status}`);
  
  return result.data;
}
async function getMatchedCauses(params){
  
  const result = await axios.post(`${url}/get-mathced-causes`, {params});
  if (result.status !== 200)
    throw new Error(`get matched causes failed with status: ${result.status}`);
  
  return result.data;
}

async function getCausesForAcception(){
  const result = await axios.post(`${url}/get-causes-for-acception`);
  if (result.status !== 200)
    throw new Error(`get causes for acception failed with status: ${result.status}`);
  return result.data;
}

async function getCausesByTag(params){
  const result = await axios.post(`${url}/getcausesbytag`, {params});
  if (result.status !== 200)
    throw new Error(`get causes by tag failed with status: ${result.status}`);
  return result.data;
}
async function getCauseStatus(params){
  const result = await axios.post(`${url}/getcausestatus`, {params});
  if (result.status !== 200)
    throw new Error(`get cause's status failed with status: ${result.status}`);
  return result.data;
}

async function fileupload(params){
  const result = await axios({
    method: 'post',
    url: `${url}/fileupload`,
    data: params,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
  if (result.status !== 200)
    throw new Error(`File Uploading failed with status: ${result.status}`);
  
  return result.data;
}
async function giveDonation(params){
  const result = await axios.post(`${url}/givedonation`, {params});
  if (result.status !== 200)
    throw new Error(`give donation failed with status: ${result.status}`);
  return result.data;
}

async function getAllUsers(){
  const result = await axios.post(`${url}/getallusers`, {});
  if (result.status !== 200)
    throw new Error(`get all users list status failed with status: ${result.status}`);
  return result.data;
}
async function deleteUsers(params){
  const result = await axios.post(`${url}/deleteusers`, {params});
  if (result.status !== 200)
    throw new Error(`delete seleted users list status failed with status: ${result.status}`);
  return result.data;
}
async function getCausesByOwnerID(params){
  const result = await axios.post(`${url}/getcausesbyownerid`, {params});
  if (result.status !== 200)
    throw new Error(`get causes list by ownerId status failed with status: ${result.status}`);
  return result.data;
}

async function getCauseByID(params){
  const result = await axios.post(`${url}/getcausebyid`, {params});
  if (result.status !== 200)
    throw new Error(`get cause by ID status failed with status: ${result.status}`);
  return result.data;
}
async function deleteCauses(params){
  const result = await axios.post(`${url}/deletecauses`, {params});
  if (result.status !== 200)
    throw new Error(`delete seleted causes list status failed with status: ${result.status}`);
  return result.data;
}
async function getDontionSumByUserId(params){
  const result = await axios.post(`${url}/getdontionsumbyuserid`, {params});
  if (result.status !== 200)
    throw new Error(`get cause by ID status failed with status: ${result.status}`);
  return result.data;
}

async function updatePostInfoForCause(params){
  const result = await axios.post(`${url}/logpostcause`, {params});
  if (result.status !== 200)
    throw new Error(`update cause post failed with status: ${result.status}`);
  return result.data;
}

async function getPostInfoForCause(){
  const result = await axios.post(`${url}/getpostcauseinfo`, {});
  if (result.status !== 200)
    throw new Error(`update cause post failed with status: ${result.status}`);
  return result.data;
}

export {
  url,
  login,
  signup,
  savecause,
  getCause,
  fileupload,
  saveUserInfo,
  getMatchedCauses,
  getCausesForAcception,
  getCausesByTag,
  getCauseStatus,
  giveDonation,
  getAllUsers,
  deleteUsers,
  getCausesByOwnerID,
  getCauseByID,
  deleteCauses,
  getDontionSumByUserId,
  updatePostInfoForCause,
  getPostInfoForCause
};