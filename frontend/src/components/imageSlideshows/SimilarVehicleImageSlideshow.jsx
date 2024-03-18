import React, { useState, useRef, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function SimilarVehicleImageSlideshow({ images }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const imageRefs = useRef([]);

	const goToNextImage = () => {
		if (currentIndex < images.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const goToPrevImage = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	useEffect(() => {
		if (imageRefs.current[currentIndex]) {
			imageRefs.current[currentIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start',
			});
		}
	}, [currentIndex]);

	return (
		<div className="flex flex-col w-full rounded-t-[20px]">
			<div className="relative">
				<img
					src={images[currentIndex]}
					alt={`Vehicle ${currentIndex + 1}`}
					className="w-full max-h-[285px] object-contain rounded-t-[20px]"
				/>
				{currentIndex < images.length - 1 && (
					<div
						onClick={goToNextImage}
						className="absolute top-1/2 right-[10px] transform -translate-y-1/2 border border-solid border-mv-white rounded-full p-2 hover:cursor-pointer"
					>
						<NavigateNextIcon className="text-mv-white w-[25px] h-[25px]" />
					</div>
				)}
				{currentIndex > 0 && (
					<div
						onClick={goToPrevImage}
						className="absolute top-1/2 left-[10px] transform -translate-y-1/2 border border-solid border-mv-white rounded-full p-2 hover:cursor-pointer"
					>
						<NavigateBeforeIcon className="text-mv-white w-[25px] h-[25px]" />
					</div>
				)}
			</div>
		</div>
	);
}
