import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/navBars/NavBar';
import Footer from '../components/footers/Footer';
import DownloadStatementOfAccountButton from '../components/buttons/DownloadStatementOfAccountButton';
import BidHistoryCountdown from '../components/timers/BidHistoryCountdown';
import WonItemCard from '../components/cards/WonItemCard';
import vehicleImage from '../assets/truck.png';
import { useCurrentAuction } from '../providers/CurrentAuctionProvider';

export default function BidHistoryPage() {
	const { currentAuction } = useCurrentAuction();

	const handleClickStatementOfAccount = () => {};

	const getExtendedDate = () => {
		if (currentAuction && currentAuction.end_date) {
			const endDate = new Date(currentAuction.end_date);
			endDate.setDate(endDate.getDate() + 14); // Adds 14 days to the end date
			return endDate.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		}
		return 'a future date';
	};

	return (
		<div className="flex flex-col min-w-screen max-w-screen min-h-screen overflow-x-hidden items-center">
			<ScrollRestoration />
			<NavBar />

			<div className="flex flex-col w-[80%]">
				<div className="flex items-center justify-between mt-[46px]">
					<div className="flex items-center gap-x-[63px]">
						<h1 className="text-mv-black text-xl font-semibold">Won Bids</h1>
						<DownloadStatementOfAccountButton
							onClick={handleClickStatementOfAccount}
						/>
					</div>
					<div className="w-[40%]">
						<BidHistoryCountdown
							maxWidth="100%"
							startDate={currentAuction?.start_date}
							endDate={currentAuction?.end_date}
							startTime={currentAuction?.start_time}
							endTime={currentAuction?.end_time}
						/>
					</div>
				</div>

				<p className="flex items-center justify-start mt-[33px] text-mv-black text-base font-normal">
					{`You have until ${getExtendedDate()}, to view and download your statement
					of account.`}
				</p>

				<hr className="w-full border-[2.5px] border-solid border-mid-grey opacity-30 mt-[27px] mb-[24px]" />

				<WonItemCard
					vehicleId="f98fd2df-1cf0-4f3d-a7b5-626a59d7779e"
					description="ISUZU 10W TRACTOR HEAD W/ HI / LOW 12 SP. T/M. SINGLE EYE 1995"
					modelNumber="EXZ72J"
					engineNumber="12PD1-788448"
					chassisNumber="EXZ72J-3001184"
					price="210,000"
					imageUrl={vehicleImage}
				/>
			</div>

			<div className="w-full items-center mt-[80px]">
				<Footer />
			</div>
		</div>
	);
}
