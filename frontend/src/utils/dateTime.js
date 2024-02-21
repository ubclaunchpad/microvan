// used to calculate the width of the green progress bar
const calculateProgress = (
	endDateTime,
	startDateTime,
	maxWidth,
	timeRemaining
) => {
	const totalDuration = endDateTime.getTime() - startDateTime.getTime();
	const elapsedTime = Math.max(0, totalDuration - timeRemaining);

	return maxWidth - (elapsedTime / totalDuration) * maxWidth;
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

export { formatTime, calculateProgress };
