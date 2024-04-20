import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PreviousSimilarVehicleButton({
	onClick,
	isDisabled = false,
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={`flex py-2.5 px-3.5 gap-x-1 rounded-[50px] border border-solid items-center ${
				isDisabled
					? 'text-dark-grey border-dark-grey'
					: 'text-mv-button-dark-grey border-button-dark-grey'
			}`}
		>
			<ArrowBackIcon sx={{ fontSize: 20 }} />
			<p className="text-base font-normal">Prev</p>
		</button>
	);
}
