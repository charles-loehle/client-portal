import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<nav
			id="sidebarMenu"
			className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
		>
			<div className="position-sticky pt-3 sidebar-sticky">
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link className="nav-link active" aria-current="page" to="/profile">
							<i className="bi bi-house-door"></i>
							<span data-feather="home" className="align-text-bottom"></span>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile/my-details">
							<span data-feather="file" className="align-text-bottom"></span>
							My Details
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile/my-documents">
							<span
								data-feather="shopping-cart"
								className="align-text-bottom"
							></span>
							My Documents
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;
