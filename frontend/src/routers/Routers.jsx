import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import ContactUsPage from '../pages/ContactUsPage';
import OnboardPage from '../pages/OnboardingPage';
import BidderLogInPage from '../pages/auth/bidders/BidderLogInPage';
import ForgotPasswordPage from '../pages/auth/bidders/ForgotPasswordPage';
import BidderRegisterPage from '../pages/auth/bidders/BidderRegisterPage';
import BidderEmailVerificationPage from '../pages/auth/bidders/BidderEmailVerificationPage';
import BidderEmailVerifiedPage from '../pages/auth/bidders/BidderEmailVerifiedPage';
import VehicleDetailsPage from '../pages/VehicleDetailsPage';

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
				<Route
					path="/register/email"
					element={<BidderEmailVerificationPage />}
				/>
				<Route
					path="/register/verified"
					element={<BidderEmailVerifiedPage />}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />)
			</Routes>
		</div>
	);
}
