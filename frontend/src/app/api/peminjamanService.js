import axios from './axios';

export const getPeminjaman = async () => {
  const response = await axios.get('/peminjaman');
  return response.data;
};

export const addPeminjaman = async (peminjaman) => {
  const response = await axios.post('/peminjaman', peminjaman);
  return response.data;
};