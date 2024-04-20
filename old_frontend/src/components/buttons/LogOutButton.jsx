import React from 'react';

export default function LogOutButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-white w-full px-[24px] py-[10px] items-center justify-center rounded-[10px] border border-solid border-mid-grey"
			onClick={onClick}
		>
			<div className="text-mv-black text-sm font-medium">Log Out</div>
		</button>
	);
}
