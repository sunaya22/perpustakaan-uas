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
  getUsers, addUser, updateUser, deleteUser 
} from '../api/userService';

const userSchema = Yup.object().shape({
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string().required('Password harus diisi').min(6, 'Password minimal 6 karakter'),
  nama: Yup.string().required('Nama harus diisi'),
  alamat: Yup.string().required('Alamat harus diisi'),
  telepon: Yup.string().required('Telepon harus diisi'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  role: Yup.string().required('Role harus diisi'),
});

function UserPage() {
  const [userList, setUserList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.id, values);
      } else {
        await addUser(values);
      }
      fetchUsers();
      resetForm();
      setOpenDialog(false);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Daftar User</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentUser(null);
            setOpenDialog(true);
          }}
        >
          Tambah User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.nama}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(user.id)}
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
        <DialogTitle>{currentUser ? 'Edit User' : 'Tambah User'}</DialogTitle>
        <Formik
          initialValues={{
            username: currentUser?.username || '',
            password: '', // Kosongkan password saat edit, kecuali jika ingin mengubah
            nama: currentUser?.nama || '',
            alamat: currentUser?.alamat || '',
            telepon: currentUser?.telepon || '',
            email: currentUser?.email || '',
            role: currentUser?.role || 'user',
          }}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <DialogContent>
                <Field
                  component={TextField}
                  name="username"
                  label="Username"
                  fullWidth
                  margin="normal"
                  disabled={!!currentUser} // Username tidak bisa diubah saat edit
                />
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  // Hanya required saat tambah user atau jika password diisi saat edit
                  required={!currentUser || values.password.length > 0}
                />
                <Field
                  component={TextField}
                  name="nama"
                  label="Nama Lengkap"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="alamat"
                  label="Alamat"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="telepon"
                  label="Telepon"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                />
                <Field
                  component={TextField}
                  as="select"
                  name="role"
                  label="Role"
                  fullWidth
                  margin="normal"
                  select
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Field>
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

export default UserPage;