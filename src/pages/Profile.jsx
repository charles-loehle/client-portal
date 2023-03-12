import { getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Profile = () => {
	const [user, setUser] = useState(null);

	const auth = getAuth();

	useEffect(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
		// in the browser user data is stored in Application->Storage->IndexedDB->firebaseLocalStorageDb->firebaseLocalStorage
	}, [auth.currentUser.uid]);

	return (
		<div className="Profile">
			<h1>My Documents - {user ? user.displayName : 'Not logged in'}</h1>
			<p>This page will be read and edit profile details and documents</p>
		</div>
	);
};

export default Profile;
