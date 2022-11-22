import { Outlet } from 'react-router-dom';
import { Header } from '../Components/Common/Header';
import { Sidebar } from '../Components/Common/Sidebar';
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
