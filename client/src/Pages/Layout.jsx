import { Outlet } from 'react-router-dom';
import Header from '../Components/Layout/Header';
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
