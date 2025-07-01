import { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { 
  getBuku, addBuku, updateBuku, deleteBuku 
} from '../api/bukuService';

const bukuSchema = Yup.object().shape({
  judul: Yup.string().required('Judul harus diisi'),
  pengarang: Yup.string().required('Pengarang harus diisi'),
  penerbit: Yup.string().required('Penerbit harus diisi'),
  tahun_terbit: Yup.number().required('Tahun terbit harus diisi'),
  stok: Yup.number().required('Stok harus diisi').min(0, 'Stok tidak boleh negatif'),
});

function BukuPage() {
  const [bukuList, setBukuList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBuku, setCurrentBuku] = useState(null);

  useEffect(() => {
    fetchBuku();
  }, []);

  const fetchBuku = async () => {
    try {
      const data = await getBuku();
      setBukuList(data);
    } catch (error) {
      console.error('Error fetching buku:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (currentBuku) {
        await updateBuku(currentBuku.id, values);
      } else {
        await addBuku(values);
      }
      fetchBuku();
      resetForm();
      setOpenDialog(false);
      setCurrentBuku(null);
    } catch (error) {
      console.error('Error saving buku:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (buku) => {
    setCurrentBuku(buku);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBuku(id);
      fetchBuku();
    } catch (error) {
      console.error('Error deleting buku:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Daftar Buku</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentBuku(null);
            setOpenDialog(true);
          }}
        >
          Tambah Buku
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell>Pengarang</TableCell>
              <TableCell>Penerbit</TableCell>
              <TableCell>Tahun Terbit</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bukuList.map((buku) => (
              <TableRow key={buku.id}>
                <TableCell>{buku.judul}</TableCell>
                <TableCell>{buku.pengarang}</TableCell>
                <TableCell>{buku.penerbit}</TableCell>
                <TableCell>{buku.tahun_terbit}</TableCell>
                <TableCell>{buku.stok}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(buku)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(buku.id)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentBuku ? 'Edit Buku' : 'Tambah Buku'}</DialogTitle>
        <Formik
          initialValues={{
            judul: currentBuku?.judul || '',
            pengarang: currentBuku?.pengarang || '',
            penerbit: currentBuku?.penerbit || '',
            tahun_terbit: currentBuku?.tahun_terbit || '',
            stok: currentBuku?.stok || 0,
          }}
          validationSchema={bukuSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  component={TextField}
                  name="judul"
                  label="Judul"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="pengarang"
                  label="Pengarang"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="penerbit"
                  label="Penerbit"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="tahun_terbit"
                  label="Tahun Terbit"
                  type="number"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="stok"
                  label="Stok"
                  type="number"
                  fullWidth
                  margin="normal"
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

export default BukuPage;