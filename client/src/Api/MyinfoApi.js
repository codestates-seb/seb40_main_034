import instance from './root';
import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const res = await instance.get('/member');
    return res.data;
  } catch (err) {
    return err;
  }
};

// export const getFollowing = async () => {
// 	try {
// 		const res = await instance.get('/following');
// 		return res.data;
// 	} catch (err) {
// 		return err;
// 	}
// };

export const getFollowing = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/following`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getFollower = async () => {
  try {
    const res = await instance.get('/follower');
    return res.data;
  } catch (err) {
    return err;
  }
};
export const getFollowInfo = async () => {
  try {
    const res = await instance.get('/follower');
    return res.data;
  } catch (err) {
    return err;
  }
};
export const addFollow = async () => {
  try {
    const res = await instance.post(`/follow/add`);
    return res;
  } catch (err) {
    return err;
  }
};

export const editUserInfo = async (id, data) => {
  try {
    const res = await instance.put(`/member/${id}/edit`);
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
