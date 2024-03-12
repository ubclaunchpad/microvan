import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddToListButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-mv-white border-mv-green border-solid border rounded-[5px] shadow-searchBarShadow w-full px-5 py-3 flex items-center justify-center"
			onClick={onClick}
		>
			<div className="flex items-center justify-center">
				<AddIcon className="w-[20px] h-[20px]" />
				<p className="text-mv-black text-sm font-medium leading-5 tracking-[0.1px]">Add to List</p>
			</div>
		</button>
	);
}
