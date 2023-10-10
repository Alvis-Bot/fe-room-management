import {ComponentType, lazy, PropsWithChildren, Suspense} from "react";
import LoadingScreen from "../component/LoadingScreen.tsx";
import {DEFAULT_PATH} from "../../config.ts";
import {Navigate, useRoutes} from "react-router-dom";
import AuthLayout from "../layout/auth";
import DashboardLayout from "../layout/dashboard";


const Loadable = (Component: ComponentType) => {
	return (props: PropsWithChildren<any>) => (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};



export default function Router() {
	// const {isLoggedIn} = useSelector((state) => state.auth);

	return useRoutes([
		{
			path: "/auth",
			element: <AuthLayout/>,
			children: [
				{path: "login", element: <LoginPage/>},
				{path: '*', element: <Navigate to="/404" replace/>},
			]
		},
		{
			path: '/',
			element: <DashboardLayout/>,
			children: [
				{element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
				{path: 'users', element: <UsersPage/> },
				{path: 'rooms', element: <RoomsPage/>},
				{path: '*', element: <Navigate to="/404" replace/>},
				{path: '404', element: <Page404/>}
			]

		},

		{path: '*', element: <Navigate to="/404" replace/>},
	])

}

const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage.tsx')));
const Page404 = Loadable(lazy(() => import('../component/Page404.tsx')));
const UsersPage = Loadable(lazy(() => import('../pages/dashboard/users')));
const RoomsPage = Loadable(lazy(() => import('../pages/dashboard/rooms')));
