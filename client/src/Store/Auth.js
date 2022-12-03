import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  memberId: null,
  authenticated: false, //authenticated : 현재 로그인 여부를 간단히 확인하기 위해 선언.
  email: null,
  nickname: null,
  refreshToken: null,
  accessToken: null,
  tags: [],
};

export const tokenSlice = createSlice({
  name: 'useInfo',
  initialState,
  reducers: {
    setLoginUserInfo: (state, action) => ({
      ...state,
      authenticated: true,
      memberId: action.payload.memberId,
      email: action.payload.email,
      nickname: action.payload.nickname,
      refreshToken: action.payload.refreshToken,
      accessToken: action.payload.accessToken,
    }),
    deleteLoginUserInfo: (state) => ({
      ...state,
      authenticated: false,
      memberId: null,
      email: null,
      nickname: null,
    }),
    setTagsInfo: (state, action) => ({
      // 추후에 수정
      ...state,
      tags: action.payload.tags,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});
//SET_TOKEN : Access Token 정보를 저장한다.
//DELETE_TOKEN : 값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제한다.
export const { setLoginUserInfo, deleteLoginUserInfo, setTagsInfo } = tokenSlice.actions;

export default tokenSlice.reducer;
