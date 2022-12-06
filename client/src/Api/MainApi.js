import instance from './root';
import createTokenInstance from './tokenroot';

export const getAllLists = async ({ page, size }) => {
  const url = '/main/list';
  try {
    const result = await instance.get(url, {
      params: { page, size },
    });
    return result.data;
  } catch (err) {
    return [err];
  }
};

export const getAllLists_Login = async ({ page, size }, refreshToken) => {
  const tokenInstance = createTokenInstance(refreshToken);
  const url = '/main/list';
  try {
    const result = await tokenInstance.get(url, {
      params: { page, size },
    });
    return result.data;
  } catch (err) {
    return [err];
  }
};

export const bookmark = async (postId, refreshToken) => {
  const tokenInstance = createTokenInstance(refreshToken);
  const url = `/main/${postId}/bookmark`;
  try {
    const result = await tokenInstance.post(url);
    return result.data;
  } catch (err) {
    return [err];
  }
};
