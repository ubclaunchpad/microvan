import React from 'react';
import { useNavigate } from 'react-router';

export default function LogInJoinAuctionButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/onboard');
	};

	return (
		<button
			type="button"
			className="bg-mv-green rounded-[10px] flex w-full flex-start shrink-0 items-center justify-center h-full"
			onClick={handleClick}
		>
			<div className="text-mv-white text-base font-medium">
				Log in to Join Auction
			</div>
		</button>
	);
}
