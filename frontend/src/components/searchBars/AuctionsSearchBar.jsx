import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useAxios from '../../hooks/useAxios';

export default function AuctionsSearchBar({ setResults }) {
	const { fetchData } = useAxios();

	const [input, setInput] = useState('');

	const handleFetchAuctions = async () => {
		if (!input.trim()) return;

		try {
			const response = await fetchData({
				url: `auctions?search=${input}`,
				method: 'GET',
			});
			const result = await response.json();
			setResults(result.vehicles);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err.message || 'An unknown error occurred');
		}
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (input) {
				handleFetchAuctions();
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [input]);

	const handleChange = (value) => {
		setInput(value);
	};

	return (
		<div className="flex items-center p-4 shadow-md rounded-lg bg-white mx-10 my-4">
			<SearchIcon className="text-gray-400 mx-2" />
			<input
				className="w-full py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
				placeholder="Search auctions"
				value={input}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}
