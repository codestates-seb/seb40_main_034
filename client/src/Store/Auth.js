import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    memberId: null,
    authenticated: false, //authenticated : 현재 로그인 여부를 간단히 확인하기 위해 선언.
    accessToken: null, //accessToken : Access Token 저장
    expireTime: null, //expireTime : Access Token 의 만료 시간
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.memberId = action.payload.memberId;
      state.accessToken = action.payload.accessToken;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.memberId = null;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});
//SET_TOKEN : Access Token 정보를 저장한다.
//DELETE_TOKEN : 값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제한다.
export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
