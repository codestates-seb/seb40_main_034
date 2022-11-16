import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Layout = lazy(() => import('../Pages/Layout'));
const Main = lazy(() => import('../Pages/Main'));
const Login = lazy(() => import('../Pages/Login'));
const Detail = lazy(() => import('../Pages/Detail'));
const Mypage = lazy(() => import('../Pages/Mypage'));
const Map = lazy(() => import('../Pages/Map'));

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route element={<Layout />} />
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/map" element={<Map />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/detail" element={<Detail />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
