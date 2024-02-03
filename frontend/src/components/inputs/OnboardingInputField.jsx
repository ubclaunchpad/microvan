import React from 'react';

export default function OnboardingInputField({ placeholder, className, type, value, onChange }) {
	return (
		<input
			placeholder={placeholder}
			type={type}
			className={`border-solid rounded-[10px] border-[1px] border-dark-grey pt-[15px] pl-[21px] pb-[11px] text-xl font-normal focus:outline-none ${className}`}
			value={value}
			onChange={onChange}
		/>
	);
}
