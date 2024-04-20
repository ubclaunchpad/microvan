import React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BidNowButton from '../buttons/BidNowButton';
import { priceToString } from '../../utils/priceUtil';

export default function BiddedItemCard({
	// eslint-disable-next-line no-unused-vars
	vehicleId,
	description,
	modelNumber,
	engineNumber,
	chassisNumber,
	price,
	imageUrl,
	isTopBid = false,
}) {
	return (
		<div className="flex w-full h-[294px] rounded-[18px] shadow-searchBarShadow">
			<div className="w-1/3 relative rounded-l-[18px]">
				<img
					className="w-full h-full rounded-l-[18px] object-cover object-center"
					src={imageUrl}
					alt={description}
				/>
			</div>
			<div className="w-2/3 flex pl-[44px] pt-[39px] pb-[26px] pr-[34px]">
				<div className="w-[70%] flex flex-col gap-y-[24px]">
					<div
						className="font-semibold text-lg text-mv-black tracking-[0.5px] leading-7"
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

					<div className="flex flex-col text-mv-black text-sm mr-[50px] gap-y-[21px]">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<DirectionsBusIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Model</p>
									<p className="font-normal">{modelNumber}</p>
								</div>
							</div>
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
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
						<div className="flex flex-row justify-between">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
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
					</div>
				</div>
				<div className="w-[34%] flex flex-col items-center">
					<p className="text-mv-black text-sm font-normal leading-5 tracking-[0.1px]">
						{isTopBid ? 'Your bid:' : 'Highest bid:'}
					</p>
					<p className="text-mv-black text-[26px] font-medium leading-5 tracking-[0.1px] mt-[12px]">{`₱${priceToString(
						price
					)}`}</p>
					{isTopBid ? (
						<div className="flex gap-x-[5px] mt-[38px]">
							<p className="text-mv-black text-lg font-semibold leading-[23px] tracking-[0.1px]">
								Top bid
							</p>
							<EmojiEventsIcon
								className="text-[#E2BE00]"
								sx={{ fontSize: 22 }}
							/>
						</div>
					) : (
						<p className="mt-[38px] text-mv-red text-lg font-semibold leading-[23px] tracking-[0.1px]">
							Outbid
						</p>
					)}
					<div className="mt-[35px] w-[100%]">
						<BidNowButton onClick={() => {}} size="sm" />
					</div>
				</div>
			</div>
		</div>
	);
}
