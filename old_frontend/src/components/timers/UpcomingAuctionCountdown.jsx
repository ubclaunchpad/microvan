import React, { useState, useEffect } from 'react';
import { getTimeToEndDate } from '../../utils/dateTime';

export default function UpcomingAuctionCountdown({ endDate }) {
	const [countdown, setCountdown] = useState(getTimeToEndDate(endDate));

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown(getTimeToEndDate(endDate));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [endDate]);

	return (
		<div className="inline-flex h-[42px] px-[19px] py-[8.5px] rounded-[10px] bg-mv-white shrink-0 items-center justify-center shadow-upcomingAuctionCountdownShadow">
			<p className="text-mv-green text-xl font-normal">{countdown}</p>
		</div>
	);
}
