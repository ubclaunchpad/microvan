import React from 'react';

export default function CancelButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-white border-mv-green border-solid border rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center whitespace-nowrap px-[79px] py-5"
			onClick={onClick}
		>
			<p className="text-mv-black font-medium leading-5 tracking-[0.1px] text-lg">
				Cancel
			</p>
		</button>
	);
}
