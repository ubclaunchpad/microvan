import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from '../components/navBars/NavBar';
import CoverImage from '../assets/cover-image.png';
import AboutMeImage from '../assets/about-me-logo.png';
import AuctionsSearchBar from "../components/searchBars/AuctionsSearchBar";

export default function HomePage() {
	const [searchedAuctions, setSearchedAuctions] = useState([]);

	return (
		<div>
			<div className="relative min-h-screen">
				<div className="fixed top-0 left-0 w-full z-10">
					<NavBar />
				</div>

				<div className="w-full">
					<img
						src={CoverImage}
						alt="Trucks in a row"
						className="absolute top-0 left-0 w-full min-h-screen object-cover z-0"
					/>

					<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5" />

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
						<p className="text-mv-white text-base mb-2">scroll down to bid</p>
						<ExpandMoreIcon className="w-[46px] h-[53px] text-mv-white" />
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center min-h-screen text-center">
				<div className="flex items-center justify-between w-[75%] space-x-4">
					<div className="w-[60%]">
						<h2 className="text-mv-black text-3xl font-semibold mb-7">
							About Us
						</h2>
						<p className="text-mv-black text-xl font-normal leading-relaxed">
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
			<div className="flex flex-col min-h-screen w-[75%]">
				<div>
					<h2 className="text-mv-black text-4xl font-semibold">
						Search Auctions
					</h2>
					<AuctionsSearchBar setResults={setSearchedAuctions}/>
				</div>
				<div>
					<h2 className="text-mv-black text-4xl font-semibold">
						Current Auction
					</h2>
				</div>
				<div>
					<h2 className="text-mv-black text-4xl font-semibold">
						Upcoming Auctions
					</h2>
				</div>
				<div>
					<h2 className="text-mv-black text-4xl font-semibold">
						Past Auctions
					</h2>
				</div>
			</div>
		</div>
	);
}
