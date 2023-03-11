import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className="LandingPage container">
			<h1>Welcome To Client Portal</h1>
			<Link to="/sign-in">Sign In</Link>
		</div>
	);
};

export default LandingPage;
