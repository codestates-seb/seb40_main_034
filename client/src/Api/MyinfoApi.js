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
