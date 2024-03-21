import React from 'react';

export default function BidNowButton({ onClick, size = 'sm' }) {
	return (
		<button
			type="button"
			className={`bg-mv-green rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center ${
				size === 'sm' ? 'px-5 py-3' : 'px-[89px] py-[19px]'
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center">
				<p
					className={`text-mv-white font-medium leading-5 tracking-[0.1px] ${
						size === 'sm' ? 'text-sm' : 'text-lg'
					} `}
				>
					Bid now
				</p>
			</div>
		</button>
	);
}
