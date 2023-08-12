const axios = require('axios');

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
});

const Test_axiosClient = axios.create({
  baseURL: process.env.TEST_BASE_URL,
});

async function getRequest(URL) {
  const response = await axiosClient.get(`${URL}`);
  return response;
}

async function putRequest(URL, payload) {
  const response = await axiosClient.put(`${URL}`, payload);
  return response;
}

async function postRequest(URL, payload, headers = {}) {
  const response = await axiosClient.post(`${URL}`, payload, { headers });
  return response;
}

async function patchRequest(URL, payload) {
  const response = await axiosClient.patch(`${URL}`, payload);
  return response;
}

async function deleteRequest(URL) {
  const response = await axiosClient.delete(`${URL}`);
  return response;
}

// for test net requests

async function Test_getRequest(URL, headers = {}) {
  const response = await Test_axiosClient.get(`${URL}`, { headers });
  return response;
}

async function Test_putRequest(URL, payload, headers = {}) {
  const response = await Test_axiosClient.put(`${URL}`, payload, { headers });
  return response;
}

async function Test_postRequest(URL, payload, headers = {}) {
  const response = await Test_axiosClient.post(`${URL}`, payload, { headers });
  return response;
}

async function Test_patchRequest(URL, payload) {
  const response = await Test_axiosClient.patch(`${URL}`, payload);
  return response;
}

async function Test_deleteRequest(URL) {
  const response = await Test_axiosClient.delete(`${URL}`);
  return response;
}

module.exports = {
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
  deleteRequest,
  Test_deleteRequest,
  Test_getRequest,
  Test_patchRequest,
  Test_postRequest,
  Test_putRequest,
};
