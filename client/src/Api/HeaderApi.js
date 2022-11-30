import instance from './root';

export const getProfile = async () => {
  const url = '/member/member-info';
  try {
    const result = await instance.get(url);
    return result.data;
  } catch (err) {
    return err;
  }
};
