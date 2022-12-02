import instance from './root';

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
