import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddToListButton({ onClick, size = 'sm' }) {
	return (
		<button
			type="button"
			className={`bg-mv-white border-mv-green border-solid border rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center whitespace-nowrap ${
				size === 'sm' ? 'px-[20px] py-[10px]' : 'px-[65px] py-[16px]'
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center gap-x-[5px]">
				<AddIcon
					sx={{ fontSize: size === 'sm' ? 20 : 24 }}
					className="text-mv-black"
				/>
				<p
					className={`text-mv-black font-medium leading-5 tracking-[0.1px] ${
						size === 'sm' ? 'text-sm' : 'text-lg'
					} `}
				>
					Add to List
				</p>
			</div>
		</button>
	);
}
