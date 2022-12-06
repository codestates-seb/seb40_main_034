import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from '../Store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Layout from '../Pages/Layout';

export const persistor = persistStore(store);

const Loading = lazy(() => import('../Pages/Loading'));
const LayoutHS = lazy(() => import('../Pages/LayoutHS'));
const LayoutH = lazy(() => import('../Pages/LayoutH'));
const Main = lazy(() => import('../Pages/Main'));
const Post = lazy(() => import('../Pages/Post'));
const Login = lazy(() => import('../Pages/Login'));
const Signup = lazy(() => import('../Pages/Signup'));
const Detail = lazy(() => import('../Pages/Detail'));
const Mypage = lazy(() => import('../Pages/Mypage'));
const Map = lazy(() => import('../Pages/Map'));
const MypageEdit = lazy(() => import('../Pages/MypageEdit'));
const Logout = lazy(() => import('../Pages/Logout'));

export const AppRouter = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <Routes>
                <Route element={<LayoutHS />}>
                  <Route path="" element={<Main />} />
                  <Route path="profile/:memberId" element={<Mypage />} />
                  <Route path="profile/:memberId/edit" element={<MypageEdit />} />
                  <Route path="post/:postId/detail" element={<Detail />} />
                </Route>
                <Route element={<LayoutH />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="logout" element={<Logout />} />
                  <Route path="post" element={<Post />} />
                </Route>
                <Route element={<Layout />}>
                  <Route path="map" element={<Map />} />
                </Route>
                <Route path="*" element={<Navigate to="" replace />} />
              </Routes>
            </PersistGate>
          </Provider>
        </Suspense>
      </BrowserRouter>
    </CookiesProvider>
  );
};
