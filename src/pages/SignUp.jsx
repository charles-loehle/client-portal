import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAuth from '../components/OAuth';

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;

	const navigate = useNavigate();

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			const auth = getAuth();
			// console.log(auth);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			updateProfile(auth.currentUser, { displayName: name });
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timeStamp = serverTimestamp();
			// Add a new document in collection "users"
			await setDoc(doc(db, 'users', user.uid), formDataCopy);

			navigate('/profile');
		} catch (error) {
			toast.error('Something went wrong with registration. Please try again');
		}
	};

	return (
		<div className="SignUp text-center pt-5">
			<main className="form-signup w-100 m-auto">
				<form onSubmit={onSubmit}>
					<h1 className="h3 mb-3 fw-normal">Sign Up For Client Portal</h1>

					<div className="form-floating">
						<input
							type="name"
							className="form-control"
							id="name"
							value={name}
							onChange={onChange}
							placeholder="Name"
						/>
						<label htmlFor="floatingInput">Name</label>
					</div>
					<div className="form-floating">
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={onChange}
							placeholder="Email"
						/>
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div className="form-floating">
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control"
							id="password"
							value={password}
							onChange={onChange}
							placeholder="Password"
						/>
						<i
							className="showPassword bi bi-eye p-3"
							onClick={() => setShowPassword(prevState => !prevState)}
						></i>
						<label htmlFor="floatingPassword">Password</label>
					</div>

					<button className="mb-3 w-100 btn btn-lg btn-primary" type="submit">
						Sign Up
					</button>
					<div className="d-grid gap-2">
						<Link to="/sign-in" className="signLink ">
							Sign In
						</Link>
						<Link to="/forgot-password" className="forgotPasswordLink">
							Forgot Password
						</Link>
					</div>
				</form>

				<OAuth />
			</main>
		</div>
	);
};

export default SignUp;
