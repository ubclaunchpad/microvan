import React from 'react';
import { useNavigate } from 'react-router';

export default function ViewAuctionButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/listings');
	};

	return (
		<button
			type="button"
			className="bg-mv-green rounded-[10px] inline-flex px-[63px] py-[25px] flex-start shrink-0 items-center justify-center h-[60px]"
			onClick={handleClick}
		>
			<div className="text-mv-white text-base font-medium">View Auction</div>
		</button>
	);
}
