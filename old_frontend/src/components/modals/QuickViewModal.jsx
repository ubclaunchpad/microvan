import React, { useEffect } from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { useNavigate } from 'react-router-dom';
import ImageSlideshow from '../imageSlideshows/ImageSlideshow';
import truck from '../../assets/truck.png';
import truck2 from '../../assets/truck2.png';
import truck3 from '../../assets/truck3.png';
import truck4 from '../../assets/truck4.png';
import truck5 from '../../assets/truck5.png';
import ViewModelButton from '../buttons/ViewModelButton';
import CloseButton from '../buttons/CloseButton';
import { priceToString } from '../../utils/priceUtil';

export default function QuickViewModal({
	isOpen,
	onClose,
	id,
	description,
	modelNumber,
	chassisNumber,
	engineNumber,
	price,
}) {
	if (!isOpen) return null;

	const navigate = useNavigate();

	const handleOutsideClick = (e) => {
		if (e.target.id === 'modal-overlay') {
			onClose();
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
				className="bg-mv-white h-[615px] max-w-[1000px] w-[70%] flex py-[55px] px-[45px] rounded-[20px]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex w-[50%] mr-[35px]">
					<ImageSlideshow images={[truck, truck2, truck3, truck4, truck5]} />
				</div>
				<div className="flex flex-col items-start w-[47%]">
					<h3
						className="text-mv-black text-xl font-semibold leading-[28px]"
						style={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{description}
					</h3>

					<div className="flex text-mv-black text-base mt-[20px]">
						<div className="flex flex-col items-start gap-y-[23px]">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<DirectionsBusIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Model</p>
									<p className="font-normal">{modelNumber}</p>
								</div>
							</div>
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<AgricultureIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Chassis</p>
									<p className="font-normal">{chassisNumber}</p>
								</div>
							</div>
						</div>
						<div className="inline-flex flex-col items-start">
							<div className="flex flex-row items-center justify-center gap-x-[19px]">
								<StarsOutlinedIcon
									className="text-dark-grey"
									sx={{ fontSize: 25 }}
								/>
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Engine no.</p>
									<p className="font-normal">{engineNumber}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col mt-[44px] w-[100%] pr-[36px]">
						<div className="flex w-[100%] justify-between items-center">
							<p className="text-mv-black text-base font-normal leading-[25px]">
								Bid status:
							</p>
							<p className="text-dark-grey text-right text-base font-normal leading-[25px]">
								You haven&apos;t bid
							</p>
						</div>

						<div className="flex w-[100%] justify-between items-center mt-[22px]">
							<p className="text-mv-black text-base font-normal leading-[25px]">
								Highest bid:
							</p>
							<p className="text-mv-black text-2xl text-right font-medium leading-[25px]">
								{`₱${priceToString(price)}`}
							</p>
						</div>
					</div>

					<div className="flex w-full items-center justify-center">
						<div className="flex flex-col items-center mt-[33px] gap-y-[15px]">
							<ViewModelButton
								onClick={() => {
									onClose();
									navigate(`/listings/${id}`);
								}}
								size="lg"
							/>
							<CloseButton onClick={onClose} size="lg" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
