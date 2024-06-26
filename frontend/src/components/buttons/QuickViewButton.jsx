import React from 'react';

export default function QuickViewButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green rounded-[20px] px-[34px] py-[15px] flex justify-center items-center gap-2.5 shadow-searchBarShadow whitespace-nowrap"
			onClick={onClick}
		>
			<h3 className="text-mv-white text-sm leading-5 tracking-[0.1px] font-semibold">
				Quick view
			</h3>
		</button>
	);
}
