import axios from 'axios';
import instance from './root';
import createTokenInstance from './tokenroot';

// 이미지 더미 데이터
let images = [
  'https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80',
  'https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
];

// 좋아요 get
export const useGetLike = async (postId, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.get(`/post/${postId}/like`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 좋아요 클릭 post
export const usePostLike = async (postId, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.post(`/main/${postId}/like`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 구독 get
export const useGetFollow = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/follow`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 구독 클릭 post
export const usePostFollow = async (subColor) => {
  try {
    const response = await axios.put(`http://localhost:8080/follow`, {
      follow: subColor,
    });
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 게시글 내용 조회(완)
export const useGetDetail = async (postId) => {
  try {
    const response = await instance.get(`/post/${postId}/detail`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 게시글 수정 put
export const usePutDetail = async (postId, refreshToken, data) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.put(`/main/${postId}/edit`, data);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 댓글 조회(완)
export const useGetComment = async (postId) => {
  try {
    const response = await instance.get(`/post/${postId}/comment?page=1&size=6`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 댓글 추가(완)
export const usePostComment = async (postId, contents, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.post(`/main/${postId}/comment`, {
      contents: contents,
    });
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 댓글 수정(완)
export const useEditComment = async (postId, commentId, contents, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.put(`/main/${postId}/${commentId}/edit`, {
      contents: contents,
    });
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 댓글 삭제(완)
export const useDeleteComment = async (postId, commentId, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.delete(`/main/${postId}/${commentId}/delete`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};

// 북마크 조회
export const useGetBookmark = ({ postId }) => {
  try {
    const response = axios.get(`/post/${postId}/bookmark`);
    if (response.status === 200) {
      console.log('Okay...');
      return response.data;
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    }
  }
};

// 삭제 api
export const useDeletePost = async (postId, refreshToken) => {
  const instance = createTokenInstance(refreshToken);
  try {
    const response = await instance.delete(`/main/${postId}/delete`);
    if (response.status === 200) {
      console.log('Okay');
    }
  } catch (err) {
    if (err.response.status === 404) {
      console.log('404 Error...');
    } else if (err.response.status === 400) {
      console.log('400 Error...');
    }
  }
};
