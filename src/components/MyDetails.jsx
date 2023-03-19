import { getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const MyDetails = () => {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	useEffect(() => {
		//console.log(auth.currentUser);
		// in the browser user data is stored in Application->Storage->IndexedDB->firebaseLocalStorageDb->firebaseLocalStorage
	}, [auth.currentUser.uid]);

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update display name in firebase
				await updateProfile(auth.currentUser, { displayName: name });
			}

			// update in firestore
			const userRef = doc(db, 'users', auth.currentUser.uid);
			await updateDoc(userRef, { name });
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
					<p className="profile-details__text">Personal Details</p>
					<p
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails(prevState => !prevState);
						}}
						className="changePersonalDetails"
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className="profile-card">
					<form>
						<input
							type="text"
							id="name"
							className={
								!changeDetails
									? 'profile-card__name'
									: 'profile-card__name-active'
							}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type="text"
							id="email"
							classemail={
								!changeDetails
									? 'profile-card__email'
									: 'profile-card__email-active'
							}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>

				<Link to="/profile/create-folder" className="create-listing">
					Upload a document
				</Link>
			</main>
		</div>
	);
};

export default MyDetails;
