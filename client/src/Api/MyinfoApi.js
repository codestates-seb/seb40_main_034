import instance from './root';

export const getUserInfo = async () => {
	try {
		const res = await instance.get('/member');
		return res.data;
	} catch (err) {
		return err;
	}
};

export const getFollowInfo = async () => {
	try {
		const res = await instance.get('/follow');
		return res.data;
	} catch (err) {
		return err;
	}
};

export const addFollow = async (id) => {
	try {
		const res = await instance.delete(`/follow/${id}`);
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
