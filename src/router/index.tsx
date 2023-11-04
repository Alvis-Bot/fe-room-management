import {ComponentType, lazy, PropsWithChildren, Suspense} from "react";
import LoadingScreen from "../component/LoadingScreen.tsx";
import {DEFAULT_PATH} from "../../config.ts";
import {Navigate, useRoutes} from "react-router-dom";
import AuthLayout from "../layout/AuthLayout.tsx";
import DashboardLayout from "../layout/dashboard";
import {useCookies} from "react-cookie";


const Loadable = (Component: ComponentType) => {
	return (props: PropsWithChildren<any>) => (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};



export default function Router() {
	const isLogin = localStorage.getItem('isLogin') === 'true';
	console.log(isLogin)
	return useRoutes([
		{
			path: "/auth",
			element: !isLogin ? <AuthLayout/> : <Navigate to={DEFAULT_PATH} replace/>,
			children: [
				{path: "login", element: <LoginPage/>},
				{path: '*', element: <Navigate to="/404" replace/>},
			]
		},
		{
			path: '/',
			element: isLogin ? <DashboardLayout/> : <Navigate to="/auth/login" replace/>,
			children: [
				{element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
				{path: 'users', element: <UsersPage/> },
				{path: 'rooms', element: <RoomsPage/>},
				{path: 'events', element: <EventsPage/>},
				{path: 'attendance', element: <AttendancePage/>},
				{path: 'tasks', element: <TaskPage/>},
				{path: '*', element: <Navigate to="/404" replace/>},
				{path: '404', element: <Page404/>}
			]

		},

		{path: '*', element: <Navigate to="/404" replace/>},
	])

}

const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage.tsx')));
const Page404 = Loadable(lazy(() => import('../component/Page404.tsx')));
const UsersPage = Loadable(lazy(() => import('../pages/dashboard/UserPage.tsx')));
const RoomsPage = Loadable(lazy(() => import('../pages/dashboard/RoomPage.tsx')));
const EventsPage = Loadable(lazy(() => import('../pages/dashboard/EventPage.tsx')));
const AttendancePage = Loadable(lazy(() => import('../pages/dashboard/AttendancePage.tsx')));
const TaskPage = Loadable(lazy(() => import('../pages/dashboard/TaskPage.tsx')));
