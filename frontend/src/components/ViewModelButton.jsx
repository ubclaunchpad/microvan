import React from 'react';

export default function ViewModelButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green border-solid border-mv-green rounded-[5px] w-full h-[30px]"
			onClick={onClick}
		>
			<div className="text-mv-white text-xxs font-medium">View Model</div>
		</button>
	);
}
