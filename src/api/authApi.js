import axiosInstance from './axiosInstance';

// 회원가입 API 호출 함수
export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다.');
  }
};

// 로그인 API 호출 함수
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};
