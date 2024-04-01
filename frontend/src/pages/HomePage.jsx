import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/navBars/NavBar';
import CoverImage from '../assets/cover-image.png';
import AboutMeImage from '../assets/about-me-logo.png';
import AuctionsSearchBar from '../components/searchBars/AuctionsSearchBar';
import CurrentAuctionCard from '../components/cards/CurrentAuctionCard';
import image from '../assets/truck.png';
import Footer from '../components/footers/Footer';
import UpcomingAuctionCard from '../components/cards/UpcomingAuctionCard';
import PastAuctionCard from '../components/cards/PastAuctionCard';
import LogInJoinAuctionButton from '../components/buttons/LogInJoinAuctionButton';
import RegisterEarlyButton from '../components/buttons/RegisterEarlyButton';
import RegisterForAuctionButton from '../components/buttons/RegisterForAuctionButton';
import DefaultUpcomingAuctionCard from '../components/cards/DefaultUpcomingAuctionCard';
import { useAuth } from '../providers/AuthProvider';
import useAxios from '../hooks/useAxios';
import sortAuctions from '../utils/auctionUtils';
import AwaitingApprovalButton from '../components/buttons/AwaitingApprovalButton';
import StartBiddingButton from '../components/buttons/StartBiddingButton';
import DefaultCurrentAuctionCard from '../components/cards/DefaultCurrentAuctionCard';
import { useUser } from '../providers/UserProvider';

