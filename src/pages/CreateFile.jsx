import { useState, useEffect, useRef } from 'react';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const CreateFile = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		files: {},
	});
	const [fileMetadata, setFileMetadata] = useState({
		name: '',
		size: null,
		type: '',
		lastModifiedDate: null,
	});
	const { files } = formData;

	const auth = getAuth();
	const navigate = useNavigate();
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, user => {
				if (user) {
					setFormData({ ...formData, userRef: user.uid });
				} else {
					navigate('/sign-in');
				}
			});
		}

		return () => {
			isMounted.current = false;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	const onSubmit = async e => {
		e.preventDefault();
		//console.log(formData);
		setLoading(true);

		if (files.length > 6) {
			setLoading(false);
			toast.error('Max 6 files');
			return;
		}

		// prepare to store files in storage
		const storeFile = async file => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				// const fileName = file.name

				const storageRef = ref(storage, file.name);
				const uploadTask = uploadBytesResumable(storageRef, file);

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on(
					'state_changed',
					snapshot => {
						// Get task progress
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
							default:
								break;
						}
					},
					error => {
						reject(error);
					},
					() => {
						// Upload completed successfully, now we can get the download URL
						getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
							//console.log('File available at', downloadURL);
							resolve(downloadURL);
						});
					}
				);
			});
		};

		// Store files in storage
		const fileUrls = await Promise.all(
			[...files].map(file => storeFile(file))
		).catch(() => {
			setLoading(false);
			toast.error('Unable to upload file, please try again');
			return;
		});

		// console.log(fileUrls);

		//define collection fields to save to firestore
		const formDataCopy = {
			...formData,
			fileUrls,
			...fileMetadata,
			timestamp: serverTimestamp(),
		};

		//console.log(formDataCopy);

		// delete the actual files because we just want to save the urls to firestore
		delete formDataCopy.files;

		//console.log(formDataCopy);

		// save document to client-docs collection
		const docRef = await addDoc(collection(db, 'client-docs'), formDataCopy);

		setLoading(false);
		toast.success('Document saved');
		navigate('/profile/my-documents');
	};

	const onMutate = e => {
		//console.log(e.target.files);
		const fileList = e.target.files;
		// set file metadata in state
		for (let file of fileList) {
			setFileMetadata({
				name: file.name,
				size: file.size,
				type: file.type,
				lastModifiedDate: file.lastModifiedDate,
			});
		}

		// Files
		if (e.target.files) {
			setFormData(prevState => ({
				...prevState,
				files: e.target.files,
			}));
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="CreateFile">
			<h1>Upload a Document</h1>
			<main>
				<form onSubmit={onSubmit} className="create-file-form">
					<div className="mb-3">
						<label htmlFor="file" className="form-label">
							File types accepted: .jpg, .png, .jpeg, .pdf, .webp
						</label>
						<input
							type="file"
							id="files formFile"
							onChange={onMutate}
							accept=".jpg,.png,.jpeg,.pdf"
							max="6"
							multiple
							required
							className="form-control"
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</main>
			<Link to="/profile">Back</Link>
		</div>
	);
};

export default CreateFile;
