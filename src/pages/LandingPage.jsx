import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className="LandingPage px-4 py-5 my-5 text-center">
			<h1 className="display-5 fw-bold">Welcome To Client Portal</h1>
			<Link to="/sign-in">Sign In</Link>
		</div>
	);
};

export default LandingPage;