export default function HomePage() {
	const user = useUser();
	// eslint-disable-next-line no-unused-vars
	const [searchedAuctions, setSearchedAuctions] = useState([]);
	const [currentAuctionList, setCurrentAuctionList] = useState([]);
	const [upcomingAuctionList, setUpcomingAuctionList] = useState([]);
	const [pastAuctionList, setPastAuctionList] = useState([]);
	const [currentVerified, setCurrentVerified] = useState(null);
	const { fetchData } = useAxios();
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchDataAsync() {
			try {
				const auctionsResponse = await fetchData({
					endpoint: '/v1/auctions',
					method: 'GET',
				});
				const auctionList = sortAuctions(auctionsResponse.data);

				if (user && auctionList.current.length > 0) {
					const response = await fetchData({
						endpoint: `/v1/auctions/${auctionList.current[0].id}/verification?bidder_id=${user.sub}`,
						method: 'GET',
					});

					setCurrentVerified(
						response.data.length > 0 ? response.data[0].is_verified : null
					);
					setUpcomingAuctionList(auctionList.upcoming);
					setCurrentAuctionList(auctionList.current);
					setPastAuctionList(auctionList.past);
				}
			} catch (error) {
				/* empty */
			}
		}

		fetchDataAsync();
	}, [isLoggedIn, user]);

	const handleStartBiddingButton = async () => {
		navigate('/listings');
	};

	let upcomingAuctionButton = <LogInJoinAuctionButton />;
	let currentAuctionButton = <LogInJoinAuctionButton />;
	if (isLoggedIn && currentVerified) {
		currentAuctionButton = (
			<StartBiddingButton onClick={handleStartBiddingButton} />
		);
	} else if (isLoggedIn && currentVerified === false) {
		currentAuctionButton = <AwaitingApprovalButton />;
	} else if (isLoggedIn && currentVerified === null) {
		upcomingAuctionButton = <RegisterEarlyButton />;
		currentAuctionButton = <RegisterForAuctionButton />;
	}

	return (
		<div className="min-w-screen max-w-screen">
			<ScrollRestoration />
			<div className="relative min-h-screen">
				<div className="top-0 left-0 w-full z-50">
					<NavBar />
				</div>

				<div className="w-full">
					<img
						src={CoverImage}
						alt="Trucks in a row"
						className="absolute top-0 left-0 w-full min-h-screen object-cover z-[-2]"
					/>

					<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]" />

					<div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 mx-[55px]">
						<h1 className="text-mv-white text-[90px] font-bold">
							MICROVAN INC.
						</h1>
						<p className="text-mv-white text-[40px] italic font-normal mt-[-10px]">
							Virtual Auctions
						</p>
						<p className="text-mv-white text-[25px] font-normal leading-relaxed mt-[20px]">
							Providing your trailer & equipment solutions,
							<br /> transported from the heart of the Philippines
						</p>
					</div>

					<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 text-center">
						<p className="text-mv-white text-[15px] mb-2">scroll down to bid</p>
						<ExpandMoreIcon className="w-[46px] h-[53px] text-mv-white animate-bounce" />
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center min-h-screen w-full max-w-full text-center z-10">
				<div className="flex items-center justify-between w-[80%] gap-x-4">
					<div className="w-[55%] flex flex-col gap-y-[31px]">
						<h2 className="text-mv-black text-2xl font-semibold">About Us</h2>
						<p className="text-mv-black text-base font-normal leading-relaxed">
							Microvan© Inc. is your retail solution to vehicle troubles. We
							host virtual and in-person auctions on imported vehicles to
							companies so that you can cut back on costs. We have vehicles
							imported from Sweden and Japan from major manufacturers such as
							Toyota and Cat.
							<br />
							<br />
							As of 2024, we now host auctions virtually so that you can place
							bids from the comfort of your own home. Scroll down below to take
							a look at our auctions.
						</p>
					</div>
					<div className="w-1/2">
						<img
							src={AboutMeImage}
							alt="Our mission visual representation"
							className="max-w-full h-auto"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col min-h-screen w-full items-center z-10 gap-y-[123px]">
				<div className="flex flex-col gap-y-[41px] w-[80%] items-start">
					<h2 className="text-mv-black text-2xl font-semibold w-full">
						Search Auctions
					</h2>
					<AuctionsSearchBar setResults={setSearchedAuctions} />
				</div>
				<div className="flex flex-col gap-y-[36px] w-[80%] items-start">
					<h2 className="text-mv-black text-2xl font-semibold">
						Current Auction
					</h2>
					{currentAuctionList.length > 0 ? (
						<CurrentAuctionCard
							imageUrls={[image, image, image, image]}
							startDate={new Date(currentAuctionList[0].start_date)}
							endDate={new Date(currentAuctionList[0].end_date)}
							numberOfEquipment={currentAuctionList[0].equipment_count}
							numberOfTrailers={currentAuctionList[0].trailer_count}
							numberOfTrucks={currentAuctionList[0].truck_count}
							button={currentAuctionButton}
						/>
					) : (
						<DefaultCurrentAuctionCard />
					)}
				</div>
				<div className="flex flex-col gap-y-[34px] w-[80%] items-start">
					<h2 className="text-mv-black text-2xl font-semibold">
						Upcoming Auctions
					</h2>
					{upcomingAuctionList.length > 0 ? (
						<div className="grid grid-cols-3 grid-rows-1 gap-[4.3rem] w-full">
							{upcomingAuctionList.map((auction) => (
								<UpcomingAuctionCard
									imageUrls={[image, image, image, image]}
									startDate={new Date(auction.start_date)}
									endDate={new Date(auction.end_date)}
									numberOfEquipment={auction.items.equipment.length}
									numberOfTrailers={auction.items.trailers.length}
									numberOfTrucks={auction.items.vehicles.length}
									button={upcomingAuctionButton}
								/>
							))}
						</div>
					) : (
						<div>
							<DefaultUpcomingAuctionCard />
						</div>
					)}
				</div>
				{pastAuctionList.length > 0 && (
					<div className="flex flex-col gap-y-[18px] w-[80%] items-start">
						<h2 className="text-mv-black text-4xl font-semibold">
							Past Auctions
						</h2>
						<div className="grid grid-cols-3 grid-rows-1 gap-[4.3rem] w-full">
							{pastAuctionList.map((auction) => (
								<PastAuctionCard
									imageUrls={[image, image, image, image]}
									startDate={new Date(auction.start_date)}
									endDate={new Date(auction.end_date)}
									numberOfEquipment={auction.items.equipment.length}
									numberOfTrailers={auction.items.trailers.length}
									numberOfTrucks={auction.items.vehicles.length}
								/>
							))}
						</div>
						{pastAuctionList.length > 3 && (
							<button type="button" className="flex ml-auto items-end">
								<p className="text-mv-black text-base font-normal underline">
									view more
								</p>
							</button>
						)}
					</div>
				)}
			</div>
			<div className="w-full items-center mt-[218px]">
				<Footer />
			</div>
		</div>
	);
}
