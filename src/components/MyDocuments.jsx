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
	toDate,
	Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Folder from '../pages/Folder';
import DocumentsList from './DocumentsList';

const MyDocuments = () => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [files, setFiles] = useState(null);

	console.log(auth.currentUser.uid);

	useEffect(() => {
		const fetchUserFiles = async () => {
			try {
				// get a reference to the client-docs collection
				const filesRef = collection(db, 'client-docs');
				//console.log(filesRef.data);

				// create a query
				const q = query(
					filesRef,
					where('userRef', '==', auth.currentUser.uid),
					orderBy('timestamp', 'desc')
				);

				// execute query
				const querySnap = await getDocs(q);
				//console.log(querySnap);

				const files = [];

				querySnap.forEach(doc => {
					//console.log(doc.data());
					return files.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setFiles(files);
				setLoading(false);
				//console.log('try ran');
			} catch (error) {
				toast.error('Could not fetch files, please reload page');
			}
		};

		fetchUserFiles();
	}, [auth.currentUser.uid]);

	return (
		<div className="MyDocuments">
			<h2>
				My Documents -{' '}
				{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
			</h2>
			<Link to="/profile/create-file" className="create-listing">
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
							files.map((file, index) => {
								let dateObj = new Timestamp(
									file.data.timestamp.seconds,
									file.data.timestamp.nanoseconds
								);
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>
											<i className="bi bi-filetype-pdf"></i>
										</td>
										<td>{file.data.imgUrls}</td>
										<td>{dateObj.toDate().toString()}</td>
										{/* <td>{file.data.timestamp.seconds}</td> */}
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyDocuments;
