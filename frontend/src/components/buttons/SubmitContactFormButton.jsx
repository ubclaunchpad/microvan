import React from 'react';

export default function SubmitContactFormButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green border-solid border-mv-green rounded-[5px] h-[58px] px-[98px] py-[17px] shadow-buttonShadow whitespace-nowrap"
			onClick={onClick}
		>
			<div className="text-mv-white font-poppins text-base font-medium leading-20 tracking-tight text-center">
				Submit
			</div>
		</button>
	);
}
