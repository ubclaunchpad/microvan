import React from 'react';

export default function BackButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-transparent border-solid border-2 border-mv-white rounded-[10px] w-full h-[50px] items-center justify-center"
			onClick={onClick}
		>
			<div className="text-mv-white text-xl font-normal">Back</div>
		</button>
	);
}
