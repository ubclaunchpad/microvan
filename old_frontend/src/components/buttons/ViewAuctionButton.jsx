import React from 'react';
import { useNavigate } from 'react-router';

export default function ViewAuctionButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<button
			type="button"
			className="bg-mv-white border-2 border-solid gap-[10px] border-mv-green rounded-[10px] inline-flex px-[94px] py-[17px] flex-start shrink-0 items-center justify-center h-[60px] w-full"
			onClick={handleClick}
		>
			<div className="text-mv-green text-xl font-normal">View Auction</div>
		</button>
	);
}
