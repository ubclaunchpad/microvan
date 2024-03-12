import React, { useState } from 'react';

export default function ImageSlideshow({ images }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [hoveredThumbnail, setHoveredThumbnail] = useState(null);
	const numImagesToShow = 4;

	const handleThumbnailHover = (index) => {
		setHoveredThumbnail(index);
	};

	const handleThumbnailLeave = () => {
		setHoveredThumbnail(null);
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const handleThumbnailClick = (index) => {
		setCurrentImageIndex(index);
	};

	return (
		<div className="relative aspect-w-1 aspect-h-1" style={{ width: 360 }}>
			<div className="flex justify-between h-auto">
				<img
					src={images[currentImageIndex]}
					alt={`Slideshow ${currentImageIndex}`}
					className="w-auto h-auto object-cover"
				/>
				<button
					type="button"
					aria-label="Previous Image"
					className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-mv-white rounded-full p-3 shadow-xl"
					onClick={handlePrevImage}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-mv-black"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					type="button"
					aria-label="Next Image"
					className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-mv-white rounded-full p-3 shadow-xl"
					onClick={handleNextImage}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-mv-black"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
			<div className="flex justify-between mt-4">
				{images.slice(0, numImagesToShow).map((image, index) => (
					<button
						type="button"
						className="w-20 h-20 relative mr-2 ml-2 cursor-pointer p-0"
						onClick={() => handleThumbnailClick(index)}
						onMouseEnter={() => handleThumbnailHover(index)}
						onMouseLeave={handleThumbnailLeave}
						style={{
							opacity: hoveredThumbnail === index ? 0.8 : 0.5,
						}}
					>
						<img
							src={image}
							alt={`Thumbnail ${index}`}
							className="absolute inset-0 w-full h-full object-cover"
							draggable="false"
						/>
					</button>
				))}
			</div>
		</div>
	);
}
