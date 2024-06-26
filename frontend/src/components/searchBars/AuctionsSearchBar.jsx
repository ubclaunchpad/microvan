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
				endpoint: `/v1/auctions?search=${input}`,
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
				handleFetchAuctions();
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [input]);

	const handleChange = (value) => {
		setInput(value);
	};

	return (
		<div className="flex items-center w-full h-[56px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
			<SearchIcon className="text-mv-black" sx={{ fontSize: 24 }} />
			<input
				className="w-full text-base font-normal text-mv-black placeholder-dark-grey outline-none"
				placeholder="Search auctions"
				value={input}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}
