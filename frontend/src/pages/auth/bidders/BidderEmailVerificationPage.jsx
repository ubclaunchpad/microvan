import React from 'react';
import { useNavigate } from 'react-router';
import altlogo from '../../../assets/alt-microvan-logo.svg';

export default function BidderRegisterPage() {
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

			<div className="flex flex-col w-full items-center justify-center gap-y-[27px]">
				<div className="flex w-full items-center justify-center gap-x-[16px]">
					<img
						src={altlogo}
						alt="logo"
						className="flex-shrink-0 w-[70px] h-[70px]"
					/>
					<h1 className="text-mv-white text-[50px] font-normal">
						REGISTER AS A NEW BIDDER
					</h1>
				</div>
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
