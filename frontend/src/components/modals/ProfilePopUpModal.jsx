import React from 'react';
import { useNavigate } from 'react-router';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogOutButton from '../buttons/LogOutButton';
import { useAuth } from '../../providers/AuthProvider';
import { useUser } from '../../providers/UserProvider';

export default function ProfilePopUpModal({ bidderID }) {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const user = useUser();

	const handleLogOut = async () => {
		try {
			await logout();
			navigate('/');
		} catch (err) {
			/* error */
		}
	};
	return (
		<div className="flex w-[362px] h-[409px] rounded-2xl shadow-2xl m-5 overflow-hidden relative bg-mv-white">
			<div className="w-full flex">
				<div className="w-full px-9 py-7">
					<div className="flex flex-col text-gray-700 text-base text-xxs">
						<div className="flex flex-row justify-center">
							<div>
								<div className="flex flex-col items-center">
									<div className="flex flex-col justify-center">
										<span className="font-poppins text-xl font-semibold leading-10 text-center bg-gray-600">
											{user?.group === 'admins'
												? 'Admin User'
												: `Bidder ID: #${user?.['custom:bidder_number']}`}
										</span>
										<span>{bidderID}</span>
									</div>
								</div>
							</div>
						</div>
						<hr className="border-solid border border-black border-opacity-30 my-4" />
						<div className="flex flex-row justify-between py-3">
							<div>
								<div className="flex flex-row items-center px-5">
									<PersonIcon style={{ fontSize: '39px' }} className="mr-2" />
									<div className="flex flex-col justify-between px-6">
										<span className="font-poppins text-base font-medium leading-6 text-left">
											User Profile
										</span>
										<a
											href="/onboard"
											className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 underline hover:text-blue-800"
										>
											Click to see your user details, notification settings, and
											watchlist
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center px-5">
									<HistoryIcon style={{ fontSize: '39px' }} className="mr-2" />
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left">
											Bid History
										</span>
										<a
											href="/onboard"
											className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 underline hover:text-blue-800"
										>
											Click to see your current and past bids
										</a>
									</div>
								</div>
							</div>
						</div>
						<hr className="border-solid border border-black border-opacity-30 my-4" />
						<div className="flex flex-row justify-center my-4">
							<div>
								<div className="flex flex-col items-center">
									<LogOutButton onClick={handleLogOut} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
