import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BukuPage from './pages/BukuPage';
import UserPage from './pages/UserPage';
import PeminjamanPage from './pages/PeminjamanPage';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/buku" element={isAuthenticated ? <BukuPage /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} />        <Route path="/peminjaman" element={isAuthenticated ? <PeminjamanPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;