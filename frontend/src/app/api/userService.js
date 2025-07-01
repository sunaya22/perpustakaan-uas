import axios from './axios';

export const getUsers = async () => {
  const response = await axios.get('/user');
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post('/user', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/user/${id}`);
  return response.data;
};