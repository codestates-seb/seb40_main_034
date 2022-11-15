import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Map from '../Pages/Map';

const Layout = lazy(() => import('../Pages/Layout'));
const Main = lazy(() => import('../Pages/Main'));

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
