import React from 'react';
import { useNavigate } from 'react-router';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import ViewModelButton from '../buttons/ViewModelButton';
import { priceToString } from '../../utils/priceUtil';

export default function WonItemCard({
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
			</div>
			<div className="w-2/3 flex pl-[58px] pt-[39px] pb-[44.5px] pr-[45px]">
				<div className="w-[70%] flex flex-col gap-y-[23px]">
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

					<div className="inline-flex flex-row text-mv-black text-base">
						<div className="flex flex-col gap-y-[23px] items-start">
							<div className="flex flex-row items-center justify-start gap-x-[19px]">
								<DirectionsBusIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Model</p>
									<p className="font-normal">{modelNumber}</p>
								</div>
							</div>

							<div className="flex flex-row items-center justify-start gap-x-[19px]">
								<AgricultureIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Chassis</p>
									<p className="font-normal">{chassisNumber}</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-y-[23px] items-start">
							<div className="flex flex-row items-center justify-start gap-x-[19px]">
								<StarsOutlinedIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Engine no.</p>
									<p className="font-normal">{engineNumber}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[30%] flex flex-col items-center justify-between gap-y-[13px]">
					<div className="w-full flex flex-col items-center justify-center gap-y-[12px]">
						<span>
							<p className="text-mv-black text-base font-normal leading-5 tracking-[0.1px]">
								Your bid
							</p>
						</span>
						<span className="mb-[5px]">
							<p className="text-mv-black text-[28px] font-medium leading-5 tracking-[0.1px]">{`₱${priceToString(
								price
							)}`}</p>
						</span>
					</div>
					<ViewModelButton onClick={handleViewClick} />
				</div>
			</div>
		</div>
	);
}
