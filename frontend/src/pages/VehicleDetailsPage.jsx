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
import { convertSGTToLocalDateObject } from '../utils/dateTime';
import BiddingModal from '../components/modals/BiddingModal';

export default function VehicleDetailsPage() {
	const navigate = useNavigate();
	const { fetchData } = useAxios();
	const [auction, setAuction] = useState(null);
	const [vehicle, setVehicle] = useState(null);
	const [bidModalOpen, setBidModalOpen] = useState(false);

	const { vehicleId } = useParams();

	useEffect(() => {
		const fetchAuction = async () => {
			const response = await fetchData({
				endpoint: '/v1/auctions/current',
				method: 'GET',
			});
			setAuction(response.data);
		};
		fetchAuction();
	}, []);

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

	const startTime = convertSGTToLocalDateObject(auction?.start_time);
	const endTime = convertSGTToLocalDateObject(auction?.end_time);
	const currentDate = new Date();
	if (currentDate.getTime() > endTime.getTime()) {
		startTime.setDate(startTime.getDate() + 1);
		endTime.setDate(endTime.getDate() + 1);
	}
	const handlePriceUpdate = (newPrice) => {
		setVehicle(prevVehicle => ({
		  ...prevVehicle,
		  current_price: newPrice
		}));
	  };
	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen justify-between">
			<ScrollRestoration />
			<NavBar />

			<div className="flex flex-col w-[85%] mx-auto">
				<div className="mt-[46.3px] flex justify-between items-start">
					<div
						onClick={() => navigate('/listings')}
						className="flex gap-x-2 items-center hover:cursor-pointer"
					>
						<NavigateBeforeIcon
							className="text-mv-black"
							sx={{ fontSize: 24 }}
						/>
						<p className="text-mv-black text-lg font-normal">
							Back to available items
						</p>
					</div>
					<VehicleDetailsCountdown
						maxWidth="63%"
						startDateTime={startTime}
						endDateTime={endTime}
					/>
				</div>

				<div className="flex mt-[70px]">
					<div className="w-[47%] mr-[55px]">
						<ImageSlideshow images={[truck, truck2, truck3, truck4, truck5]} />
					</div>
					<div className="w-[50%] flex flex-col">
						<h1 className="text-mv-black text-2xl font-semibold leading-7 tracking-[0.5px]">
							{vehicle?.description}
						</h1>
						<div className="flex flex-col w-full pr-[12.88px]">
							<div className="flex mt-[34px] items-center justify-start gap-x-[40px]">
								<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
									<DirectionsBusIcon
										className="text-dark-grey"
										sx={{ fontSize: 25 }}
									/>
									<div className="flex flex-col leading-6 tracking-[0.5px]">
										<p className="font-medium">Model</p>
										<p className="font-normal">{vehicle?.model_number}</p>
									</div>
								</div>
								<div className="flex flex-row justify-between">
									<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
										<AgricultureIcon
											className="text-dark-grey"
											sx={{ fontSize: 25 }}
										/>
										<div className="flex flex-col leading-6 tracking-[0.5px]">
											<p className="font-medium">Chassis</p>
											<p className="font-normal">{vehicle?.chassis_number}</p>
										</div>
									</div>
								</div>
								<div className="flex flex-row items-center justify-center gap-x-[20px] text-mv-black">
									<StarsOutlinedIcon
										className="text-dark-grey"
										sx={{ fontSize: 25 }}
									/>
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
									{`₱${
										vehicle?.current_price === 0
											? vehicle?.starting_price
											: vehicle?.current_price
									}`}
								</p>
							</div>
							<div className="mt-[43px] w-full flex gap-x-[17px]">
								<div className="flex-1">
									<AddToListButton onClick={() => {}} size="lg" />
								</div>
								<div className="flex-1">
									<BidNowButton
										onClick={() => setBidModalOpen(true)}
										size="lg"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col mt-[77.31px]">
					<div className="flex justify-between items-center">
						<h2 className="text-mv-black text-xl font-semibold leading-[35px] tracking-[0.5px]">
							Similar vehicles
						</h2>
						<div className="flex gap-x-[8px]">
							<PreviousSimilarVehicleButton onClick={() => {}} isDisabled />
							<NextSimilarVehicleButton onClick={() => {}} />
						</div>
					</div>
					<div className="w-full flex gap-x-[22px] mt-[55px]">
						<SimilarVehicleCard />
						<SimilarVehicleCard />
						<SimilarVehicleCard />
					</div>
				</div>
			</div>
			{bidModalOpen && (
				<BiddingModal
					vehicle={vehicle}
					auction={auction}
					isOpen={bidModalOpen}
					onClose={() => setBidModalOpen(false)}
					minimumBid={vehicle.current_price}
					onPriceUpdate={handlePriceUpdate}
				/>
			)}

			<div className="mt-[73px]">
				<Footer />
			</div>
		</div>
	);
}
