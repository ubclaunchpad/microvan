import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import ContactUsPage from '../pages/ContactUsPage';
import OnboardPage from '../pages/OnboardingPage';
import BidderLogInPage from '../pages/BidderLogInPage';
import BidderRegisterPage from '../pages/BidderRegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

export default function Routers() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/listings" element={<ListingsPage />} />
				<Route path="/contact" element={<ContactUsPage />} />
				<Route path="/onboard" element={<OnboardPage />} />
				<Route path="/signin" element={<BidderLogInPage />} />
				<Route path="/signin/forgotpassword" element={<ForgotPasswordPage />} />
				<Route path="/register" element={<BidderRegisterPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
}
