import React from 'react';

export default function BidNowButton({ size, onClick }) {
	const sizeButtonClass = {
		small: 'w-[173px] h-[46px]',
		large: 'w-[285px] h-[66px]',
	};

	const sizeTextClass = {
		small: 'text-[14px]',
		large: 'text-[18px]',
	};

	return (
		<button
			type="button"
			className={`${sizeButtonClass[size]} bg-mv-green px-[24px] py-[10px] flex gap-[5px] items-center justify-center rounded-[5px] border border-solid border-mv-green shadow-buttonShadow `}
			onClick={onClick}
		>
			<div
				className={`${sizeTextClass[size]} leading-5 font-medium text-mv-white`}
			>
				Bid Now
			</div>
		</button>
	);
}
