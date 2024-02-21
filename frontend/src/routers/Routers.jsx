import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import ContactUsPage from '../pages/ContactUsPage';
import OnboardPage from '../pages/OnboardingPage';
import BidderLogInPage from '../pages/auth/bidders/BidderLogInPage';
import BidderRegisterPage from '../pages/auth/bidders/BidderRegisterPage';
import ForgotPasswordPage from '../pages/auth/bidders/ForgotPasswordPage';
import BidderPasswordPage from '../pages/auth/bidders/BidderPasswordPage';
import BidderEmailVerificationPage from '../pages/auth/bidders/BidderEmailVerificationPage';

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
				<Route path="/register/password" element={<BidderPasswordPage />} />
				<Route
					path="/register/email"
					element={<BidderEmailVerificationPage />}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
}
