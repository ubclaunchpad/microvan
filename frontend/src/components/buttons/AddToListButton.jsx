import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddToListButton({ onClick, size = 'sm' }) {
	return (
		<button
			type="button"
			className={`bg-mv-white border-mv-green border-solid border rounded-[5px] shadow-searchBarShadow w-full flex items-center justify-center ${
				size === 'sm' ? 'px-5 py-3' : 'px-[64.5px] py-4'
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center">
				<AddIcon
					className={`text-mv-black ${
						size === 'sm' ? 'w-[20px] h-[20px]' : 'w-[24px] h-[24px]'
					}`}
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
