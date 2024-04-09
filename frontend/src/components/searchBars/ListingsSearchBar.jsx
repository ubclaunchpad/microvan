import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useAxios from '../../hooks/useAxios';

export default function ListingSearchBar({ setResults }) {
	const { fetchData } = useAxios();

	const [input, setInput] = useState('');

	const handleFetchVehicles = async () => {
		if (!input.trim()) return;

		try {
			const response = await fetchData({
				url: `/v1/vehicles?search=${input}`,
				method: 'GET',
			});
			setResults(response.data);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err.message || 'An unknown error occurred');
		}
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (input) {
				handleFetchVehicles();
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [input]);

	const handleChange = (value) => {
		setInput(value);
	};

	return (
		<div className="flex items-center w-full h-[40px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
			<SearchIcon className="text-mv-black" sx={{ fontSize: 24 }} />
			<input
				className="w-full text-base font-normal text-mv-black placeholder-dark-grey outline-none leading-6 tracking-[0.5px]"
				placeholder="Search vehicle"
				value={input}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}
