import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function RemoveFromListButton({ size, onClick }) {
	const sizeButtonClass = {
		small: 'w-[173px] h-[46px]',
		large: 'w-[285px] h-[66px]',
	};

	const sizeTextClass = {
		small: 'text-[14px]',
		large: 'text-[18px]',
	};

	return (
		<button
			type="button"
			className={`${sizeButtonClass[size]} whitespace-nowrap bg-mv-white px-[24px] py-[10px] flex gap-[5px] items-center justify-center rounded-[5px] border border-solid border-mv-green shadow-buttonShadow `}
			onClick={onClick}
		>
			<DeleteOutlinedIcon
				sx={{ fontSize: size === 'small' ? 20 : 24 }}
				className="text-mv-black"
			/>
			<div
				className={`${sizeTextClass[size]} leading-5 font-medium text-mv-black`}
			>
				Remove from list
			</div>
		</button>
	);
}
