import { useNavigate, useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Header = () => {
	const [user, setUser] = useState(null);

	const auth = getAuth();

	useEffect(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
		// in the browser user data is stored in Application->Storage->IndexedDB->firebaseLocalStorageDb->firebaseLocalStorage
	}, [auth.currentUser]);

	const navigate = useNavigate();
	const location = useLocation();

	const pathMatchRoute = route => {
		if (route === location.pathname) {
			return true;
		}
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						CLIENT PORTAL
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className={`nav-link ${
										pathMatchRoute('/sign-in') ? 'active' : ''
									}`}
									to="/sign-in"
								>
									Sign In
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${
										pathMatchRoute('/sign-up') ? 'active' : ''
									}`}
									to="/sign-up"
								>
									Sign Up
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
