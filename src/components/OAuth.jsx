import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/googleIcon.png';

const OAuth = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// if user doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/profile');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	return (
		<div className="OAuth">
			<button onClick={onGoogleClick} className="btn">
				Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google{' '}
				<img className="googleIcon" src={googleIcon} alt="google icon" />
			</button>
		</div>
	);
};

export default OAuth;
