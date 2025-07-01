import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistem Perpustakaan
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" href="/">
            Dashboard
          </Button>
          <Button color="inherit" href="/buku">
            Buku
          </Button>
          <Button color="inherit" href="/users">
            Users
          </Button>
          <Button color="inherit" href="/peminjaman">
            Peminjaman
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;