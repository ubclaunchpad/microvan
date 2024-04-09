import React from 'react';
import { useNavigate } from 'react-router';

export default function RegisterForAuctionButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/register/auction');
	};

	return (
		<button
			type="button"
			className="bg-mv-green rounded-[10px] inline-flex px-[36.5px] py-[25px] flex-start shrink-0 items-center justify-center h-[74px]"
			onClick={handleClick}
		>
			<div className="text-mv-white text-sm font-medium">
				Register for Auction
			</div>
		</button>
	);
}
