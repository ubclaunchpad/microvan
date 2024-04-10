import React from 'react';

export default function ViewModelButton({ onClick, size = 'sm' }) {
	const buttonStyle = {
		sm: 'px-[29px] py-[12.5px]',
		lg: 'px-[76px] py-[15px]',
	};

	const textStyle = {
		sm: 'text-sm',
		lg: 'text-base',
	};

	return (
		<button
			type="button"
			className={`bg-mv-green border-solid border-mv-green rounded-[5px] shadow-searchBarShadow flex items-center justify-center gap-2.5 ${buttonStyle[size]}`}
			onClick={onClick}
		>
			<div className={`text-mv-white font-medium ${textStyle[size]}`}>
				View model
			</div>
		</button>
	);
}
