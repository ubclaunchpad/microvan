import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import BidHistoryPage from '../pages/BidHistoryPage';

const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/listings', element: <ListingsPage /> },
	{ path: '/listings/:vehicleId', element: <VehicleDetailsPage /> },
	{ path: '/contact', element: <ContactUsPage /> },
	{ path: '/onboard', element: <OnboardPage /> },
	{ path: '/signin', element: <BidderLogInPage /> },
	{ path: '/signin/forgotpassword', element: <ForgotPasswordPage /> },
	{ path: '/register', element: <BidderRegisterPage /> },
	{ path: '/register/email', element: <BidderEmailVerificationPage /> },
	{ path: '/register/verified', element: <BidderEmailVerifiedPage /> },
	{ path: '/profile', element: <ProfilePage /> },
	{ path: '/history', element: <BidHistoryPage /> },
	{ path: '*', element: <NotFoundPage /> },
]);

export default router;
