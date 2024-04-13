import React, { useState, useEffect } from 'react';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BidNowButton from '../buttons/BidNowButton';
import CancelButton from '../buttons/CancelButton';
import useAxios from '../../hooks/useAxios';

export default function BiddingModal({
	isOpen,
	onClose,
	auction,
	vehicle,
	minimumBid,
	onPriceUpdate,
}) {
	if (!isOpen) return null;
	const { fetchData } = useAxios();
	const increments = minimumBid > 100000 ? 5000 : 1000;
	const [bidAmount, setBidAmount] = useState(minimumBid + increments);

	const handleBidChange = (e) => {
		const inputValue = e.target.value.substring(1);

		if (Number.isNaN(inputValue)) {
			return;
		}

		const newBid = parseInt(inputValue, 10);

		if (Number.isNaN(newBid)) {
			return;
		}

		setBidAmount(newBid > 0 ? newBid : 0);
	};

	const handleOutsideClick = (e) => {
		if (e.target.id === 'modal-overlay') {
			onClose();
		}
	};

	const handleBidNow = async () => {
		const bidderId = 1;

		try {
			const response = await fetchData({
				method: 'POST',
				endpoint: '/v1/bids/',
				data: {
					amount: bidAmount,
					bidder_id: bidderId,
					auction_id: auction.id,
					auction_day_id: auction.auctionday_id,
					object_id: vehicle.id,
				},
			});
			if (response.status === 201) {
				onClose();
				onPriceUpdate(bidAmount);
			}
		} catch (error) {
			/* empty */
		}
	};

	useEffect(() => {
		window.addEventListener('click', handleOutsideClick);
		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div
			id="modal-overlay"
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
		>
			<div
				className="bg-mv-white h-[500px] w-[660px] flex flex-col pt-[46px] pb-[26px] rounded-[20px]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col flex-grow">
					<h2 className="text-2xl font-semibold text-center text-mv-black mb-[21px]">
						Please insert your bid amount
					</h2>
					<p className="text-base text-center font-medium text-mv-black tracking-[0.5px] leading-[35px] mb-[21px]">
						Enter your maximum possible bid
					</p>
					<div className="flex items-center justify-center gap-x-[15px]">
						<DoNotDisturbOnOutlinedIcon
							sx={{ fontSize: 38 }}
							className={
								bidAmount === minimumBid + increments
									? 'hover:cursor-default text-icon-grey'
									: 'hover:cursor-pointer text-mv-green'
							}
							onClick={() =>
								setBidAmount(
									Math.max(minimumBid + increments, bidAmount - increments)
								)
							}
						/>
						<input
							type="text"
							value={`₱${bidAmount}`}
							onChange={handleBidChange}
							className="text-center w-[250px] h-[65px] font-medium text-[28px] text-mv-black tracking-[0.5px] leading-[35px] focus:outline-none rounded-[15px] border border-solid border-dark-grey shadow-buttonShadow"
						/>
						<AddCircleOutlineOutlinedIcon
							sx={{ fontSize: 38 }}
							className="hover:cursor-pointer text-mv-green"
							onClick={() =>
								setBidAmount(
									Math.max(minimumBid + increments, bidAmount + increments)
								)
							}
						/>
					</div>
					<div className="flex items-center justify-center mt-[36px]">
						<div className="flex flex-col items-center gap-y-[17px]">
							<BidNowButton onClick={handleBidNow} size="md" />
							<CancelButton onClick={onClose} />
						</div>
					</div>
				</div>
				<p className="text-base text-center text-mv-black tracking-[0.5px] leading-[35px]">
					*All bids are binding and all sales are final
				</p>
			</div>
		</div>
	);
}
