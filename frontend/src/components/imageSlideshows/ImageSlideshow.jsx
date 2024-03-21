import React, { useState, useRef, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function ImageSlideshow({ images }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const imageRefs = useRef([]);
	const ids = [0, 1, 2, 3, 4, 5];

	const handleImageClick = (index) => {
		setCurrentIndex(index);
	};

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
		<div className="flex flex-col w-full">
			<div className="relative">
				<img
					src={images[currentIndex]}
					alt={`Vehicle ${currentIndex + 1}`}
					className="w-full max-h-[440px] object-contain"
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
			<div className="flex w-full mt-[24px] gap-x-[20px] overflow-x-auto items-center">
				{images.map((image, index) => (
					<img
						ref={(el) => (imageRefs.current[index] = el)}
						key={ids[index]}
						src={image}
						alt={`Thumbnail ${index + 1}`}
						className={`w-1/4 max-h-[110px] object-contain cursor-pointer ${
							currentIndex === index
								? 'opacity-100'
								: 'opacity-50 hover:opacity-100'
						}`}
						onClick={() => handleImageClick(index)}
					/>
				))}
			</div>
		</div>
	);
}
