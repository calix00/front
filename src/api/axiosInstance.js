// axiosInstance.js
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axiosInstance.post('/refresh-token', { refreshToken });
        localStorage.setItem('token', data.newAccessToken);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        console.error('토큰 갱신 실패:', e.message);
        
        // 로그아웃 처리
        const { logout } = React.useContext(AuthContext);
        if (logout) {
          logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
