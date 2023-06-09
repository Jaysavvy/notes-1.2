import axios from "axios";
const baseUrl = "/api/notes";

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const exportedNoteServices = {
  getAll: getAll,
  create: create,
  update: update,
  setToken: setToken,
};

export default exportedNoteServices;


// export default {
//   getAll: getAll,
//   create: create,
//   update: update,
//   setToken: setToken,
// };
