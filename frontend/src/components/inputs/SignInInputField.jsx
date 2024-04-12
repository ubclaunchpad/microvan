import React from 'react';

export default function SignInInputField({
	placeholder,
	type,
	value,
	onChange,
}) {
	return (
		<input
			placeholder={placeholder}
			type={type}
			className="border-solid rounded-[10px] border-[2px] border-border-dark-grey pt-[15px] pl-[21px] pb-[11px] text-base font-medium focus:outline-none w-full placeholder:text-onboarding-placeholder text-mv-black"
			value={value}
			onChange={onChange}
		/>
	);
}
