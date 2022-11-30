import instance from './root';

export const getAllLists = async () => {
  const url = '/';
  try {
    const result = await instance.get(url);
    return result.data;
  } catch (err) {
    return [err];
  }
};
