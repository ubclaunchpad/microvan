const WEEKDAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

// used to calculate the width of the green progress bar
const calculateProgress = (endDateTime, startDateTime, timeRemaining) => {
	const totalDuration = endDateTime.getTime() - startDateTime.getTime();
	return (timeRemaining / totalDuration) * 100;
};

// returns the a string representation of the time left in the given auction
const formatTime = (milliseconds) => {
	const seconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	const hourText = hours === 1 ? 'hr' : 'hrs';
	const minsText = minutes === 1 ? 'min' : 'mins';
	const secsText = seconds === 1 ? 'sec' : 'secs';

	return `${hours} ${hourText} ${minutes} ${minsText} ${remainingSeconds} ${secsText}`;
};

// returns a short hand string of DateTime (e.g. Nov 4, 2023)
const formatShortDate = (date) => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
};

const formatDateAuctionCard = (date) =>
	date.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

// returns the remaining time from current time to endDate
function getTimeToEndDate(endDate) {
	// Philippines time is UTC+8
	const PHILIPPINES_TIME_OFFSET = 8;

	function pad(number) {
		return number < 10 ? `0${number}` : number;
	}

	const now = new Date();
	const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	const nowPhilippines = new Date(
		nowUtc.getTime() + PHILIPPINES_TIME_OFFSET * 60 * 60000
	);
	const endTime = new Date(endDate);
	const difference = endTime - nowPhilippines;

	if (difference < 0) {
		return '00d : 00h : 00m : 00s';
	}

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	const seconds = Math.floor((difference / 1000) % 60);

	return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}

function getCurrentDateInSingapore() {
	const now = new Date();

	// Convert to Singapore time by adding 8 hours to UTC (Singapore is UTC+8)
	const singaporeOffset = 8 * 60;
	const utcOffset = now.getTimezoneOffset();
	const singaporeTime = new Date(
		now.getTime() + (singaporeOffset + utcOffset) * 60000
	);

	singaporeTime.setHours(0, 0, 0, 0);

	return singaporeTime;
}

// Will print in the form "Monday, November 6"
function formatListingsTodayDate(date) {
	const weekday = WEEKDAYS[date.getDay()];
	const month = MONTHS[date.getMonth()];
	const day = date.getDate();

	return `${weekday}, ${month} ${day}`;
}

function formatFlexibleDateRange(startDate, endDate) {
	const startMonth = MONTHS[startDate.getMonth()];
	const startDay = startDate.getDate();
	const endMonth = MONTHS[endDate.getMonth()];
	const endDay = endDate.getDate();

	if (startDate.getMonth() === endDate.getMonth()) {
		return `${startMonth} ${startDay}-${endDay}`;
	}

	return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

function convertSGTToLocalDateObject(sgtTimeString) {
	const sgtOffset = 8 * 60;

	const now = new Date();
	const currentDate = now.toISOString().split('T')[0];

	const dateTimeString = `${currentDate}T${sgtTimeString}.000+08:00`;

	const dateInSGT = new Date(dateTimeString);

	const localTimeOffset = now.getTimezoneOffset();
	const totalOffset = sgtOffset + localTimeOffset;

	dateInSGT.setMinutes(dateInSGT.getMinutes() - totalOffset);

	return dateInSGT;
}

export {
	formatTime,
	calculateProgress,
	formatShortDate,
	formatDateAuctionCard,
	getTimeToEndDate,
	getCurrentDateInSingapore,
	formatListingsTodayDate,
	formatFlexibleDateRange,
	convertSGTToLocalDateObject,
};
