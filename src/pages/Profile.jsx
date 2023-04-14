import { getAuth } from 'firebase/auth';

const Profile = () => {
	const auth = getAuth();

	return (
		<>
			<div className="Profile">
				<div className="profile-header">
					<h2>
						Home -{' '}
						{auth.currentUser ? auth.currentUser.displayName : 'Not logged in'}
					</h2>
				</div>

				<main>
					<div className="profile-details">
						<p className="profile-details__text">Welcome to Client Portal</p>
						<p>
							Click on "My Details" in the sidebar to edit your personal
							information.
						</p>
						<p>
							Click on "My Documents" in the sidebar to upload your first
							document.
						</p>
					</div>
				</main>
			</div>
		</>
	);
};

export default Profile;
