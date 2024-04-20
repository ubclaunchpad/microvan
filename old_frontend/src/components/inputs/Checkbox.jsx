import React from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function Checkbox({ checked, onChange }) {
	return (
		<div
			className="w-[25px] h-[25px] hover:cursor-pointer border border-solid border-mv-black bg-mv-grey items-center justify-center"
			onClick={onChange}
		>
			<CheckOutlinedIcon
				sx={{ fontSize: 25, visibility: checked ? 'visible' : 'hidden' }}
				className="text-mv-black"
			/>
		</div>
	);
}
