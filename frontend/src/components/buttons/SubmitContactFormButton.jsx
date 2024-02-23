import React from 'react';

export default function SubmitContactFormButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green border-solid border-mv-green rounded-[5px] w-full h-[69px] shadow-buttonShadow"
			onClick={onClick}
		>
			<div className="text-mv-white font-poppins text-lg font-medium leading-20 tracking-tight text-center">Submit</div>
		</button>
	);
}