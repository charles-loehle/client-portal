import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
	const location = useLocation();
	let currentLink = '';

	const crumbs = location.pathname
		.split('/')
		.filter(crumb => crumb !== '')
		.map(crumb => {
			currentLink += `/${crumb}`;
			return (
				<div className="crumb d-inline-block" key={crumb}>
					<Link to={currentLink}>{crumb}</Link>
				</div>
			);
		});
	console.log(location.pathname.split('/'));

	return <div className="Breadcrumbs">{crumbs}</div>;
};

export default Breadcrumbs;
