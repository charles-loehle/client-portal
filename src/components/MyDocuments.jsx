import { getAuth } from 'firebase/auth';
import DocumentsTable from './DocumentsTable';
import { useOutletContext } from 'react-router-dom';

const MyDocuments = () => {
	const auth = getAuth();
	// recieve state from PrivateRoute's Outlet using react router dom's useOutletContext
	const [files, loading, filterText] = useOutletContext();

	return (
		<div className="MyDocuments">
			<h2>
				My Documents -{' '}
				{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
			</h2>

			<DocumentsTable files={files} loading={loading} filterText={filterText} />
		</div>
	);
};

export default MyDocuments;
