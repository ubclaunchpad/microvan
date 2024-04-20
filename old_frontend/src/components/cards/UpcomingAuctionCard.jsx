import React from 'react';
import { formatDateAuctionCard } from '../../utils/dateTime';
import defaultImage from '../../assets/truck.png';
import UpcomingAuctionCountdown from '../timers/UpcomingAuctionCountdown';

export default function CurrentAuctionCard({
	imageUrls,
	startDate,
	endDate,
	numberOfTrucks,
	numberOfEquipment,
	numberOfTrailers,
	button,
}) {
	while (imageUrls.length < 4) {
		imageUrls.push(defaultImage);
	}

	const gridHeight = 452;
	const bottomHeightCard = 100;
	const joinAuctionButtonHeight = 72;

	const adjustedCenter =
		(gridHeight - bottomHeightCard) / 2 + bottomHeightCard / 2;
	const joinAuctionButtonTopOffset =
		adjustedCenter - joinAuctionButtonHeight / 2;

	return (
		<div
			className="w-full p-0 flex flex-col shrink-0 rounded-[20px] shadow-auctionCardShadow relative"
			style={{ height: `${gridHeight + bottomHeightCard}px` }}
		>
			<div
				className="grid grid-cols-2 grid-rows-2 w-full"
				style={{ height: `${gridHeight}px` }}
			>
				<div className="absolute top-[27px] right-[27px] z-10">
					<UpcomingAuctionCountdown endDate={startDate} />
				</div>

				<div
					className="absolute z-10 flex items-center justify-center w-full"
					style={{
						height: joinAuctionButtonHeight,
						top: `${joinAuctionButtonTopOffset}px`,
					}}
				>
					{button}
				</div>

				<div className="relative w-full h-full">
					<img
						src={defaultImage}
						alt="Vehicle 1"
						className="w-full h-full object-cover absolute rounded-tl-[20px]"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-35 backdrop-blur rounded-tl-[20px]" />
				</div>
				<div className="relative w-full h-full">
					<img
						src={imageUrls[1]}
						alt="Vehicle 2"
						className="w-full h-full object-cover absolute rounded-tr-[20px]"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-35 backdrop-blur rounded-tr-[20px]" />
				</div>
				<div className="relative w-full h-full">
					<img
						src={imageUrls[2]}
						alt="Vehicle 3"
						className="w-full h-full object-cover absolute"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-35 backdrop-blur" />
				</div>
				<div className="relative w-full h-full">
					<img
						src={imageUrls[3]}
						alt="Vehicle 4"
						className="w-full h-full object-cover absolute"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-35 backdrop-blur" />
				</div>
			</div>
			<div
				className="flex px-9 justify-between items-center w-full"
				style={{ height: `${bottomHeightCard}px` }}
			>
				<h3 className="text-mv-black text-2xl font-normal">
					{`${formatDateAuctionCard(startDate)} - ${formatDateAuctionCard(
						endDate
					)}`}
				</h3>
				<div className="text-right text-mv-black text-xs font-normal leading-relaxed">
					Featuring:
					<br />
					{numberOfTrucks > 0 && (
						<span>
							<b>{numberOfTrucks}</b> Truck{numberOfTrucks > 1 ? 's' : ''}
							<br />
						</span>
					)}
					{numberOfEquipment > 0 && (
						<span>
							<b>{numberOfEquipment}</b> Heavy Equipment
							{numberOfEquipment > 1 ? 's' : ''}
							<br />
						</span>
					)}
					{numberOfTrailers > 0 && (
						<span>
							<b>{numberOfTrailers}</b> Trailer{numberOfTrailers > 1 ? 's' : ''}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
