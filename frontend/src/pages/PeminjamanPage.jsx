import { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { getPeminjaman, addPeminjaman } from '../api/peminjamanService';
import { getBuku } from '../api/bukuService';
import { getUser } from '../api/userService';

const peminjamanSchema = Yup.object().shape({
  buku_id: Yup.number().required('Buku harus dipilih'),
  user_id: Yup.number().required('User harus dipilih'),
  tanggal_pinjam: Yup.date().required('Tanggal pinjam harus diisi'),
  tanggal_kembali: Yup.date().required('Tanggal kembali harus diisi'),
});

function PeminjamanPage() {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [bukuList, setBukuList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [peminjamanData, bukuData, userData] = await Promise.all([
        getPeminjaman(),
        getBuku(),
        getUser(),
      ]);
      setPeminjamanList(peminjamanData);
      setBukuList(bukuData);
      setUserList(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addPeminjaman(values);
      fetchData();
      resetForm();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving peminjaman:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getBukuJudul = (id) => {
    const buku = bukuList.find(b => b.id === id);
    return buku ? buku.judul : 'Unknown';
  };

  const getUserNama = (id) => {
    const user = userList.find(a => a.id === id);
    return user ? user.nama : 'Unknown';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Daftar Peminjaman</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Tambah Peminjaman
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Buku</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Tanggal Pinjam</TableCell>
              <TableCell>Tanggal Kembali</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peminjamanList.map((peminjaman) => (
              <TableRow key={peminjaman.id}>
                <TableCell>{getBukuJudul(peminjaman.buku_id)}</TableCell>
                <TableCell>{getUserNama(peminjaman.user_id)}</TableCell>
                <TableCell>{new Date(peminjaman.tanggal_pinjam).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(peminjaman.tanggal_kembali).toLocaleDateString()}</TableCell>
                <TableCell>{peminjaman.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tambah Peminjaman</DialogTitle>
        <Formik
          initialValues={{
            buku_id: '',
            user_id: '',
            tanggal_pinjam: new Date().toISOString().split('T')[0],
            tanggal_kembali: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }}
          validationSchema={peminjamanSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <DialogContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Buku</InputLabel>
                  <Field
                    as={Select}
                    name="buku_id"
                    label="Buku"
                  >
                    {bukuList.map((buku) => (
                      <MenuItem key={buku.id} value={buku.id}>
                        {buku.judul}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>User</InputLabel>
                  <Field
                    as={Select}
                    name="user_id"
                    label="User"
                  >
                    {userList.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.nama}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  component={TextField}
                  name="tanggal_pinjam"
                  label="Tanggal Pinjam"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Field
                  component={TextField}
                  name="tanggal_kembali"
                  label="Tanggal Kembali"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Batal</Button>
                <Button type="submit" disabled={isSubmitting}>
                  Simpan
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
}

export default PeminjamanPage;