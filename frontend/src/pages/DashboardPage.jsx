import { Box, Typography, Paper, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBuku } from '../api/bukuService';
import { getUser} from '../api/userService';
import { getPeminjaman } from '../api/peminjamanService';

function DashboardPage() {
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalUser: 0,
    totalPeminjaman: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [buku, user, peminjaman] = await Promise.all([
          getBuku(),
          getUsers(),
          getPeminjaman(),
        ]);
        setStats({
          totalBuku: buku.length,
          totalUsers: user.length,
          totalPeminjaman: peminjaman.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Buku</Typography>
            <Typography variant="h3">{stats.totalBuku}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total User</Typography>
            <Typography variant="h3">{stats.totalUser}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Peminjaman</Typography>
            <Typography variant="h3">{stats.totalPeminjaman}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;