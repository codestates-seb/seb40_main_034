import axios from 'axios';

// const root = process.env.REACT_APP_SERVER_ROOT_TEST;
const createTokenInstance = (refreshToken) => {
  const root = process.env.REACT_APP_SERVER_ROOT;
  const axiosConfig = {
    headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: `Bearer ${refreshToken}` },
    baseURL: root,
  };
  const tokenInstance = axios.create(axiosConfig);
  tokenInstance.defaults.withCredentials = true;
  return tokenInstance;
};

export default createTokenInstance;
