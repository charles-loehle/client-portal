import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import CreateFolder from './pages/CreateFolder';
import PrivateRoute from './components/PrivateRoute';
import Folder from './pages/Folder';
import EditFolderName from './pages/EditFolderName';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/create-folder" element={<CreateFolder />} />
				</Routes>
			</Router>

			<ToastContainer />
		</>
	);
}

export default App;

