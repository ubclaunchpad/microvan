import React from 'react';
import { useNavigate } from 'react-router';
import altLogo from '../assets/alt-microvan-logo.svg';
import ToRegisterPageButton from '../components/buttons/ToRegisterPageButton';
import ToLogInPageButton from '../components/buttons/ToLogInPageButton';

export default function OnboardPage() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-between min-h-screen min-w-screen bg-mv-green">
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

			<div className="flex flex-col items-center justify-center">
				<img
					src={altLogo}
					alt="logo"
					className="flex-shrink-0 w-[115px] h-[115px]"
				/>
				<h1 className="text-mv-white text-[50px] font-semibold">
					Microvan Inc.
				</h1>
				<h2 className="text-mv-white text-3xl font-normal">Virtual Auctions</h2>
				<p className="text-mv-white text-base font-normal mt-[36px]">
					Log in or register first to{' '}
					<span className="font-bold">start bidding at auctions!</span>
				</p>
				<div className="flex flex-col mt-[36px] mb-[18px] space-y-[25px]">
					<ToRegisterPageButton />
					<ToLogInPageButton />
				</div>
				<p className="text-mv-white text-xs font-normal hover:cursor-pointer">
					Log In As Admin
				</p>
			</div>

			<div className="flex-grow" />

			<div className="self-center pb-[24px]">
				<p className="text-mv-white text-lg font-normal">
					© Microvan Inc. 2024
				</p>
			</div>
		</div>
	);
}
