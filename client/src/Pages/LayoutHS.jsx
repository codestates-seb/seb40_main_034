import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AboutBtn from '../Components/Layout/AboutBtn';
import Header from '../Components/Layout/Header';
import Sidebar from '../Components/Layout/Sidebar';
import WriteBtn from '../Components/Layout/WriteBtn';
import { useSelector } from 'react-redux';
const Layout = () => {
  const state = useSelector((state) => state.user);
  const { authenticated } = state;

  return (
    <>
      <Header />
      <Body>
        <Sidebar />
        <Outlet />
      </Body>
      <AboutBtn />
      {authenticated && <WriteBtn />}
    </>
  );
};
//WriteBtn은 로그인 성공했을 때만 가지고 와야함
const Body = styled.div`
  display: flex;
`;

export default Layout;
