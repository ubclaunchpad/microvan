import React from 'react';
import { useNavigate } from 'react-router';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogOutButton from '../buttons/LogOutButton';
import { useAuth } from '../../providers/AuthProvider';
import { useUser } from '../../providers/UserProvider';

export default function ProfilePopUpModal({ bidderID, handleClose }) {
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
			className="flex w-[362px] h-[409px] rounded-2xl shadow-2xl m-5 overflow-hidden relative bg-mv-white"
			onClick={(event) => event.stopPropagation()}
		>
			<div className="w-full flex">
				<div className="w-full px-[31px] py-[28px]">
					<div className="flex flex-col text-base text-xxs">
						<div className="flex flex-row justify-center">
							<div>
								<div className="flex flex-col items-center">
									<div className="flex flex-col justify-center">
										<span className="text-xl font-semibold text-center">
											{user?.group === 'admins'
												? 'Admin User'
												: `Bidder ID: #${user?.['custom:bidder_number']}`}
										</span>
										<span>{bidderID}</span>
									</div>
								</div>
							</div>
						</div>
						<hr className="border-black border-opacity-30 mt-[28px] mb-[35px]" />
						<div className="flex items-center justify-center px-[3.85px]">
							<PersonIcon style={{ fontSize: '39px' }} className="mr-[30px]" />
							<div className="flex flex-col">
								<span className="text-base text-mv-black font-medium">
									User Profile
								</span>
								<a
									href="/profile"
									className="text-xs font-normal text-mv-black underline"
								>
									Click to see your user details, notification settings, and
									watchlist
								</a>
							</div>
						</div>
						<div className="flex items-center justify-center px-[3.85px] mt-[40px]">
							<HistoryIcon style={{ fontSize: '39px' }} className="mr-[30px]" />
							<div className="flex flex-col">
								<span className="text-base text-mv-black font-medium">
									Bid History
								</span>
								<a
									href="/history"
									className="text-xs font-normal text-mv-black underline"
								>
									Click to see your current and past bids
								</a>
							</div>
						</div>
						<hr className="border-black border-opacity-30 my-[35px]" />
						<LogOutButton onClick={handleLogOut} />
					</div>
				</div>
			</div>
		</div>
	);
}
