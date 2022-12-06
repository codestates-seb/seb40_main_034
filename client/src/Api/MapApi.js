import instance from './root';
import axios from 'axios';
import createTokenInstance from './tokenroot';

export const handlePostInfo = async ({ page, size }, refreshToken) => {
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
