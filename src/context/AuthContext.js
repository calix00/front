import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/authApi';
import axiosInstance from '../api/axiosInstance';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // 토큰 상태
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || ''); // Refresh Token 상태
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // 로그인 여부 상태

  // 토큰 유효성 검사 함수
  const validateToken = useCallback(async () => {
    if (!token) return false;
    try {
      // 서버에 토큰 유효성 검사를 요청합니다.
      await axiosInstance.get('/validate-token'); // 유효성 검사 엔드포인트는 '/validate-token'으로 가정합니다.
      return true;
    } catch (error) {
      console.error('토큰 유효성 검사 실패:', error.message);
      return false;
    }
  }, [token]);

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      const { user, token, refreshToken } = response; // 서버 응답에서 사용자 정보와 토큰을 추출
      setUser(user);
      setToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장하여 상태 유지
      localStorage.setItem('refreshToken', refreshToken); // Refresh Token을 로컬 스토리지에 저장
      setIsAuthenticated(true); // 로그인 성공 시 인증 상태를 true로 설정
    } catch (error) {
      console.error('로그인 실패:', error.message);
      throw error;
    }
  };

  // 회원가입 함수
  const signup = async (userData) => {
    try {
      await apiSignup(userData); // 회원가입 API 호출
    } catch (error) {
      console.error('회원가입 실패:', error.message);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    setToken('');
    setRefreshToken('');
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 Refresh Token 제거
    setIsAuthenticated(false); // 로그아웃 시 인증 상태를 false로 설정
  };

  // 토큰 갱신 함수
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return false;
    try {
      const response = await axiosInstance.post('/refresh-token', { refreshToken }); // Refresh Token을 사용해 새로운 Access Token 요청
      const newAccessToken = response.data.token;
      setToken(newAccessToken);
      localStorage.setItem('token', newAccessToken);
      setIsAuthenticated(true); // 갱신 성공 시 인증 상태를 true로 유지
      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error.message);
      logout();
      return false;
    }
  }, [refreshToken]);

  // 앱이 처음 시작될 때 로컬 스토리지에서 토큰을 가져와 사용자 상태 복원
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const isValid = await validateToken();
        if (isValid) {
          // 실제로는 API 호출을 통해 사용자 데이터를 가져오는 것이 좋습니다.
          setUser({ name: '사용자', id: 'exampleUser' }); // 예시로 하드코딩된 사용자 데이터 설정
          setIsAuthenticated(true); // 토큰이 유효하면 로그인 상태 유지
        } else {
          const refreshed = await refreshAccessToken(); // 토큰이 유효하지 않으면 갱신 시도
          if (!refreshed) {
            logout(); // 갱신이 실패하면 로그아웃
          }
        }
      }
    };
    initializeAuth();
  }, [token, validateToken, refreshAccessToken]);

  return (
    <AuthContext.Provider value={{  isAuthenticated, user, token, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
