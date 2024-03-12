import React from 'react';

export default function ViewModelButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green border-solid border-mv-green rounded-[5px] w-full shadow-searchBarShadow px-6 py-3 flex items-center justify-center gap-2.5"
			onClick={onClick}
		>
			<div className="text-mv-white text-sm font-medium">View model</div>
		</button>
	);
}
