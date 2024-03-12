import React, { useState, useEffect } from 'react';
import { formatTime, calculateProgress } from '../../utils/dateTime';

// expects type Date for startDateTime and endDateTime props, recommended maxWidth around 300px
export default function CurrentAuctionCountdown({
	maxWidth = '60%',
	startDateTime,
	endDateTime,
}) {
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [isExpired, setIsExpired] = useState(false);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			const now = Date.now();
			if (now < startDateTime.getTime()) {
				setIsActive(false);
			} else {
				setIsActive(true);
			}
			const endTimeMs = endDateTime.getTime();
			const remaining = Math.max(0, endTimeMs - now);
			setTimeRemaining(remaining);
			setIsExpired(now >= endTimeMs);
		}, 1000);

		return () => clearInterval(timer);
	}, [startDateTime, endDateTime]);

	let statusString = formatTime(timeRemaining);
	if (!isActive) {
		statusString = 'Auction has not started';
	} else if (isExpired) {
		statusString = 'Auction has ended';
	}

	return (
		<div className="float-right text-right" style={{ width: maxWidth }}>
			<div className="mb-2 text-mv-black text-xl font-medium">
				{statusString}
			</div>
			<div
				className="h-[11px] bg-progress-bar rounded-lg overflow-hidden"
				style={{ width: maxWidth, float: 'right' }}
			>
				<div
					className="h-full bg-mv-green rounded-lg"
					style={{
						width:
							!isActive || isExpired
								? '0px'
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
