import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const onChange = e => setEmail(e.target.value);

	const onSubmit = async e => {
		e.preventDefault();
		//console.log('forgot password');
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('Could not send reset email');
		}
	};

	return (
		<div className="ForgotPassword">
			<header>
				<div className="page-header">
					<h1>Forgot Password </h1>
				</div>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						className="email-input"
						value={email}
						id="email"
						onChange={onChange}
					/>
					<Link to="/sign-in">Sign In</Link>
					<div className="send-reset-link">
						<button className="mb-3 w-100 btn btn-lg btn-primary" type="submit">
							Send Reset Link
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
