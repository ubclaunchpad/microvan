import React from 'react';

export default function QuickViewButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-green rounded-full px-5 py-2 absolute top-20 mx-11"
			onClick={onClick}
		>
			<div className="text-mv-white text-xxs font-semibold">Quick view</div>
		</button>
	);
}
