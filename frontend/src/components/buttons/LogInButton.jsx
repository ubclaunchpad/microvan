import React from 'react';

export default function LogInButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-white border-solid border-2 border-mv-green rounded-[10px] w-full h-[59px] items-center justify-center"
			onClick={onClick}
		>
			<div className="text-mv-green text-xl font-normal">Log In</div>
		</button>
	);
}
