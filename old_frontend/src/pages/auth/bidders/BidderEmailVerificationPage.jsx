import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/microvan_logo.svg';
import ViewAuctionButton from '../../../components/buttons/ViewAuctionButton';

export default function BidderRegisterPage() {
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
						CHECK YOUR EMAIL!
					</h1>
				</div>
				<p className="text-mv-black text-xl font-normal">
					Thank you for registering with Microvan Inc. Virtual Auctions!
					<br />
					<br />
					To complete your registration and fully activate your account,
					it&apos;s essential that you verify your email address. Please check
					your email inbox (and the spam/junk folder, just in case) for our
					verification email. Click the link provided in the email to verify
					your email address.
					<br />
					<br />
					Note that <b>before participating in any auction</b>, you must upload{' '}
					<b>proof of a deposit amounting to ₱100,000</b>. Once your deposit is
					received and approved by a member of our staff, you will be notified
					via email and within our website, confirming your eligibility to
					participate in auctions.
					<br />
					<br />
					In the meantime, feel free to take a look at our auctions.
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
