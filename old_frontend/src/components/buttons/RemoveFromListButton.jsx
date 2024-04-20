import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function RemoveFromListButton({ size, onClick }) {
	const sizeButtonClass = {
		sm: 'px-[8.6px] py-[12px]',
		lg: 'px-[51.11px] py-[21px]',
	};

	const sizeTextClass = {
		sm: 'text-[13px]',
		lg: 'text-lg',
	};

	return (
		<button
			type="button"
			className={`${sizeButtonClass[size]} w-full bg-mv-white flex gap-[4px] items-center justify-center rounded-[5px] border border-solid border-mv-green shadow-buttonShadow `}
			onClick={onClick}
		>
			<DeleteOutlinedIcon
				sx={{ fontSize: size === 'sm' ? 18 : 24 }}
				className="text-mv-black"
			/>
			<div
				className={`${sizeTextClass[size]} leading-5 tracking-[0.1px] font-medium text-mv-black`}
			>
				Remove from list
			</div>
		</button>
	);
}
