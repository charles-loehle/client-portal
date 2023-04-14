import { getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const MyDetails = () => {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	console.log(address, phone);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	// get user details
	useEffect(() => {
		// 1. using async/await
		// const fetchUserFiles = async () => {
		// 	const filesRef = doc(db, 'users', auth.currentUser.uid);
		// 	// const q = query(filesRef, where('userRef', '==', auth.currentUser.uid));

		// 	// const querySnap = await getDoc(q);
		// 	const docSnap = await getDoc(filesRef);

		// 	console.log(docSnap.data());

		// 	setAddress(docSnap.data().address);
		// 	setPhone(docSnap.data().phone);
		// 	// setLoading(false);
		// };

		// fetchUserFiles();

		// 2. using onSnapshot
		const q = doc(db, 'users', auth.currentUser.uid);
		onSnapshot(q, doc => {
			setAddress(doc.data().address);
			setPhone(doc.data().phone);
		});
	}, [auth.currentUser.uid]);

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update display name in firebase
				await updateProfile(auth.currentUser, { displayName: name });
			}

			// update in firestore
			const userRef = doc(db, 'users', auth.currentUser.uid);
			await updateDoc(userRef, { name, address, phone });
			console.log('submitted');
		} catch (error) {
			console.log(error);
			toast.error('Could not update profile details');
		}
	};

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="MyDetails">
			<div className="profile-header">
				<h2>
					My Details -{' '}
					{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
				</h2>
			</div>

			<main>
				<div className="profile-details">
					<button
						className="btn btn-primary mb-3 rounded-pill px-3 py-0"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails(prevState => !prevState);
						}}
					>
						{changeDetails ? 'Save' : 'Edit'}
					</button>
				</div>
				<div className="profile-card">
					<form className="row g-3">
						<div className="col-12">
							<label className="form-label">Name</label>
							<input
								type="text"
								className={
									!changeDetails
										? 'form-control profile-card__name'
										: 'form-control profile-card__name-active'
								}
								id="name"
								disabled={!changeDetails}
								value={name}
								onChange={onChange}
							/>
						</div>
						<div className="col-12">
							<label className="form-label">Address</label>
							<input
								type="text"
								className={
									!changeDetails
										? 'form-control profile-card__address'
										: 'form-control profile-card__address-active'
								}
								id="address"
								disabled={!changeDetails}
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Phone</label>
							<input
								type="text"
								id="phone"
								className={
									!changeDetails
										? 'form-control profile-card__phone'
										: 'form-control profile-card__phone-active'
								}
								disabled={!changeDetails}
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Email</label>
							<input
								type="email"
								className={
									!changeDetails
										? 'form-control profile-card__email'
										: 'form-control profile-card__email-active'
								}
								id="email"
								disabled={!changeDetails}
								value={email}
								onChange={onChange}
							/>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
};

export default MyDetails;
