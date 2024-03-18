import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NextSimilarVehicleButton({
	onClick,
	isDisabled = false,
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex py-2.5 px-3.5 gap-x-1 rounded-[50px] border border-solid items-center ${
				isDisabled
					? 'text-dark-grey border-dark-grey'
					: 'text-mv-button-dark-grey border-button-dark-grey'
			}`}
		>
			<p className="text-base font-normal">Next</p>
			<ArrowForwardIcon className="w-[20px] h-[20px]" />
		</button>
	);
}
