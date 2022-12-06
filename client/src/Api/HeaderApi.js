import createTokenInstance from './tokenroot';

export const getProfile = async (refreshToken) => {
  const tokenInstance = createTokenInstance(refreshToken);
  const url = '/member/member-info';
  try {
    const result = await tokenInstance.get(url);
    console.log('result', result.data);
    return result.data;
  } catch (err) {
    return err;
  }
};
