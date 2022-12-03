import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  authorization: null,
};

export const headerSlice = createSlice({
  name: 'useHeaderAuth',
  initialState,
  reducers: {
    setHeaderAuth: (state, action) => ({
      ...state,
      authorization: action.payload.authorization,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});
//SET_TOKEN : Access Token 정보를 저장한다.
//DELETE_TOKEN : 값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제한다.
export const { setHeaderAuth } = headerSlice.actions;

export default headerSlice.reducer;
