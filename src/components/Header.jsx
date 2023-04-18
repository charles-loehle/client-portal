import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import SearchBar from './SearchBar';

const Header = ({ files, loading, filterText, onFilterTextChange }) => {
	const auth = getAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate('/');
	};

	return (
		<>
			<header className="Header navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
				<Link
					className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
					to="/profile"
				>
					Client Portal
				</Link>
				<button
					className="navbar-toggler position-absolute d-md-none collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#sidebarMenu"
					aria-controls="sidebarMenu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<SearchBar
					files={files}
					loading={loading}
					filterText={filterText}
					onFilterTextChange={onFilterTextChange}
				/>
				<div className="navbar-nav">
					<div className="nav-item text-nowrap">
						<a className="nav-link px-3" href="#" onClick={onLogout}>
							Sign out
						</a>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
