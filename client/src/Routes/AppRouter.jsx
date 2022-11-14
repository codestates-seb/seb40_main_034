import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Layout = lazy(() => import('../Pages/Layout'));
const Main = lazy(() => import('../Pages/Main'));

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route element={<Layout />} />
					<Route path="/" element={<Main />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
