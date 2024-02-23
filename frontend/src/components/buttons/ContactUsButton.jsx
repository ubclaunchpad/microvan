import React from 'react';

export default function ContactUsButton({ onClick }) {
	return (
		<button
			type="button"
			className="w-full h-[65px] py-[10px] px-6 rounded-[5px] border-solid border-2 border-mv-white bg-transparent items-center justify-center"
			onClick={onClick}
		>
			<div className="text-base font-medium text-mv-white">Contact Us</div>
		</button>
	);
}
