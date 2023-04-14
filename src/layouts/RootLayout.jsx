import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
import { useState } from 'react';

const RootLayout = () => {
	return (
		<div className="RootLayout">
			<Header myprops={'RootLayout'} />

			<div className="container-fluid">
				<div className="row">
					<Sidebar />

					<main className="RootLayout col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<Breadcrumbs />
							<div className="btn-toolbar mb-2 mb-md-0">
								<Link
									to="/profile/create-file"
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									<span className="align-text-bottom"></span>
									Upload
								</Link>
							</div>
						</div>

						<Outlet myprops={'RootLayout'} />
					</main>
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
