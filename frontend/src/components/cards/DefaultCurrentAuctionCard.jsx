import React from 'react';

export default function DefaultCurrentAuctionCard() {
	return (
		<div className="w-full px-[345px] pt-[233px] pb-[250px] flex items-center justify-center rounded-[20px] bg-mv-grey shadow-defaultAuctionCardShadow">
			<p className="text-mv-green text-xl font-normal text-center">
				There are no current auctions ongoing! Please check back in at a later
				date.
			</p>
		</div>
	);
}
