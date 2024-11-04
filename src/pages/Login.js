import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi'; // login 함수가 자동으로 토큰을 저장
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // login 함수 호출: 토큰이 자동으로 저장됩니다.
      const response = await login({ id, password });
      console.log('로그인 성공:', response);
      setMessage('로그인에 성공하였습니다.');
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setMessage('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  const handleSignupNavigation = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box textAlign="center" mb={2}>
            <Button type="submit" variant="contained" color="primary" size="large">
              로그인
            </Button>
          </Box>
        </form>
        {message && (
          <Box mt={3}>
            <Alert severity={message.includes('성공') ? 'success' : 'error'}>{message}</Alert>
          </Box>
        )}
        <Box textAlign="center" mt={2}>
          <Button variant="text" color="secondary" onClick={handleSignupNavigation}>
            회원가입으로 이동
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
