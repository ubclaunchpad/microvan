import React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Check from '@mui/icons-material/Check';

export default function NotificationPopUpCard() {
	return (
		<div className="flex w-[362px] h-[600px] rounded-2xl shadow-2xl m-5 overflow-hidden relative bg-mv-white">
			<div className="w-full flex">
				<div className="w-full px-9 py-7">
					<div className="flex flex-col text-gray-700 text-base text-xxs">
						<div className="flex flex-row justify-center">
							<div>
								<div className="flex flex-col items-left">
									<div className="flex flex-col justify-left">
										<span className="font-poppins text-xl font-semibold leading-10 text-left bg-gray-600 color-mv-black">
											Notifications
										</span>
									</div>
								</div>
							</div>
						</div>
						<hr className="border-solid border border-black border-opacity-30 my-4" />
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<EmojiEventsIcon
										style={{ fontSize: '39px', color: 'mv-green' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left overflow-hidden whitespace-nowrap">
											You won X vehicles!
										</span>
										<a
											href="/onboard"
											className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 underline hover:text-blue-800"
										>
											View your bid summary
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<WatchLaterIcon
										style={{ fontSize: '39px', color: 'mv-green' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left">
											Auction has ended
										</span>
										<a
											href="/onboard"
											className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 underline hover:text-blue-80 overflow-hidden whitespace-nowrap"
										>
											View your auction summary
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<AccessTimeIcon
										style={{ fontSize: '39px' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left overflow-hidden whitespace-nowrap">
											1 hour left until auction ends
										</span>
										<text className="font-poppins text-xs font-normal leading-5 text-left text-blue-600">
											Put in your bids by 21:59!
										</text>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<HistoryIcon style={{ fontSize: '39px' }} className="mr-2" />
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left">
											You have been outbid
										</span>
										<a
											href="/onboard"
											className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 underline hover:text-blue-800"
										>
											Revisit [vehicle name]
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<Check style={{ fontSize: '39px' }} className="mr-2" />
									<div className="flex flex-col justify-between px-6 py-4">
										<span className="font-poppins text-base font-medium leading-6 text-left overflow-hidden whitespace-nowrap">
											You have been verified
										</span>
										<text className="font-poppins text-xs font-normal leading-5 text-left text-blue-600 overflow-hidden whitespace-nowrap">
											You are now registered to make bids
										</text>
									</div>
								</div>
							</div>
						</div>
						<hr className="border-solid border border-black border-opacity-30 my-4" />
						<div className="flex flex-row justify-center my-4">
							<div>
								<div className="flex flex-col items-center">
									<a
										href="/onboard"
										className="font-poppins text-xs font-medium leading-5 text-left text-blue-600 hover:text-blue-800 border-2 border-gray-500 rounded-md px-9 py-2"
									>
										Notification settings
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
