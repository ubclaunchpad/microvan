import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddToListButton({ size, onClick }) {
	const sizeButtonClass = {
		small: 'w-[173px] h-[46px]',
		large: 'w-[285px] h-[66px]',
	};

	const sizeTextClass = {
		small: 'text-[14px]',
		large: 'text-[18px]',
	};

	const sizeIconClass = {
		small: 'w-[20px] h-[20px]',
		large: 'w-[24px] h-[24px]',
	};

	return (
		<button
			type="button"
			className={`${sizeButtonClass[size]} bg-mv-white px-[24px] py-[10px] flex gap-[5px] items-center justify-center rounded-[5px] border border-solid border-mv-green shadow-buttonShadow `}
			onClick={onClick}
		>
			<AddIcon className={`${sizeIconClass[size]} text-mv-black`} />
			<div
				className={`${sizeTextClass[size]} leading-5 font-medium text-mv-black`}
			>
				Add to list
			</div>
		</button>
	);
}
