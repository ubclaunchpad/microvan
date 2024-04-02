import React, { useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { Avatar } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NavBar from '../components/navBars/NavBar';
import { useUser } from '../providers/UserProvider';
import SaveChangesButton from '../components/buttons/SaveChangesButton';
import Checkbox from '../components/inputs/Checkbox';
import SortByDropdown from '../components/dropdowns/SortByDropdown';

export default function ProfilePage() {
	const user = useUser();
	const [selectedTab, setSelectedTab] = useState('bidded');
	const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
		useState(false);
	const [
		upcomingAuctionNotificationsEnabled,
		setUpcomingAuctionNotificationsEnabled,
	] = useState(false);
	const [promotionNotificationsEnabled, setPromotionNotificationsEnabled] =
		useState(false);

	const sortByItems = [
		'Bid price',
		'Number of bids',
		'Last added',
		'Sale date',
		'Alphabetical',
	];

	const handleSortByChange = (item) => {
		// eslint-disable-next-line no-console
		console.log(item);
	};

	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen items-center">
			<ScrollRestoration />
			<NavBar />

			<div className="w-[90%] flex mt-[43.94px] items-start gap-x-[52px] mb-[282px]">
				<div className="w-[25%] flex flex-col items-start">
					<div className="flex items-start gap-x-[13px] mb-[30px]">
						<Avatar sx={{ width: '200px', height: '200px' }} />
						<EditOutlinedIcon
							sx={{ fontSize: 18 }}
							className="hover:cursor-pointer"
							onClick={() => {}}
						/>
					</div>
					<div className="flex flex-col gap-y-[19.1px] items-start w-full">
						<div className="flex flex-col gap-y-[10px]">
							<p className="text-sm text-mv-black font-normal leading-4">
								Bidder Number
							</p>
							<p className="text-base text-mv-black font-normal leading-4">
								{user?.['custom:bidder_number']
									? `#${user?.['custom:bidder_number']}`
									: 'N/A'}
							</p>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<div className="flex items-center gap-x-[8.8px]">
								<p className="text-sm text-mv-black font-normal leading-4">
									Name
								</p>
								<EditOutlinedIcon
									sx={{ fontSize: 18 }}
									className="hover:cursor-pointer"
									onClick={() => {}}
								/>
							</div>
							<input
								className=" rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-4 text-mv-black placeholder:text-dark-grey"
								placeholder={`${user?.given_name} ${user?.family_name}`}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<div className="flex items-center gap-x-[8.8px]">
								<p className="text-sm text-mv-black font-normal leading-4">
									Email
								</p>
								<EditOutlinedIcon
									sx={{ fontSize: 18 }}
									className="hover:cursor-pointer"
									onClick={() => {}}
								/>
							</div>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-4 text-mv-black placeholder:text-dark-grey"
								placeholder={user?.email}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<div className="flex items-center gap-x-[8.8px]">
								<p className="text-sm text-mv-black font-normal leading-4">
									Phone Number
								</p>
								<EditOutlinedIcon
									sx={{ fontSize: 18 }}
									className="hover:cursor-pointer"
									onClick={() => {}}
								/>
							</div>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-4 text-mv-black placeholder:text-dark-grey"
								placeholder={user?.phone_number}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<div className="flex items-center gap-x-[8.8px]">
								<p className="text-sm text-mv-black font-normal leading-4">
									Company Name
								</p>
								<EditOutlinedIcon
									sx={{ fontSize: 18 }}
									className="hover:cursor-pointer"
									onClick={() => {}}
								/>
							</div>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-4 text-mv-black placeholder:text-dark-grey"
								placeholder={user?.['custom:company_name']}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<div className="flex items-center gap-x-[8.8px]">
								<p className="text-sm text-mv-black font-normal leading-4">
									Company Address
								</p>
								<EditOutlinedIcon
									sx={{ fontSize: 18 }}
									className="hover:cursor-pointer"
									onClick={() => {}}
								/>
							</div>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-4 text-mv-black placeholder:text-dark-grey"
								placeholder={user?.['custom:company_address']}
								disabled
							/>
						</div>
					</div>
					<div className="mt-[20px]">
						<SaveChangesButton onClick={() => {}} />
					</div>
					<div className="mt-[70px] w-full flex flex-col items-start">
						<h2 className="text-mv-black text-xl font-medium">
							Notification Settings
						</h2>
						<div className="mt-[30px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={emailNotificationsEnabled}
								onChange={() => setEmailNotificationsEnabled((prev) => !prev)}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Turn on email notifications
							</p>
						</div>
						<div className="mt-[26px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={upcomingAuctionNotificationsEnabled}
								onChange={() =>
									setUpcomingAuctionNotificationsEnabled((prev) => !prev)
								}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Get notified about upcoming auctions
							</p>
						</div>
						<div className="mt-[26px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={promotionNotificationsEnabled}
								onChange={() =>
									setPromotionNotificationsEnabled((prev) => !prev)
								}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Receive promotional emails and updates
							</p>
						</div>
						<div className="mt-[30px]">
							<SaveChangesButton onClick={() => {}} />
						</div>
					</div>
				</div>
				<div className="flex-1 flex flex-col">
					<div className="flex justify-between">
						<h1 className="text-mv-black text-2xl font-semibold">Watchlist</h1>
						<SortByDropdown
							title="Sort by"
							items={sortByItems}
							onValueChange={handleSortByChange}
						/>
					</div>
					<div className="flex mt-[20px] gap-x-[30px]">
						<div
							className="hover:cursor-pointer"
							onClick={() => setSelectedTab('bidded')}
						>
							<h2
								className={`text-xl font-medium ${
									selectedTab === 'bidded' ? 'text-mv-black' : 'text-dark-grey'
								}`}
							>
								Bidded Items
							</h2>
							{selectedTab === 'bidded' && <hr className="w-full mt-[16px]" />}
						</div>
						<div
							className="hover:cursor-pointer"
							onClick={() => setSelectedTab('saved')}
						>
							<h2
								className={`text-xl font-medium ${
									selectedTab === 'saved' ? 'text-mv-black' : 'text-dark-grey'
								}`}
							>
								Saved Items
							</h2>
							{selectedTab === 'saved' && <hr className="w-full mt-[16px]" />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
