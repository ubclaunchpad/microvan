import React from 'react';

export default function EditProfileButton({ onClick }) {
	return (
		<button
			type="button"
			className="flex items-center justify-center rounded-[10px] border-solid border-[2px] border-mv-black py-2.5 px-[68.5px]"
			onClick={onClick}
		>
			<p className="text-mv-black font-medium text-sm">Edit profile</p>
		</button>
	);
}
