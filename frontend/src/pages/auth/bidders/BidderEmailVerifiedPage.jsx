import React from 'react';
import { useNavigate } from 'react-router';
import logo from '../../../assets/microvan_logo.svg';
import ViewAuctionButton from '../../../components/buttons/ViewAuctionButton';

export default function BidderEmailVerifiedPage() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-between min-h-screen min-w-screen bg-mv-white">
			<div className="self-start pl-[29px] pt-[27px]">
				<button
					type="button"
					className="text-mv-white text-base font-medium"
					onClick={() => navigate('/')}
				>
					Home
				</button>
			</div>

			<div className="flex-grow" />

			<div className="flex flex-col w-[70%] items-center justify-center gap-y-[40px]">
				<div className="flex w-full items-center gap-x-[16px]">
					<img
						src={logo}
						alt="logo"
						className="flex-shrink-0 w-[70px] h-[70px]"
					/>
					<h1 className="text-mv-green text-[50px] font-normal">
						YOUR EMAIL HAS BEEN VERIFIED
					</h1>
				</div>
				<p className="text-mv-black text-xl font-normal">
					Your email has been successfully verified, and you&apos;re one step
					closer to participating in our exciting virtual auctions.
					<br />
					<br />
					As a reminder, in accordance with the guidelines provided during your
					registration, each participant must submit proof of a ₱100,000 deposit
					before engaging in any auction activities. This deposit is a
					prerequisite for bidding and ensures a secure and fair auction process
					for all our users.
					<br />
					<br />
					Upon submission, our team will review your deposit proof. You will be
					notified both via email and on our platform once your deposit has been
					validated, officially clearing you to participate in the auctions.
					<br />
					<br />
					Feel free to take a look at our auctions. If you have any questions or
					require assistance, our support team is here to help.
				</p>
				<div className="flex items-center justify-center w-[60%] mt-[34px]">
					<ViewAuctionButton />
				</div>
			</div>

			<div className="flex-grow" />

			<div className="self-center pb-[24px]">
				<p className="text-mv-green text-lg font-normal">
					© Microvan Inc. 2024
				</p>
			</div>
		</div>
	);
}
