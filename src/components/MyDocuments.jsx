import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';
import Folder from '../pages/Folder';

const MyDocuments = () => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [files, setFiles] = useState(null);

	useEffect(() => {
		const fetchUserFiles = async () => {
			const filesRef = collection(db, 'client-docs');
			//console.log(auth.currentUser);
			const q = query(
				filesRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			);

			const querySnap = await getDocs(q);

			let files = [];

			querySnap.forEach(doc => {
				console.log(doc.data());
				return files.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setFiles(files);
			setLoading(false);
		};

		fetchUserFiles();
	}, [auth.currentUser.uid]);

	return (
		<div className="MyDocuments">
			<h2>
				My Documents -{' '}
				{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
			</h2>
			<Link to="/profile/create-folder" className="create-listing">
				Upload a document
			</Link>
			<div className="table-responsive">
				<table className="table table-striped table-sm">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Type</th>
							<th scope="col">Document Name</th>
							<th scope="col">Date Modified</th>
							<th scope="col">Size</th>
						</tr>
					</thead>
					<tbody>
						{!loading &&
							files?.length > 0 &&
							files.map((file, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<i className="bi bi-filetype-pdf"></i>
									</td>
									<td>{file.data.imgUrls}</td>
									<td>{file.data.timestamp.seconds}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyDocuments;
