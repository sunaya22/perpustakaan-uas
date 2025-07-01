import axios from './axios';

export const getBuku = async () => {
  const response = await axios.get('/buku');
  return response.data;
};

export const addBuku = async (buku) => {
  const response = await axios.post('/buku', buku);
  return response.data;
};

export const updateBuku = async (id, buku) => {
  const response = await axios.put(`/buku/${id}`, buku);
  return response.data;
};

export const deleteBuku = async (id) => {
  const response = await axios.delete(`/buku/${id}`);
  return response.data;
};