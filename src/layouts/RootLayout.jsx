import { Outlet } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import Sidebar from '../components/Sidebar';
import MyDocuments from '../components/MyDocuments';
import Breadcrumbs from '../components/Breadcrumbs';

const Layout = ({ children }) => {
	const auth = getAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate('/');
	};

	return (
		<div className="root-layout">
			<header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
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
				<input
					className="form-control form-control-dark w-100 rounded-0 border-0"
					type="text"
					placeholder="Search"
					aria-label="Search"
				/>
				<div className="navbar-nav">
					<div className="nav-item text-nowrap">
						<a className="nav-link px-3" href="#" onClick={onLogout}>
							Sign out
						</a>
					</div>
				</div>
			</header>

			<div className="container-fluid">
				<div className="row">
					<Sidebar />

					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<Breadcrumbs />
							<div className="btn-toolbar mb-2 mb-md-0">
								<div className="btn-group me-2">
									<button
										type="button"
										className="btn btn-sm btn-outline-secondary"
									>
										Share
									</button>
									<button
										type="button"
										className="btn btn-sm btn-outline-secondary"
									>
										Export
									</button>
								</div>
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary dropdown-toggle"
								>
									<span
										data-feather="calendar"
										className="align-text-bottom"
									></span>
									This week
								</button>
							</div>
						</div>

						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
