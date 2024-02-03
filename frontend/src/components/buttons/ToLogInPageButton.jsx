import React from 'react';
import { useNavigate } from 'react-router';

export default function ToLogInPageButton() {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="flex flex-shrink-0 items-center justify-center bg-transparent border-solid border-mv-white border-2 w-[234px] h-[49px] rounded-[10px]"
			onClick={() => navigate('/login')}
		>
			<div className="text-mv-white text-base font-medium">Log In</div>
		</button>
	);
}
