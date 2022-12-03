import axios from 'axios';
import { useSelector } from 'react-redux';

// const root = process.env.REACT_APP_SERVER_ROOT_TEST;
const root = process.env.REACT_APP_SERVER_ROOT;
const state = useSelector((state) => state.user);
const { refreshToken } = state;

const axiosConfig = {
  headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: `Bearer ${refreshToken}` },
  baseURL: root,
};

const tokenInstance = axios.create(axiosConfig);
tokenInstance.defaults.withCredentials = true;

export default tokenInstance;
