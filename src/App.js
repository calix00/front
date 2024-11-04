import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainPage from './pages/MainPage';
import Problems from './pages/Problems';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Alerts from './pages/Alerts';
import Solutions from './pages/Solutions';
import { AuthProvider } from './context/AuthContext'; // AuthProvider 임포트
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider> {/* AuthProvider로 감싸기 */}
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
