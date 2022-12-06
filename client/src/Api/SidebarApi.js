import instance from './root';

export const getInitialTags = async () => {
  const url = '/main/tag';
  try {
    const result = await instance.get(url);
    return result.data;
  } catch (err) {
    return err;
  }
};

export const getFollowList = async () => {
  const url = '/follow/followerlist';
  try {
    const result = await instance.get(url);
    return result.data;
  } catch (err) {
    return err;
  }
};
