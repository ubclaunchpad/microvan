import React from 'react';

export default function ReturnHomeButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center px-[59px] py-[10px]"
			onClick={onClick}
		>
			<div className="flex items-center justify-center">
				<p className="text-mv-white text-sm font-medium">Return home</p>
			</div>
		</button>
	);
}
