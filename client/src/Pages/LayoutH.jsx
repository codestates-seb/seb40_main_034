import { Outlet } from 'react-router-dom';
import AboutBtn from '../Components/Layout/AboutBtn';
import Header from '../Components/Layout/Header';

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
