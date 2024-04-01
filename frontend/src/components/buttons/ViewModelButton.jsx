import React from 'react';

export default function ViewModelButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green border-solid border-mv-green rounded-[5px] w-full shadow-searchBarShadow px-[29px] py-[12.5px] flex items-center justify-center gap-2.5"
			onClick={onClick}
		>
			<div className="text-mv-white text-sm font-medium">View model</div>
		</button>
	);
}
