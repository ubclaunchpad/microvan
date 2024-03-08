import React from 'react';

export default function LogOutButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-white w-100% h-100% items-center justify-center"
			onClick={onClick}
		>
			<div className="font-poppins text-base font-medium leading-6 text-center">Log Out</div>
		</button>
	);
}