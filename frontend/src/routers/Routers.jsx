import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListingsPage from "../pages/ListingsPage";
import ContactUsPage from "../pages/ContactUsPage";
import OnboardPage from "../pages/OnboardingPage";
import BidderLogInPage from "../pages/BidderLogInPage";
import BidderRegisterPage from "../pages/BidderRegisterPage";

export default function Routers() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/listings" element={<ListingsPage />} />
				<Route path="/contact" element={<ContactUsPage />} />
				<Route path="/onboard" element={<OnboardPage />} />
				<Route path="/login" element={<BidderLogInPage />} />
				<Route path="/register" element={<BidderRegisterPage />} />
			</Routes>
		</div>
	);
}
