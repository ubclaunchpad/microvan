import React from 'react';

export default function ContactUsButton({ onClick }) {
	return (
		<button
			type="button"
			className="h-[65px] px-[72.5px] py-[22px] rounded-[5px] border-solid border-2 border-mv-white bg-transparent items-center justify-center whitespace-nowrap"
			onClick={onClick}
		>
			<div className="text-sm font-medium text-mv-white">Contact Us</div>
		</button>
	);
}
