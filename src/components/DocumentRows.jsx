import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
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

const DocumentRows = ({ myprops }) => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [files, setFiles] = useState(null);

	// get files from database
	useEffect(() => {
		const fetchUserFiles = async () => {
			try {
				// get a reference to the client-docs collection
				const filesRef = collection(db, 'client-docs');

				// create a query
				const q = query(
					filesRef,
					where('userRef', '==', auth.currentUser.uid),
					orderBy('timestamp', 'desc')
				);

				// execute query
				const querySnap = await getDocs(q);

				const files = [];

				querySnap.forEach(doc => {
					return files.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setFiles(files);
				setLoading(false);
			} catch (error) {
				toast.error('Could not fetch files, please reload page');
			}
		};

		fetchUserFiles();
	}, [auth.currentUser.uid]);

	return (
		<>
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
							{file.data.type === 'application/pdf' ? (
								<td>
									<i className="bi bi-file-pdf text-danger"></i>
								</td>
							) : (
								<td>
									<i className="bi bi-file-image"></i>
								</td>
							)}

							<td>{file.data.name}</td>
							<td>{dateObj.toDate().toString()}</td>
							<td>{file.data.size / 1000} kb</td>
						</tr>
					);
				})}
		</>
	);
};

export default DocumentRows;
