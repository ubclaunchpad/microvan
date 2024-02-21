import React from 'react';
import NavBar from '../components/navBars/NavBar';
import ListingSearchBar from "../components/searchBars/ListingsSearchBar";

export default function HomePage() {
	return (
		<div className="App">
			<NavBar />
			<ListingSearchBar />
		</div>
	);
}
