import instance from './root';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginApi = (email, pw) => {
  axios.post('http://localhost:8080/login', { email, pw }).then((res) => {
    if (res.status === 201) {
      useNavigate('/');
      console.log(res.data);
    }
  });
};
