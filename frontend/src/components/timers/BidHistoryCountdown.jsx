import React, { useState, useEffect } from 'react';
import {
	formatTime,
	calculateProgress,
	formatFlexibleDateRange,
} from '../../utils/dateTime';

// expects type Date for startDateTime and endDateTime props, recommended maxWidth around 300px
export default function BidHistoryCountdown({
	maxWidth = '60%',
	startDate,
	endDate,
	startTime = '00:00:00',
	endTime = '23:59:00',
}) {
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [isExpired, setIsExpired] = useState(false);

	const startDateTimeString = `${startDate?.split('T')[0]}T${startTime}+08:00`;
	const endDateTimeString = `${endDate?.split('T')[0]}T${endTime}+08:00`;
	const startDateTime = new Date(startDateTimeString);
	const endDateTime = new Date(endDateTimeString);

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			const endTimeMs = endDateTime.getTime();
			const remaining = Math.max(0, endTimeMs - now.getTime());
			setTimeRemaining(remaining);
			setIsExpired(now >= endDateTime);
		}, 1000);

		return () => clearInterval(timer);
	}, [startDate, startTime, endDate, endTime]);

	let statusString = `${formatFlexibleDateRange(
		startDateTime,
		endDateTime
	)} | ${formatTime(timeRemaining)}`;
	if (isExpired) {
		statusString = 'Auction has ended';
	}

	return (
		<div className="float-right text-right" style={{ width: maxWidth }}>
			<div className="mb-2 text-mv-black text-lg font-medium">
				{statusString}
			</div>
			<div
				className="h-[14px] bg-progress-bar rounded-lg overflow-hidden"
				style={{ width: maxWidth, float: 'right' }}
			>
				<div
					className="h-full bg-mv-green rounded-lg"
					style={{
						width: isExpired
							? '0%'
							: `${calculateProgress(
									endDateTime,
									startDateTime,
									timeRemaining
							  )}%`,
						float: 'right',
					}}
				/>
			</div>
		</div>
	);
}
