import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';
import { useOutletContext } from 'react-router-dom';

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	// pass state through Outlet using react router dom's context
	const [files, loading, filterText] = useOutletContext();

	if (checkingStatus) {
		return <Spinner />;
	}

	return loggedIn ? (
		<Outlet context={[files, loading, filterText]} />
	) : (
		<Navigate to="/sign-in" />
	);
};

export default PrivateRoute;
