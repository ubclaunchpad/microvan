import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddToListButton({ onClick }) {
	return (
		<button
			type="button"
			className="bg-transparent border-solid border-mv-green border rounded-[5px] w-full h-[30px]"
			onClick={onClick}
		>
			<div className="text-mv-black text-xxs font-medium">
				<AddIcon style={{ fontSize: '13px' }} className="mr-1" />
				Add to List
			</div>
		</button>
	);
}
