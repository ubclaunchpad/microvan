import React from 'react';

export default function PriceInputField({ value, onChange }) {
	return (
		<div className="rounded-[5px] bg-mv-white h-[40px] py-2 px-[7px] gap-x-1 flex">
			<p>₱</p>
			<input
				className="rounded-[5px] overflow-y-scroll focus:outline-none w-full text-mv-black text-base font-normal"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
