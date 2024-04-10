import React from 'react';

export default function CloseButton({ onClick, size = 'sm' }) {
	return (
		<button
			type="button"
			className={`bg-mv-white border-dark-grey border-solid border rounded-[5px] shadow-searchBarShadow flex items-center justify-center whitespace-nowrap ${
				size === 'sm' ? 'px-[20px] py-[10px]' : 'py-[15px] px-[101px]'
			}`}
			onClick={onClick}
		>
			<p
				className={`text-mv-black font-medium leading-5 ${
					size === 'sm' ? 'text-sm' : 'text-base'
				} `}
			>
				Close
			</p>
		</button>
	);
}
