import instance from './root';

export const getAllLists = async ({ page, size }) => {
  const url = '/main/list';
  try {
    const result = await instance.get(url, {
      params: { page, size },
    });
    console.log('main post list data: ', result.data);
    return result.data;
  } catch (err) {
    console.log('main post list fetch error: ', err);
    return [err];
  }
};
