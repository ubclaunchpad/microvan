import React from 'react';
import { useNavigate } from 'react-router';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import AddToListButton from '../buttons/AddToListButton';
import ViewModelButton from '../buttons/ViewModelButton';
import QuickViewButton from '../buttons/QuickViewButton';

export default function VehicleItemCard({
	vehicleId,
	description,
	modelNumber,
	engineNumber,
	chassisNumber,
	price,
	imageUrl,
}) {
	const navigate = useNavigate();

	const handleViewClick = () => {
		navigate(`/listings/${vehicleId}`);
	};

	return (
		<div className="flex w-full h-[314px] rounded-[20px] shadow-searchBarShadow">
			<div className="w-1/3 relative rounded-l-[20px]">
				<img
					className="w-full h-full rounded-l-[20px] object-cover object-center"
					src={imageUrl}
					alt={description}
				/>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<QuickViewButton />
				</div>
			</div>
			<div className="w-2/3 flex pl-[46px] pt-[42px] pb-[30px] pr-[36px]">
				<div className="w-[70%] flex flex-col gap-y-[21px]">
					<div
						className="font-semibold text-xl text-mv-black tracking-[0.5px] leading-7"
						style={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{description}
					</div>

					<div className="flex flex-col text-mv-black text-base mr-[50px] gap-y-[20px]">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<DirectionsBusIcon className="text-dark-grey w-[25px] h-[25px]" />
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Model</p>
									<p className="font-normal">{modelNumber}</p>
								</div>
							</div>
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<StarsOutlinedIcon className="text-dark-grey w-[25px] h-[25px]" />
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Engine no.</p>
									<p className="font-normal">{engineNumber}</p>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<AgricultureIcon className="text-dark-grey w-[25px] h-[25px]" />
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Chassis</p>
									<p className="font-normal">{chassisNumber}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[30%] flex flex-col items-center justify-between gap-y-[13px]">
					<span>
						<p className="text-mv-black text-base font-normal leading-5 tracking-[0.1px]">
							Current bid
						</p>
					</span>
					<span className="mb-[5px]">
						<p className="text-mv-black text-[28px] font-medium leading-5 tracking-[0.1px]">{`₱${price}`}</p>
					</span>
					<ViewModelButton onClick={handleViewClick} />
					<span className="mb-[2px]">
						<p className="text-base text-mv-black font-medium leading-5 tracking-[0.1px]">
							or
						</p>
					</span>
					<AddToListButton />
				</div>
			</div>
		</div>
	);
}
