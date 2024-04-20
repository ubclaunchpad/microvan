import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import logo from '../../assets/microvan_logo.svg';
import { useAuth } from '../../providers/AuthProvider';
import ProfilePopUpModal from '../modals/ProfilePopUpModal';
import { useUser } from '../../providers/UserProvider';
import NotificationHistoryModal from '../modals/NotificationHistoryModal';

export default function NavBar() {
	const user = useUser();

	const [notificationHover, setNotificationHover] = useState(false);
	const [personHover, setPersonHover] = useState(false);
	const [routeToNavigate, setRouteToNavigate] = useState('');

	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const isListingsPage = location.pathname === '/listings';
	const isTutorialPage = location.pathname === '/tutorial';
	const isContactUsPage = location.pathname === '/contact';
	const isProfilePage = location.pathname === '/profile';

	useEffect(() => {
		if (routeToNavigate) {
			navigate(routeToNavigate);
			setRouteToNavigate('');
		}
	}, [routeToNavigate, navigate]);

	const handleAuthenticationClick = (route) => () => {
		if (!isLoggedIn && (route !== '/contact' || route !== '/')) {
			setRouteToNavigate('/onboard');
		} else {
			setRouteToNavigate(route);
		}
	};

	return (
		<div className="w-full h-[85px] flex justify-between items-start shadow-navBarShadow py-[10px] pl-[26px] pr-[34px] gap-[10px] bg-mv-white">
			<img
				src={logo}
				alt="logo"
				className="w-[60px] h-[60px] hover:cursor-pointer"
				onClick={() => navigate('/')}
			/>
			<div className="h-full flex items-center gap-[43px]">
				<NavLink
					to="/"
					className={isHomePage ? 'active-navbar-text' : 'inactive-navbar-text'}
				>
					Home
				</NavLink>
				<div
					role="presentation"
					onClick={handleAuthenticationClick('/listings')}
					className={
						isListingsPage ? 'active-navbar-text' : 'inactive-navbar-text'
					}
				>
					Listings
				</div>
				<div
					role="presentation"
					onClick={handleAuthenticationClick('/tutorial')}
					className={
						isTutorialPage ? 'active-navbar-text' : 'inactive-navbar-text'
					}
				>
					Tutorial
				</div>
				<NavLink
					to="/contact"
					className={
						isContactUsPage ? 'active-navbar-text' : 'inactive-navbar-text'
					}
				>
					Contact Us
				</NavLink>
				<div
					onMouseEnter={() => {
						setPersonHover(false);
						setNotificationHover(true);
					}}
					onMouseLeave={() => {
						setPersonHover(false);
						setNotificationHover(false);
					}}
				>
					{notificationHover ? (
						<NotificationsIcon
							sx={{ fontSize: 24 }}
							className="text-mv-green hover:cursor-pointer"
						/>
					) : (
						<NotificationsOutlinedIcon
							sx={{ fontSize: 24 }}
							className="text-mv-black hover:cursor-pointer"
						/>
					)}
					{notificationHover && (
						<div
							style={{
								position: 'fixed',
								bottom: '260',
								right: '80px',
								zIndex: 100,
							}}
						>
							<NotificationHistoryModal />
						</div>
					)}
				</div>
				<div
					role="presentation"
					onMouseEnter={() => {
						setNotificationHover(false);
						setPersonHover(true);
					}}
					onMouseLeave={() => {
						setNotificationHover(false);
						setPersonHover(false);
					}}
					onClick={handleAuthenticationClick('/profile')}
				>
					{personHover || isProfilePage ? (
						<PersonIcon
							sx={{ fontSize: 24 }}
							className="text-mv-green hover:cursor-pointer"
						/>
					) : (
						<PersonOutlinedIcon
							sx={{ fontSize: 24 }}
							className="text-mv-black hover:cursor-pointer"
						/>
					)}
					{user && personHover && (
						<div
							style={{
								position: 'fixed',
								bottom: '230',
								right: '10px',
								zIndex: 100,
							}}
						>
							<ProfilePopUpModal
								handleClose={() => {
									setPersonHover(false);
									setNotificationHover(false);
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
