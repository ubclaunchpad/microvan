import React from 'react';

export default function StartBiddingButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green rounded-[10px] inline-flex px-[55px] py-[23.5px] flex-start shrink-0 items-center justify-center h-[74px]"
			onClick={onClick}
		>
			<div className="text-mv-white text-lg font-medium">Start Bidding!</div>
		</button>
	);
}
