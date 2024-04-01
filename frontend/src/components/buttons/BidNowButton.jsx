import React from 'react';

export default function BidNowButton({ onClick, size = 'sm' }) {
	const sizeButtonClass = {
		sm: 'px-5 py-3',
		md: 'px-[79px] py-5',
		lg: 'py-[19px]',
	};

	return (
		<button
			type="button"
			className={`bg-mv-green rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center ${sizeButtonClass[size]}`}
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
