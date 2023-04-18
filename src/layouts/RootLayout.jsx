import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
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
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const RootLayout = () => {
	const auth = getAuth();
	// pass state through Outlet using react router dom's context
	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState(null);
	const [stateUid, setStateUid] = useState(null);
	const [filterText, setFilterText] = useState('');

	// set user in state
	// https://stackoverflow.com/questions/64583730/how-to-use-useeffect-with-firebases-signin-method-properly
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				const { uid } = user;
				setStateUid(uid);
			} else {
				console.log('not logged in');
			}
		});
	}, []);

	// get files from database with state held user
	useEffect(() => {
		const fetchUserFiles = async () => {
			try {
				// get a reference to the client-docs collection
				const filesRef = collection(db, 'client-docs');

				// create a query
				const q = query(
					filesRef,
					where('userRef', '==', stateUid),
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
	}, [stateUid]);

	return (
		<div className="RootLayout">
			<Header
				files={files}
				loading={loading}
				filterText={filterText}
				onFilterTextChange={setFilterText}
			/>

			<div className="container-fluid">
				<div className="row">
					<Sidebar />

					<main className="RootLayout col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<Breadcrumbs />
							<div className="btn-toolbar mb-2 mb-md-0">
								<Link
									to="/profile/create-file"
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									<span className="align-text-bottom"></span>
									Upload
								</Link>
							</div>
						</div>

						<Outlet context={[files, loading, filterText]} />
					</main>
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
