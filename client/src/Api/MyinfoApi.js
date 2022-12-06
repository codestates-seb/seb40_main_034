import instance from './root';
import axios from 'axios';
import createTokenInstance from './tokenroot';

export const getUserInfo = async (memberId) => {
  try {
    const res = await instance.get(`/member/${memberId}/edit`);
    return res.data;
  } catch (err) {
    return err;
  }
};
export const getMypageInfo = async (memberId) => {
  try {
    const res = await instance.get(`/member/${memberId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};
// export const getFollowing = async () => {
//  try {
//    const res = await instance.get('/following');
//    return res.data;
//  } catch (err) {
//    return err;
//  }
// };

export const getFollowing = async () => {
  try {
    const res = await axios.get('http://localhost:8080/following');
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getFollower = async () => {
  try {
    const res = await instance.get('http://localhost:8080/follower');
    return res.data;
  } catch (err) {
    return err;
  }
};
export const getFollowInfo = async () => {
  try {
    const res = await instance.get('http://localhost:8080/following');
    return res.data;
  } catch (err) {
    return err;
  }
};
export const addFollow = async () => {
  try {
    const res = await instance.post('/follow/add');
    return res;
  } catch (err) {
    return err;
  }
};

export const editUserInfo = async (data, refreshToken) => {
  const tokenInstance = createTokenInstance(refreshToken);
  const url = '/member/member-info/edit';
  try {
    const res = await tokenInstance.put(url, data);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await instance.delete('member/delete');
    return res;
  } catch (err) {
    return err;
  }
};
