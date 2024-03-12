import React from 'react';
import { useNavigate } from 'react-router';

export default function RegisterEarlyButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/register/auction');
	};

	return (
		<button
			type="button"
			className="bg-mv-green rounded-[10px] inline-flex px-[61px] py-[18px] flex-start shrink-0 items-center justify-center h-[60px]"
			onClick={handleClick}
		>
			<div className="text-mv-white text-base font-medium">Register Early</div>
		</button>
	);
}
