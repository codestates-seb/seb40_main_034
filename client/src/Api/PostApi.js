import instance from './root';

export const postArticle = async (data) => {
  const url = '/main/submit';
  try {
    const result = await instance.post(url, data);
    return result.data;
  } catch (err) {
    return [err];
  }
};
