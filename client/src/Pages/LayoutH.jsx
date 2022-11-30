import { Outlet } from 'react-router-dom';
import AboutBtn from '../Components/Common/AboutBtn';
import { Header } from '../Components/Common/Header';
import Sidebar from '../Components/Common/Sidebar';
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AboutBtn />
    </>
  );
};
export default Layout;
