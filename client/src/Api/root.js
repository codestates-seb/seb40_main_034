import axios from 'axios';

// const root = process.env.SERVER_URL;

const root = 'http://localhost:8080';

const axiosConfig = {
	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	baseURL: root,
};

const instance = axios.create(axiosConfig);
instance.defaults.withCredentials = true; // withCredentials 전역 설정

export default instance;
