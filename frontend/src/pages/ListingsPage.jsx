import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
	const location = useLocation();
	const { auction, vehicles } = location.state;

	const [units, setUnits] = useState([]);
	const [brands, setBrands] = useState([]);
	const [types, setTypes] = useState([]);
	const [sortByItems, setSortByItems] = useState([]);
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
		const fetchUnits = async () => {
			const vehiclePromises = vehicles.vehicles.map((vehicle) =>
				fetchData({
					endpoint: `/v1/vehicles/${vehicle.id}`,
					method: 'GET',
				})
			);

			const vehicleData = (await Promise.all(vehiclePromises)).map(
				(vehicle) => vehicle.data
			);

			setUnits(vehicleData);
			setBrands([
				'All',
				...new Set(vehicleData.map((vehicle) => vehicle.brand_name)),
			]);
			setTypes([
				'All',
				...new Set(vehicleData.map((vehicle) => vehicle.vehicle_type_name)),
			]);
		};

		fetchUnits();

		const itemsSortBy = ['All'];
		if (vehicles?.vehicles?.length > 0) {
			itemsSortBy.push('Trucks');
		}
		if (vehicles?.equipments?.length > 0) {
			itemsSortBy.push('Equipments');
		}
		if (vehicles?.trailers?.length > 0) {
			itemsSortBy.push('Trailers');
		}
		setSortByItems(itemsSortBy);
	}, [vehicles]);

	const auctionTitle = `Auction Listings (${formatFlexibleDateRange(
		new Date(auction?.start_date),
		new Date(auction?.end_date)
	)})`;

	if (new Date().getTime() < new Date(auction?.start_date).getTime()) {
		return (
			<div className="flex flex-col justify-between min-h-screen max-h-screen max-w-screen min-w-screen">
				<div className="flex flex-col w-full">
					<NavBar />
					<div className="flex flex-col w-[85%] mx-auto">
						<div className="flex flex-col gap-y-[69px] mt-[46px]">
							<h1 className="text-mv-black text-2xl font-semibold">
								{auctionTitle}
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
			<NavBar />

			<div className="flex flex-col w-[85%] mx-auto">
				<div className="mt-[46px]">
					<h1 className="text-mv-black text-2xl font-semibold">
						{auctionTitle}
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
