import { getAuth } from 'firebase/auth';
import DocumentsTable from './DocumentsTable';

const MyDocuments = ({ myprops }) => {
	const auth = getAuth();

	return (
		<div className="MyDocuments">
			<h2>
				My Documents -{' '}
				{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
			</h2>

			<DocumentsTable myprops={myprops} />
		</div>
	);
};

export default MyDocuments;
