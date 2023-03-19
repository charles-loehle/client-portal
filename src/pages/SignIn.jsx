import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

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
			//console.log(auth);
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate('/profile');
				//console.log(auth.currentUser + ' is logged in.');
			}
		} catch (error) {
			toast.error('Bad user credentials');
		}
	};

	return (
		<div className="SignIn text-center pt-5">
			<main className="form-signin w-100 m-auto">
				<form onSubmit={onSubmit}>
					<h1 className="h3 mb-3 fw-normal">Sign In To Your Client Portal</h1>

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
						Sign in
					</button>
					<div className="d-grid gap-2">
						<Link to="/sign-up" className="registerLink ">
							Sign Up Instead
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

export default SignIn;
