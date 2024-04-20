import React from 'react';
import { useNavigate } from 'react-router';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogOutButton from '../buttons/LogOutButton';
import { useAuth } from '../../providers/AuthProvider';
import { useUser } from '../../providers/UserProvider';

export default function ProfilePopUpModal({ handleClose }) {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const user = useUser();

	const handleLogOut = async () => {
		try {
			handleClose();
			await logout();
			navigate('/');
		} catch (err) {
			/* error */
		}
	};

	return (
		<div
			className="flex min-w-[362px] rounded-[10px] px-[31px] py-[28px] m-5 relative bg-mv-white shadow-notificationModalShadow"
			onClick={(event) => event.stopPropagation()}
		>
			<div className="w-full flex flex-col items-center gap-y-[20px]">
				<h1 className="text-mv-black text-xl font-medium">
					{user?.group === 'admins'
						? 'Admin User'
						: `Bidder ID: #${user?.['custom:bidder_number']}`}
				</h1>

				<div className="w-full flex flex-col items-start gap-y-[30px]">
					<hr className="border-solid border border-divider-grey w-full" />

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<PersonIcon style={{ fontSize: 24 }} />
						<div className="flex flex-col">
							<span className="text-base text-mv-black font-medium">
								User Profile
							</span>
							<a
								href="/profile"
								className="text-xs font-normal text-mv-black underline"
							>
								Click to see your user details, notification
								<br />
								settings, and watchlist
							</a>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<HistoryIcon style={{ fontSize: 24 }} />
						<div className="flex flex-col">
							<span className="text-base text-mv-black font-medium">
								Bid History
							</span>
							<a
								href="/history"
								className="text-xs font-normal text-mv-black underline"
							>
								Click to see your past bids
							</a>
						</div>
					</div>

					<hr className="border-solid border border-divider-grey w-full" />
				</div>

				<LogOutButton onClick={handleLogOut} />
			</div>
		</div>
	);
}
