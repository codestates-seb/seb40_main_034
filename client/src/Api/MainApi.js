import instance from './root';

export const getPosts = async () => {
  const url = '/';
  try {
    const result = await instance.get(url);
    return result.data;
  } catch (err) {
    return err;
  }
};
