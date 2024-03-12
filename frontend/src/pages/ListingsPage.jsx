import React, { useState } from 'react';
import NavBar from '../components/navBars/NavBar';
import CurrentAuctionCountdown from '../components/timers/CurrentAuctionCountdown';
import ListingSearchBar from '../components/searchBars/ListingsSearchBar';
import Dropdown from '../components/dropdowns/Dropdown';
import FilterDropdown from '../components/dropdowns/FilterDropdown';
import VehicleItemCard from '../components/cards/VehicleItemCard';
import vehicleImage from '../assets/truck.png';
import Footer from '../components/footers/Footer';
import PriceInputField from '../components/inputs/PriceInputField';

export default function ListingsPage() {
	const [units, setUnits] = useState([]);
	const [selectedSortBy, setSelectedSortBy] = useState('All');
	const [selectedType, setSelectedType] = useState('All');
	const [selectedBrand, setSelectedBrand] = useState('All');
	const [selectedMinPrice, setSelectedMinPrice] = useState(0);
	const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
	const sortByItems = ['All', 'Truck', 'Equipment', 'Trailer'];
	const typeItems = ['All', 'Cargo Truck', 'Truck', 'Not a Truck'];
	const brandItems = [
		'All',
		'Isuzu',
		'Mitsubishi',
		'Toyota',
		'Nissan',
		'Fuso',
		'Hino',
		'Hyundai',
		'Suzuki',
		'Ford',
		'Chevrolet',
		'Mercedes-Benz',
		'BMW',
		'Audi',
		'Volkswagen',
		'Volvo',
		'Scania',
	];

	const vehicles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// eslint-disable-next-line no-console
	console.log(units);
	// eslint-disable-next-line no-console
	console.log(selectedSortBy);
	// eslint-disable-next-line no-console
	console.log(selectedType);
	// eslint-disable-next-line no-console
	console.log(selectedBrand);

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

	if (vehicles.length === 0) {
		return (
			<div className="flex flex-col justify-between min-h-screen max-h-screen max-w-screen min-w-screen">
				<div className="flex flex-col w-full">
					<NavBar />
					<div className="flex flex-col w-[85%] mx-auto">
						<div className="flex flex-col gap-y-[48px] mt-[116px]">
							<h1 className="text-mv-black text-4xl font-semibold">
								Auction Listings (Nov 5-7)
							</h1>
							<p className="text-mv-black text-xl font-base">
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

	return (
		<div className="flex flex-col max-w-screen min-w-screen min-h-screen justify-between">
			<NavBar />

			<div className="flex flex-col w-[85%] mx-auto">
				<div className="mt-[116px]">
					<h1 className="text-mv-black text-4xl font-semibold">
						Auction Listings (Nov 5-7)
					</h1>
				</div>

				<div className="mt-[75px] flex justify-between items-end">
					<h2 className="text-mv-black text-[26px] font-medium">
						Items for Monday, November 6
					</h2>

					<CurrentAuctionCountdown
						maxWidth="60%"
						startDateTime={new Date()}
						endDateTime={new Date(2024, 2, 6, 19, 37)}
					/>
				</div>

				<div className="mt-[23px]">
					<ListingSearchBar setResults={setUnits} />
				</div>

				<div className="mt-[117px] flex gap-x-9">
					<div className="w-[22%] flex flex-col mt-[32px] gap-y-4 sticky top-0">
						<h2 className="text-mv-black text-xl font-medium">Filters</h2>
						<div className="px-5 pt-5 pb-[80px] bg-light-grey rounded-[20px] flex flex-col gap-y-[36px] shadow-filterBoxShadow">
							<div className="flex flex-col gap-y-2.5">
								<h3 className="text-mv-black text-base font-medium">Type</h3>
								<FilterDropdown
									title={selectedType}
									items={typeItems}
									onValueChange={setSelectedType}
								/>
							</div>
							<div className="flex flex-col gap-y-2.5">
								<h3 className="text-mv-black text-base font-medium">Brand</h3>
								<FilterDropdown
									title={selectedBrand}
									items={brandItems}
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
					<div className="w-[77%] flex flex-col gap-y-[29px]">
						<div className="w-full flex justify-end items-center gap-x-4">
							<p className="text-mv-black text-lg font-normal leading-6 tracking-[0.5px]">
								Sort by
							</p>
							<Dropdown
								title={selectedSortBy}
								items={sortByItems}
								onValueChange={setSelectedSortBy}
							/>
						</div>
						<div className="flex flex-col gap-y-[67px] w-full">
							{vehicles.map((vehicle) => (
								<VehicleItemCard
									key={vehicle}
									description="Hino 10W Tractor Head Double Differential Projector Light 1992"
									modelNumber="FM658N"
									engineNumber="V25C-B10153"
									chassisNumber="SS2VJB-10038"
									price="210,000"
									imageUrl={vehicleImage}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-[266px]">
				<Footer />
			</div>
		</div>
	);
}
