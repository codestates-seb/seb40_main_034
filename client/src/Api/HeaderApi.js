import createTokenInstance from './root';

export const getProfile = async (refreshToken) => {
  const tokenInstance = createTokenInstance(refreshToken);
  const url = '/member/member-info';
  try {
    const result = await tokenInstance.get(url);
    return result.data;
  } catch (err) {
    return err;
  }
};
