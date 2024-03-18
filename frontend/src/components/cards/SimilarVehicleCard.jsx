import React from 'react';
import truck from '../../assets/truck.png';
import truck2 from '../../assets/truck2.png';
import truck3 from '../../assets/truck3.png';
import truck4 from '../../assets/truck4.png';
import truck5 from '../../assets/truck5.png';
import SimilarVehicleImageSlideshow from '../imageSlideshows/SimilarVehicleImageSlideshow';
import AddToListButton from '../buttons/AddToListButton';
import ViewModelButton from '../buttons/ViewModelButton';

export default function SimilarVehicleCard() {
	return (
		<div className="flex flex-col w-full rounded-[20px] shadow-buttonShadow">
			<SimilarVehicleImageSlideshow
				images={[truck, truck2, truck3, truck4, truck5]}
			/>
			<div className="flex flex-col w-full h-1/2 px-[22px] mt-[23px] pb-[28px] grow">
				<h1 className="text-mv-black text-[15px] font-semibold leading-[25px]">
					VOLVO 6W Tractor Head W/ 8 SP. HI/LO T/M. W/ Windbreaker Projector
					Light 2003 air bag suspension
				</h1>
				<div className="w-full items-center justify-between text-mv-black flex mt-[16px]">
					<p className="text-sm font-base leading-5 tracking-[0.1px]">
						Current bid:
					</p>
					<p className="text-xl font-medium leading-5">₱78,000</p>
				</div>
				<div className="flex mt-[27px] gap-x-[25px]">
					<ViewModelButton onClick={() => {}} />
					<AddToListButton size="sm" onClick={() => {}} />
				</div>
			</div>
		</div>
	);
}
