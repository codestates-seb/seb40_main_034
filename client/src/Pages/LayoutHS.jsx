import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../Components/Common/Header';
import Sidebar from '../Components/Common/Sidebar';
const Layout = () => {
  return (
    <>
      <Header />
      <Body>
        <Sidebar />
        <Outlet />
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
`;

export default Layout;
