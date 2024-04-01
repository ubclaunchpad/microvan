import React, { useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/navBars/NavBar';
import CurrentAuctionCountdown from '../components/timers/CurrentAuctionCountdown';
import ListingSearchBar from '../components/searchBars/ListingsSearchBar';
import Dropdown from '../components/dropdowns/Dropdown';
import FilterDropdown from '../components/dropdowns/FilterDropdown';
import VehicleItemCard from '../components/cards/VehicleItemCard';
import vehicleImage from '../assets/truck.png';
import Footer from '../components/footers/Footer';
import PriceInputField from '../components/inputs/PriceInputField';
import useAxios from '../hooks/useAxios';
import {
	formatListingsTodayDate,
	formatFlexibleDateRange,
	convertSGTToLocalDateObject,
} from '../utils/dateTime';

export default function ListingsPage() {
	const [auction, setAuction] = useState(null);
	const [units, setUnits] = useState([]);
	const [brands, setBrands] = useState([]);
	const [types, setTypes] = useState([]);
	const [sortByItems, setSortByItems] = useState([
		'All',
		'Trucks',
		'Equipments',
		'Trailers',
	]);
	const [selectedSortBy, setSelectedSortBy] = useState('All');
	const [selectedType, setSelectedType] = useState('All');
	const [selectedBrand, setSelectedBrand] = useState('All');
	const [selectedMinPrice, setSelectedMinPrice] = useState(0);
	const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
	const { fetchData } = useAxios();

	const updateMinPrice = ({ target: { value } }) => {
		if (value === '') {
			setSelectedMinPrice(0);
		} else {
			setSelectedMinPrice(parseInt(value, 10));
		}
	};

	const updateMaxPrice = ({ target: { value } }) => {
		if (value === '') {
			setSelectedMaxPrice(0);
		} else {
			setSelectedMaxPrice(parseInt(value, 10));
		}
	};

	useEffect(() => {
		const fetchAuctionAndVehicles = async () => {
			try {
				// Step 1: Fetch the current auction
				const currentAuctionResponse = await fetchData({
					endpoint: '/v1/auctions/current',
					method: 'GET',
				});
				const currentAuction = currentAuctionResponse.data;

				if (!currentAuction.id) {
					return;
				}

				setAuction(currentAuction);

				const dateResponse = await fetchData({
					endpoint: `/v1/auctions/${currentAuction.id}/day`,
					method: 'GET',
				});

				const auctionDayId = dateResponse.data.find((day) => {
					const requestDate = new Date(day.date).setHours(0, 0, 0, 0);
					const currentDate = new Date().setHours(0, 0, 0, 0);
					return requestDate === currentDate;
				})?.id;

				if (!auctionDayId) {
					return;
				}

				const brandSet = new Set();
				const typeSet = new Set();

				const vehiclesResponse = await fetchData({
					endpoint: `/v1/auctions/${currentAuction.id}/days/${auctionDayId}/vehicles`,
					method: 'GET',
				});

				setSortByItems(
					['All', 'Trucks', 'Equipments', 'Trailers'].filter((item) => {
						if (item === 'Trucks') {
							return vehiclesResponse.data.vehicles.length > 0;
						}
						if (item === 'Equipments') {
							return vehiclesResponse.data.equipment.length > 0;
						}
						if (item === 'Trailers') {
							return vehiclesResponse.data.trailers.length > 0;
						}
						return true;
					})
				);

				const vehicleIds = vehiclesResponse.data.vehicles;

				vehicleIds.forEach(async (vehicle) => {
					const vehicleResponse = await fetchData({
						endpoint: `/v1/vehicles/${vehicle.id}`,
						method: 'GET',
					});

					const vehicleData = vehicleResponse.data;

					setUnits((prevUnits) => [...prevUnits, vehicleData]);

					brandSet.add(vehicleData.brand_name);
					typeSet.add(vehicleData.vehicle_type_name);
					setBrands(['All', ...brandSet]);
					setTypes(['All', ...typeSet]);
				});
			} catch (error) {
				/* empty */
			}
		};

		fetchAuctionAndVehicles();
	}, []);

	if (
		!auction ||
		new Date().getTime() < new Date(auction?.start_date).getTime()
	) {
		return (
			<div className="flex flex-col justify-between min-h-screen max-h-screen max-w-screen min-w-screen">
				<div className="flex flex-col w-full">
					<NavBar />
					<div className="flex flex-col w-[85%] mx-auto">
						<div className="flex flex-col gap-y-[69px] mt-[46px]">
							<h1 className="text-mv-black text-2xl font-semibold">
								Auction Listings
							</h1>
							<p className="text-mv-black text-base font-base">
								Currently, there is no ongoing auction. Please come back next
								time.
							</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}

	const startTime = convertSGTToLocalDateObject(auction.start_time);
	const endTime = convertSGTToLocalDateObject(auction.end_time);
	const currentDate = new Date();
	if (currentDate.getTime() > endTime.getTime()) {
		startTime.setDate(startTime.getDate() + 1);
		endTime.setDate(endTime.getDate() + 1);
	}

	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen justify-between">
			<ScrollRestoration />
			<NavBar />

			<div className="flex flex-col w-[85%] mx-auto">
				<div className="mt-[46px]">
					<h1 className="text-mv-black text-2xl font-semibold">
						{`Auction Listings (${formatFlexibleDateRange(
							new Date(auction?.start_date),
							new Date(auction?.end_date)
						)})`}
					</h1>
				</div>

				<div className="mt-[49px] flex justify-between items-end">
					<h2 className="text-mv-black text-xl font-medium">
						{`Items for ${formatListingsTodayDate(currentDate)}`}
					</h2>

					<CurrentAuctionCountdown
						maxWidth="60%"
						startDateTime={startTime}
						endDateTime={endTime}
					/>
				</div>

				<div className="mt-[26px]">
					<ListingSearchBar setResults={setUnits} />
				</div>

				<div className="mt-[34px] flex gap-x-9">
					<div className="w-[22%] flex flex-col mt-[28px] gap-y-4 sticky top-0">
						<h2 className="text-mv-black text-xl font-medium">Filters</h2>
						<div className="px-5 pt-5 pb-[80px] bg-light-grey rounded-[20px] flex flex-col gap-y-[36px] shadow-filterBoxShadow">
							<div className="flex flex-col gap-y-2.5">
								<h3 className="text-mv-black text-base font-medium">Type</h3>
								<FilterDropdown
									title={selectedType}
									items={types}
									onValueChange={setSelectedType}
								/>
							</div>
							<div className="flex flex-col gap-y-2.5">
								<h3 className="text-mv-black text-base font-medium">Brand</h3>
								<FilterDropdown
									title={selectedBrand}
									items={brands}
									onValueChange={setSelectedBrand}
								/>
							</div>
							<div className="flex flex-col gap-y-2.5">
								<h3 className="text-mv-black text-base font-medium">Price</h3>
								<div className="flex items-center justify-center gap-x-[13px]">
									<PriceInputField
										value={selectedMinPrice}
										onChange={updateMinPrice}
									/>
									<p className="text-mv-black text-base font-normal">to</p>
									<PriceInputField
										value={selectedMaxPrice}
										onChange={updateMaxPrice}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[77%] flex flex-col gap-y-[28px]">
						<div className="w-full flex justify-end items-center gap-x-4">
							<p className="text-mv-black text-base font-normal leading-6 tracking-[0.5px]">
								Sort by
							</p>
							<Dropdown
								title={selectedSortBy}
								items={sortByItems}
								onValueChange={setSelectedSortBy}
							/>
						</div>
						<div className="flex flex-col gap-y-[28px] w-full">
							{units.map((vehicle) => (
								<VehicleItemCard
									key={vehicle.id}
									vehicleId={vehicle.id}
									description={vehicle.description}
									modelNumber={vehicle.model_number}
									engineNumber={vehicle.engine_number}
									chassisNumber={vehicle.chassis_number}
									price="210,000"
									imageUrl={vehicleImage}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-[101px]">
				<Footer />
			</div>
		</div>
	);
}
