import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import TodayIcon from '@mui/icons-material/Today';
import SellIcon from '@mui/icons-material/Sell';
import AddToListButton from '../buttons/AddToListButton';
import ViewModelButton from '../buttons/ViewModelButton';
import QuickViewButton from '../buttons/QuickViewButton';
import { formatShortDate } from '../../utils/dateTime';

export default function VehicleItemCard({
	description,
	modelNumber,
	type,
	brand,
	saleDate,
	price,
	imageUrl,
}) {
	return (
		<div className="flex w-[550px] h-[189px] rounded-2xl shadow-2xl m-5 overflow-hidden relative">
			<div className="w-1/3">
				<img
					className="w-full h-full object-cover"
					src={imageUrl}
					alt={description}
				/>
				<QuickViewButton />
			</div>
			<div className="w-2/3 flex">
				<div className="w-3/4 mx-9 my-5">
					<div className="font-bold text-s mb-2 tracking-wide">
						{description}
					</div>
					<div className="flex flex-col text-gray-700 text-base text-xxs">
						<div className="flex flex-row justify-between">
							<div>
								<div className="flex flex-row items-center">
									<ContentPasteIcon
										style={{ fontSize: '13px' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Model</span>
										<span>{modelNumber}</span>
									</div>
								</div>
								<div className="flex flex-row items-center">
									<DirectionsBusFilledIcon
										style={{ fontSize: '13px' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Type</span>
										<span>{type}</span>
									</div>
								</div>
							</div>
							<div>
								<div className="flex flex-row items-center">
									<SellIcon style={{ fontSize: '13px' }} className="mr-2" />
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Brand</span>
										<span>{brand}</span>
									</div>
								</div>
								<div className="flex flex-row items-center">
									<TodayIcon style={{ fontSize: '13px' }} className="mr-2" />
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Sale Date</span>
										<span>{formatShortDate(saleDate)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[35%] my-7 mr-5 flex flex-col items-center justify-between">
					<span className="text-xxs text-gray-700">Current bid</span>
					<span className="font-medium text-l">{`₱${price}}`}</span>
					<ViewModelButton />
					<span className="text-xxs text-gray-700">or</span>
					<AddToListButton />
				</div>
			</div>
		</div>
	);
}
