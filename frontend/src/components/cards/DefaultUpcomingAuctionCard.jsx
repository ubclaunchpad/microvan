import React from 'react';

export default function DefaultUpcomingAuctionCard() {
	return (
		<div className="w-[315px] px-[62px] pt-[166px] pb-[178px] flex items-center justify-center rounded-[20px] bg-mv-grey shadow-defaultAuctionCardShadow">
			<p className="text-sm font-medium text-mv-green text-center">
				There are no upcoming auctions planned just yet. Please check back in at
				a later date.
			</p>
		</div>
	);
}
