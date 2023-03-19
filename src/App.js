import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Profile2 from './pages/Profile2';
import CreateFolder from './pages/CreateFolder';
import PrivateRoute from './components/PrivateRoute';
import Folder from './pages/Folder';
import EditFolderName from './pages/EditFolderName';
import RootLayout from './layouts/RootLayout';
import MyDocuments from './components/MyDocuments';
import MyDetails from './components/MyDetails';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<LandingPage />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/profile" element={<RootLayout />}>
				<Route path="/profile" element={<PrivateRoute />}>
					<Route index element={<Profile />} />
					<Route path="/profile/my-details" element={<MyDetails />} />
					<Route path="/profile/create-folder" element={<CreateFolder />} />

					<Route path="/profile/my-documents" element={<MyDocuments />} />
				</Route>
			</Route>
		</>
	)
);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />

			{/* <Router> */}
			{/* <Header /> */}
			{/* <Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/profile2" element={<PrivateRoute />}>
						<Route path="/profile2" element={<Layout />}>
							<Route path="/profile2" element={<Profile2 />} />
						</Route>
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/create-folder" element={<CreateFolder />} />
				</Routes>
			</Router>

			<ToastContainer /> */}
		</>
	);
}

export default App;

