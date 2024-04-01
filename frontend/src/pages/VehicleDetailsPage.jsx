import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { useNavigate, useParams, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/navBars/NavBar';
import Footer from '../components/footers/Footer';
import VehicleDetailsCountdown from '../components/timers/VehicleDetailsCountdown';
import ImageSlideshow from '../components/imageSlideshows/ImageSlideshow';
import truck from '../assets/truck.png';
import truck2 from '../assets/truck2.png';
import truck3 from '../assets/truck3.png';
import truck4 from '../assets/truck4.png';
import truck5 from '../assets/truck5.png';
import AddToListButton from '../components/buttons/AddToListButton';
import BidNowButton from '../components/buttons/BidNowButton';
import NextSimilarVehicleButton from '../components/buttons/NextSimilarVehicleButton';
import PreviousSimilarVehicleButton from '../components/buttons/PreviousSimilarVehicleButton';
import SimilarVehicleCard from '../components/cards/SimilarVehicleCard';
import useAxios from '../hooks/useAxios';

export default function VehicleDetailsPage() {
	const navigate = useNavigate();
	const { fetchData } = useAxios();
	const [vehicle, setVehicle] = useState(null);

	const { vehicleId } = useParams();

	useEffect(() => {
		const fetchVehicleData = async () => {
			const response = await fetchData({
				endpoint: `/v1/vehicles/${vehicleId}`,
				method: 'GET',
			});

			setVehicle(response.data);
		};

		fetchVehicleData();
	}, [vehicleId]);

	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen justify-between">
			<ScrollRestoration />
			<NavBar />

			<div className="flex flex-col w-[85%] mx-auto">
				<div className="mt-[116px] flex justify-between items-start">
					<div
						onClick={() => navigate('/listings')}
						className="flex gap-x-2 items-center hover:cursor-pointer"
					>
						<NavigateBeforeIcon className="w-[24px] h-[24px] text-mv-black" />
						<p className="text-mv-black text-lg font-normal">
							Back to available items
						</p>
					</div>
					<VehicleDetailsCountdown
						maxWidth="70%"
						startDateTime={new Date()}
						endDateTime={new Date(2024, 2, 18, 19, 37)}
					/>
				</div>

				<div className="flex mt-[126px]">
					<div className="w-[45%] mr-[55px]">
						<ImageSlideshow images={[truck, truck2, truck3, truck4, truck5]} />
					</div>
					<div className="w-1/2 flex flex-col">
						<h1 className="text-mv-black text-2xl font-semibold leading-7 tracking-[0.5px]">
							{vehicle?.description}
						</h1>
						<div className="flex mt-[34px] items-center justify-start gap-x-[40px]">
							<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
								<DirectionsBusIcon className="text-dark-grey w-[25px] h-[25px]" />
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Model</p>
									<p className="font-normal">{vehicle?.model_number}</p>
								</div>
							</div>
							<div className="flex flex-row justify-between">
								<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
									<AgricultureIcon className="text-dark-grey w-[25px] h-[25px]" />
									<div className="flex flex-col leading-6 tracking-[0.5px]">
										<p className="font-medium">Chassis</p>
										<p className="font-normal">{vehicle?.chassis_number}</p>
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
								<StarsOutlinedIcon className="text-dark-grey w-[25px] h-[25px]" />
								<div className="flex flex-col leading-6 tracking-[0.5px]">
									<p className="font-medium">Engine no.</p>
									<p className="font-normal">{vehicle?.engine_number}</p>
								</div>
							</div>
						</div>
						<div className="mt-[43px] flex justify-between items-center">
							<p className="text-mv-black text-lg font-normal leading-6 tracking-[0.125px]">
								Bid status:
							</p>
							<p className="text-dark-grey text-lg font-medium leading-6 tracking-[0.125px]">
								You haven&apos;t bid
							</p>
						</div>
						<div className="mt-[22px] flex justify-between items-center">
							<p className="text-mv-black text-lg font-normal leading-6 tracking-[0.125px]">
								Current bid:
							</p>
							<p className="text-mv-black text-3xl font-medium leading-6 tracking-[0.125px]">
								₱210,000
							</p>
						</div>
						<div className="mt-[43px] w-full flex gap-x-[17px]">
							<div className="w-full">
								<AddToListButton onClick={() => {}} size="lg" />
							</div>
							<div className="w-full">
								<BidNowButton onClick={() => {}} size="large" />
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col mt-[126px]">
					<div className="flex justify-between items-center">
						<h2 className="text-mv-black text-xl font-semibold leading-[35px] tracking-[0.5px]">
							Similar vehicles
						</h2>
						<div className="flex gap-x-[8px]">
							<PreviousSimilarVehicleButton onClick={() => {}} isDisabled />
							<NextSimilarVehicleButton onClick={() => {}} />
						</div>
					</div>
					<div className="w-full flex gap-x-[22px] mt-[45px]">
						<SimilarVehicleCard />
						<SimilarVehicleCard />
						<SimilarVehicleCard />
					</div>
				</div>
			</div>

			<div className="mt-[116px]">
				<Footer />
			</div>
		</div>
	);
}
