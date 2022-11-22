import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Loading = lazy(() => import('../Pages/Loading'));
const LayoutHS = lazy(() => import('../Pages/LayoutHS'));
const LayoutH = lazy(() => import('../Pages/LayoutH'));
const Main = lazy(() => import('../Pages/Main'));
const Login = lazy(() => import('../Pages/Login'));
const Signup = lazy(() => import('../Pages/Signup'));
const Detail = lazy(() => import('../Pages/Detail'));
const Mypage = lazy(() => import('../Pages/Mypage'));
const Map = lazy(() => import('../Pages/Map'));
const Edit = lazy(() => import('../Pages/Edit'));
const Logout = lazy(() => import('../Pages/Logout'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<LayoutHS />}>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/map" element={<Map />} />
          </Route>
          <Route element={<LayoutH />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
