import createTokenInstance from './tokenroot';

export const getProfile = async (accessToken) => {
  const tokenInstance = createTokenInstance(accessToken);
  const url = '/member/member-info';
  try {
    const result = await tokenInstance.get(url);
    console.log('result', result.data);
    return result.data;
  } catch (err) {
    return err;
  }
};
