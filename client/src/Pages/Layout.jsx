import { Outlet } from 'react-router-dom';
import { Header } from '../Components/Layout/Header';
import { Sidebar } from '../Components/Layout/Sidebar';
const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
};
export default Layout;
