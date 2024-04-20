import React from 'react';

export default function RegisterInputField({
	placeholder,
	type,
	value,
	onChange,
}) {
	return (
		<input
			placeholder={placeholder}
			type={type}
			className="border-solid rounded-[10px] border-[2px] border-border-dark-grey pt-[9px] pl-[21px] pb-[10px] text-base font-medium focus:outline-none w-full h-[43px] placeholder:text-onboarding-placeholder text-mv-black"
			value={value}
			onChange={onChange}
		/>
	);
}
