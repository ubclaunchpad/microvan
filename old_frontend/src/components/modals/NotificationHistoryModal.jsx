import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Check from '@mui/icons-material/Check';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';

export default function NotificationHistoryModal() {
	const navigate = useNavigate();

	const handleNotificationSettingsClick = () => {
		navigate('/profile#notification-settings');
	};

	return (
		<div
			className="flex bg-mv-white min-w-[362px] px-[31px] py-[28px] shadow-notificationModalShadow rounded-[10px] relative m-5"
			onClick={(event) => event.stopPropagation()}
		>
			<div className="w-full flex flex-col items-center gap-y-[20px]">
				<h1 className="text-mv-black text-xl font-medium">Notifications</h1>

				<div className="w-full flex flex-col items-start gap-y-[30px]">
					<hr className="border-solid border border-divider-grey w-full" />

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<EmojiEventsIcon
							style={{ fontSize: 24 }}
							className="text-mv-green"
						/>
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								Your statement is ready
							</h3>
							<p className="text-mv-black text-xs font-normal underline hover:cursor-pointer">
								View your statement of accounts
							</p>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<EmojiEventsIcon
							style={{ fontSize: 24 }}
							className="text-mv-green"
						/>
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								You won X vehicles!
							</h3>
							<p className="text-mv-black text-xs font-normal underline hover:cursor-pointer">
								View your bid summary
							</p>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<WatchLaterIcon
							style={{ fontSize: 24 }}
							className="text-mv-green"
						/>
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								Auction has ended
							</h3>
							<p className="text-mv-black text-xs font-normal underline hover:cursor-pointer">
								View your auction summary
							</p>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<AccessTimeIcon
							style={{ fontSize: 24 }}
							className="text-mv-green"
						/>
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								1 hour left until auction ends
							</h3>
							<p className="text-mv-black text-xs font-normal">
								Put in your bids by 21:59!
							</p>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<GavelOutlinedIcon
							style={{ fontSize: 24 }}
							className="text-mv-green"
						/>
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								You have been outbid
							</h3>
							<p className="text-mv-black text-xs font-normal underline hover:cursor-pointer">
								Revisit [vehicle name]
							</p>
						</div>
					</div>

					<div className="w-full flex items-center justify-start gap-x-[21px]">
						<Check style={{ fontSize: 24 }} className="text-mv-green" />
						<div className="flex flex-col items-start gap-y-[3px]">
							<h3 className="text-mv-black text-base font-medium">
								You have been verified
							</h3>
							<p className="text-mv-black text-xs font-normal underline hover:cursor-pointer">
								You are now registered to make bids
							</p>
						</div>
					</div>

					<hr className="border-solid border border-divider-grey w-full" />
				</div>

				<button
					type="button"
					onClick={handleNotificationSettingsClick}
					className="w-full border border-solid border-mid-grey bg-mv-white py-[10px] px-[24px] items-center justify-center rounded-[10px] text-mv-black text-sm font-medium"
				>
					Notification settings
				</button>
			</div>
		</div>
	);
}
