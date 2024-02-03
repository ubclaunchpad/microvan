import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import Listings from '../pages/ListingsPage';
import ContactUs from '../pages/ContactUsPage';

export default function Routers() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/listings" element={<Listings />} />
				<Route path="/contact" element={<ContactUs />} />
			</Routes>
		</div>
	);
}
