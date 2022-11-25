import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCookieToken, removeCookieToken } from '../storage/Cookie';
import { DELETE_LoginUserInfo } from '../Store/Auth';
import { requestToken } from '../Api/LoginApi';

function Logout() {
  // store에 저장된 Access Token 정보를 받아 온다
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cookie에 저장된 Refresh Token 정보를 받아 온다
  const refreshToken = getCookieToken();

  async function logout() {
    // 백으로부터 받은 응답
    const data = await refreshToken({ refresh_token: refreshToken }, accessToken);

    if (data.status) {
      // store에 저장된 Access Token 정보를 삭제
      dispatch(DELETE_LoginUserInfo());
      // Cookie에 저장된 Refresh Token 정보를 삭제
      removeCookieToken();
      return navigate('/');
    } else {
      window.location.reload();
    }
  }

  // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Link to="/" />
    </>
  );
}

export default Logout;
