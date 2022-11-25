import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//setToken:Token을 Cookie에 저장하기 위한 함수
export const setCookieToken = (Token) => {
  return cookies.set('token', Token, {
    sameSite: 'strict',
    path: '/',
    maxAge: 420 * 60, // 420분
  });
};
//getCookieToken : Cookie에 저장된 Token 값을 갖고 오기 위한 함수.
export const getCookieToken = () => {
  return cookies.get('token');
};
//removeCookieToken : Cookie 삭제를 위한 함수. 로그아웃 시 사용
export const removeCookieToken = () => {
  return cookies.remove('token', { sameSite: 'strict', path: '/' });
};

//nickname을 Cookie에 저장하기 위한 함수
export const setCookieNickname = (nickname) => {
  return cookies.set('nickname', nickname);
};

export const getCookieNickname = () => {
  return cookies.get('nickname');
};

export const removeCookieNickname = () => {
  return cookies.remove('nickname');
};

//email을 Cookie에 저장하기 위한 함수
export const setCookieEmail = (email) => {
  return cookies.set('email', email);
};

export const getCookieEmail = () => {
  return cookies.get('email');
};

export const removeCookieEmail = () => {
  return cookies.remove('email');
};
