import axios from "axios";

const baseUrl = "http://localhost:3003/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
