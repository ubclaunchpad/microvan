import React from 'react';

export default function RegisterButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-transparent border-solid border-2 border-mv-green rounded-[10px] w-full h-[50px] items-center justify-center"
			onClick={onClick}
		>
			<div className="text-mv-green text-xl font-normal">Register</div>
		</button>
	);
}
