import React, { useEffect, useState, useCallback } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { debounce } from 'lodash';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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
import { priceToString } from '../utils/priceUtil';
import {
	formatListingsTodayDate,
	formatFlexibleDateRange,
	convertSGTToLocalDateObject,
} from '../utils/dateTime';

export default function ListingsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(null);
	const [hasPrevPage, setHasPrevPage] = useState(null);

	const [auction, setAuction] = useState(null);
	const [auctionDayId, setAuctionDayId] = useState(null);
	const [units, setUnits] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [brands, setBrands] = useState([]);
	const [types, setTypes] = useState([]);
	const [selectedSortBy, setSelectedSortBy] = useState('All');
	const [selectedType, setSelectedType] = useState('All');
	const [selectedBrand, setSelectedBrand] = useState('All');
	const [selectedMinPrice, setSelectedMinPrice] = useState(0);
	const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
	const { fetchData } = useAxios();
	const wsURL = process.env.REACT_APP_NODE_ENV === 'dev'
		? process.env.REACT_APP_DEV_BACKEND_WS_BASE_URL
		: process.env.REACT_APP_PROD_BACKEND_WS_BASE_URL
	const sortByItems = ['All', 'Trucks', 'Equipment', 'Trailers'];

	const updateMinPrice = ({ target: { value } }) => {
		if (value === '') {
			setSelectedMinPrice(0);
		} else {
			setSelectedMinPrice(parseInt(value, 10));
		}
	};

	useEffect(() => {
		const chatSocket = new WebSocket(wsURL);
		
		chatSocket.onmessage = (event) => {
		  const message = JSON.parse(event.data);
		  
		  if (message.bid_data) {
			const bidData = message.bid_data;
			
			setUnits(prevUnits => 
			  prevUnits.map(unit => 
				unit.id === bidData.object_id 
				  ? { ...unit, current_price: bidData.amount } 
				  : unit
			  )
			);
		  }
		};
	  
		return () => chatSocket.close();
	  }, []);
	  
	const updateMaxPrice = ({ target: { value } }) => {
		if (value === '') {
			setSelectedMaxPrice(0);
		} else {
			setSelectedMaxPrice(parseInt(value, 10));
		}
	};

	useEffect(() => {
		const fetchAuctionAndVehicles = async () => {
			setLoading(true);
			try {
				const brandsPromise = fetchData({
					endpoint: '/v1/vehicles/brands',
					method: 'GET',
				});

				const typesPromise = fetchData({
					endpoint: '/v1/vehicles/types',
					method: 'GET',
				});

				const currentAuctionPromise = fetchData({
					endpoint: '/v1/auctions/current',
					method: 'GET',
				});

				const [brandsResponse, typesResponse, currentAuctionResponse] =
					await Promise.all([
						brandsPromise,
						typesPromise,
						currentAuctionPromise,
					]);

				setBrands(
					brandsResponse.data.filter((brand) => brand && brand.name !== 'nan')
				);
				setTypes(
					typesResponse.data.filter((type) => type && type.name !== 'nan')
				);

				const currentAuction = currentAuctionResponse.data;

				if (!currentAuction.id) {
					setLoading(false);
					return;
				}

				setAuction(currentAuction);

				const dateResponse = await fetchData({
					endpoint: `/v1/auctions/${currentAuction.id}/day`,
					method: 'GET',
				});

				const dayId = dateResponse.data.find((day) => {
					const requestDate = new Date(day.date).setHours(0, 0, 0, 0);
					const currentDate = new Date().setHours(0, 0, 0, 0);
					return requestDate === currentDate;
				})?.id;

				setAuctionDayId(dayId);

				if (!dayId) {
					setLoading(false);
					return;
				}

				const vehiclesResponse = await fetchData({
					endpoint: `/v1/auctions/${currentAuction.id}/days/${dayId}/vehicles`,
					method: 'GET',
				});

				setUnits(vehiclesResponse.data.results);
				setHasNextPage(vehiclesResponse.data.next);
				setHasPrevPage(vehiclesResponse.data.previous);
				setTotalPages(Math.ceil(vehiclesResponse.data.count / 5));
			} catch (error) {
				/* empty */
			} finally {
				setLoading(false);
			}
		};

		fetchAuctionAndVehicles();
	}, []);

	const handleFetchVehicles = useCallback(
		debounce(async (url) => {
			setLoading(true);
			try {
				const response = await fetchData({
					endpoint: url,
					method: 'GET',
				});
				setUnits(response.data.results);
				setHasNextPage(response.data.next);
				setHasPrevPage(response.data.previous);
				setTotalPages(Math.ceil(response.data.count / 5));
			} catch (error) {
				/* empty */
			} finally {
				setLoading(false);
			}
		}, 500),
		[auction?.id, currentPage]
	);

	const generateUrlFromFilters = (url) => {
		let filtersString = '';
		if (selectedSortBy !== 'All') {
			filtersString += `&item_type=${selectedSortBy.toLowerCase()}`;
		}

		if (selectedType !== 'All' && selectedType?.name !== 'All') {
			filtersString += `&type=${selectedType.id}`;
		}

		if (selectedBrand !== 'All' && selectedBrand?.name !== 'All') {
			filtersString += `&brand=${selectedBrand.id}`;
		}

		if (selectedMinPrice > 0) {
			filtersString += `&min_price=${selectedMinPrice}`;
		}

		if (selectedMaxPrice > 0) {
			filtersString += `&max_price=${selectedMaxPrice}`;
		}

		if (searchTerm && searchTerm !== '') {
			filtersString += `&search=${encodeURIComponent(searchTerm)}`;
		}

		return url + filtersString;
	};

	const handleNextPage = () => {
		if (hasNextPage) {
			handleFetchVehicles(
				generateUrlFromFilters(
					`v1/auctions/${auction?.id}/days/${auctionDayId}/vehicles?page=${
						currentPage + 1
					}`
				)
			);
			setCurrentPage((prev) => prev + 1);
			window.scrollTo(0, 0);
		}
	};

	const handlePreviousPage = () => {
		if (hasPrevPage) {
			handleFetchVehicles(
				generateUrlFromFilters(
					`v1/auctions/${auction?.id}/days/${auctionDayId}/vehicles?page=${
						currentPage - 1
					}`
				)
			);
			setCurrentPage((prev) => prev + 1);
			window.scrollTo(0, 0);
		}
	};

	useEffect(() => {
		if (auction && auctionDayId) {
			handleFetchVehicles(
				generateUrlFromFilters(
					`/v1/auctions/${auction?.id}/days/${auctionDayId}/vehicles?page=${currentPage}`
				)
			);
		}
	}, [
		selectedSortBy,
		selectedType,
		selectedBrand,
		selectedMinPrice,
		selectedMaxPrice,
		searchTerm,
	]);

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
					<ListingSearchBar input={searchTerm} setInput={setSearchTerm} />
				</div>

				<div className="mt-[34px] flex gap-x-9">
					<div className="w-[23%] flex flex-col mt-[28px] gap-y-4 sticky top-0">
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
								<div className="flex items-center justify-center gap-x-[10px]">
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
									price={
										vehicle.current_price === 0
											? priceToString(vehicle.starting_price)
											: priceToString(vehicle.current_price)
									}
									imageUrl={vehicleImage}
								/>
							))}
						</div>

						<div className="w-full flex flex-col items-end justify-center mt-[15px]">
							<div className="flex w-full items-center justify-end">
								{hasPrevPage && (
									<div
										className="flex gap-x-1 hover:cursor-pointer"
										onClick={handlePreviousPage}
									>
										<KeyboardArrowLeftIcon
											className="text-mv-black"
											sx={{ fontSize: 18 }}
										/>
										<p className="text-mv-black text-lg font-medium leading-5 tracking-[0.1px]">
											Previous page
										</p>
									</div>
								)}
								{hasNextPage && (
									<div
										className="flex gap-x-1 hover:cursor-pointer ml-10"
										onClick={handleNextPage}
									>
										<p className="text-mv-black text-lg font-medium leading-5 tracking-[0.1px]">
											Next page
										</p>
										<KeyboardArrowRightIcon
											className="text-mv-black"
											sx={{ fontSize: 18 }}
										/>
									</div>
								)}
							</div>
							<p className="text-mv-black text-lg font-normal leading-5 tracking-[0.1px] mt-[21px]">{`Page ${currentPage} of ${totalPages}`}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-[40px]">
				<Footer />
			</div>
		</div>
	);
}
