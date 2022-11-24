import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//setRefreshToken:RefreshToken을 Cookie에 저장하기 위한 함수
export const setRefreshToken = (refreshToken) => {
  return cookies.set('Refresh', refreshToken, {
    sameSite: 'strict',
    path: '/',
    maxAge: 420 * 60, // 420분
  });
};
//getCookieToken : Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
export const getCookieToken = () => {
  return cookies.get('Refresh');
};
//removeCookieToken : Cookie 삭제를 위한 함수. 로그아웃 시 사용
export const removeCookieToken = () => {
  return cookies.remove('Refresh', { sameSite: 'strict', path: '/' });
};
