import React from 'react';
import { useNavigate } from 'react-router';

export default function ToRegisterPageButton() {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="flex flex-shrink-0 items-center justify-center bg-mv-white w-[234px] h-[49px] rounded-[10px]"
			onClick={() => navigate('/register')}
		>
			<div className="text-mv-green text-base font-medium">Register</div>
		</button>
	);
}
