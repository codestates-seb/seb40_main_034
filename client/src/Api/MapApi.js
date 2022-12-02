import instance from './root';
import axios from 'axios';

export const handlePostInfo = async () => {
  try {
    const res = await instance.get('http://localhost:8080/posts');
    return res.data;
  } catch (err) {
    return err;
  }
};
