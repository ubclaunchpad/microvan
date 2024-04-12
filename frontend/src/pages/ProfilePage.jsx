import React, { useState, useEffect, useRef } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { Avatar } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NavBar from '../components/navBars/NavBar';
import { useUser } from '../providers/UserProvider';
import SaveChangesButton from '../components/buttons/SaveChangesButton';
import Checkbox from '../components/inputs/Checkbox';
import SortByDropdown from '../components/dropdowns/SortByDropdown';
import BiddedItemCard from '../components/cards/BiddedItemCard';
import vehicleImage from '../assets/truck.png';
import SavedItemCard from '../components/cards/SavedItemCard';
import EditProfileButton from '../components/buttons/EditProfileButton';

export default function ProfilePage() {
	const user = useUser();
	const [selectedTab, setSelectedTab] = useState('bidded');
	const [dividerWidth, setDividerWidth] = useState(0);
	const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
		useState(false);
	const [
		upcomingAuctionNotificationsEnabled,
		setUpcomingAuctionNotificationsEnabled,
	] = useState(false);
	const [promotionNotificationsEnabled, setPromotionNotificationsEnabled] =
		useState(false);
	const [dividerLeft, setDividerLeft] = useState(0);
	const biddedRef = useRef(null);
	const savedRef = useRef(null);
	const containerRef = useRef(null);

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

	useEffect(() => {
		const updateDividerMetrics = () => {
			let newLeft = 0;
			let newWidth = 0;
			if (
				selectedTab === 'bidded' &&
				biddedRef.current &&
				containerRef.current
			) {
				newWidth = biddedRef.current.offsetWidth;
				newLeft = biddedRef.current.offsetLeft;
			} else if (
				selectedTab === 'saved' &&
				savedRef.current &&
				containerRef.current
			) {
				newWidth = savedRef.current.offsetWidth;
				newLeft = savedRef.current.offsetLeft;
			}
			setDividerWidth(newWidth);
			setDividerLeft(newLeft);
		};

		updateDividerMetrics();
		window.addEventListener('resize', updateDividerMetrics);
		return () => window.removeEventListener('resize', updateDividerMetrics);
	}, [selectedTab]);

	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen items-center">
			<ScrollRestoration />
			<NavBar />

			<div className="w-[90%] flex mt-[43px] items-start gap-x-[52px] mb-[282px]">
				<div className="w-[22.5%] flex flex-col items-start">
					<div className="flex items-center gap-x-[16.5px] mb-[25px]">
						<Avatar sx={{ width: '93px', height: '93px' }} />
						<div className="flex flex-col gap-y-[10px]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Bidder Number
							</p>
							<p className="text-base text-mv-black font-normal leading-[120%]">
								{user?.['custom:bidder_number']
									? `#${user?.['custom:bidder_number']}`
									: 'N/A'}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-y-[17px] items-start w-full">
						<div className="flex flex-col gap-y-[5px] w-[80%]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Name
							</p>
							<input
								className=" rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-[120%] text-mv-black placeholder:text-dark-grey"
								placeholder={`${user?.given_name} ${user?.family_name}`}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[5px] w-[80%]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Email
							</p>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-[120%] text-mv-black placeholder:text-dark-grey"
								placeholder={user?.email}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[5px] w-[80%]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Phone Number
							</p>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-[120%] text-mv-black placeholder:text-dark-grey"
								placeholder={user?.phone_number}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[5px] w-[80%]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Company Name
							</p>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-[120%] text-mv-black placeholder:text-dark-grey"
								placeholder={user?.['custom:company_name']}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-y-[11.9px] w-[80%]">
							<p className="text-sm text-mv-black font-normal leading-[120%]">
								Company Address
							</p>
							<input
								className="rounded-[5px] bg-light-grey w-full px-5 py-[10.5px] items-center text-sm font-base leading-[120%] text-mv-black placeholder:text-dark-grey"
								placeholder={user?.['custom:company_address']}
								disabled
							/>
						</div>
					</div>
					<div className="mt-[25px]">
						<EditProfileButton onClick={() => {}} />
					</div>
					<div className="mt-[40px] w-full flex flex-col items-start">
						<h2 className="text-mv-black text-xl font-medium">
							Notification Settings
						</h2>
						<div className="mt-[20px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={emailNotificationsEnabled}
								onChange={() => setEmailNotificationsEnabled((prev) => !prev)}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Turn on email notifications
							</p>
						</div>
						<div className="mt-[23.5px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={upcomingAuctionNotificationsEnabled}
								onChange={() =>
									setUpcomingAuctionNotificationsEnabled((prev) => !prev)
								}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Get notified about <br />
								upcoming auctions
							</p>
						</div>
						<div className="mt-[19.25px] flex items-center justify-start gap-x-[20px]">
							<Checkbox
								checked={promotionNotificationsEnabled}
								onChange={() =>
									setPromotionNotificationsEnabled((prev) => !prev)
								}
							/>
							<p className="text-mv-black text-sm font-normal leading-[120%]">
								Receive promotional
								<br />
								emails and updates
							</p>
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
					<div ref={containerRef} className="flex mt-5 gap-x-8 relative pb-4">
						<div
							className={`hover:cursor-pointer ${
								selectedTab === 'bidded' ? 'text-mv-black' : 'text-dark-grey'
							}`}
							onClick={() => setSelectedTab('bidded')}
						>
							<h2 ref={biddedRef} className="text-xl font-medium">
								Bidded Items
							</h2>
						</div>
						<div
							className={`hover:cursor-pointer ${
								selectedTab === 'saved' ? 'text-mv-black' : 'text-dark-grey'
							}`}
							onClick={() => setSelectedTab('saved')}
						>
							<h2 ref={savedRef} className="text-xl font-medium">
								Saved Items
							</h2>
						</div>
						<div
							style={{ width: dividerWidth, left: dividerLeft }}
							className="absolute bottom-0 bg-mv-black h-[1px] transition-all duration-500"
						/>
					</div>
					{selectedTab === 'saved' ? (
						<div className="flex flex-col mt-[54px] gap-y-[35px]">
							<SavedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
							/>
							<SavedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
							/>
							<SavedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
							/>
						</div>
					) : (
						<div className="flex flex-col mt-[54px] gap-y-[35px]">
							<BiddedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
							/>
							<BiddedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
							/>
							<BiddedItemCard
								vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
								description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
								modelNumber="EXZ72J"
								engineNumber="12PD1-788448"
								chassisNumber="EXZ72J-3001184"
								price="210,000"
								imageUrl={vehicleImage}
								isTopBid
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
