import axios from 'axios';

// const root = process.env.REACT_APP_SERVER_ROOT_TEST;
const root = process.env.REACT_APP_SERVER_ROOT;

const axiosConfig = {
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  baseURL: root,
};

const instance = axios.create(axiosConfig);
instance.defaults.withCredentials = true;

export default instance;
