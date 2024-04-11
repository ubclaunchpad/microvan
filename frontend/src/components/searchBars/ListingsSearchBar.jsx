import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function ListingSearchBar({ input, setInput }) {
	return (
		<div className="flex items-center w-full h-[40px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
			<SearchIcon className="text-mv-black" sx={{ fontSize: 24 }} />
			<input
				className="w-full text-base font-normal text-mv-black placeholder-dark-grey outline-none leading-6 tracking-[0.5px]"
				placeholder="Search vehicle"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
		</div>
	);
}
