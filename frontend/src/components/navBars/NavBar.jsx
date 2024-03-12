import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import logo from '../../assets/microvan_logo.svg';
import useAuth from '../../hooks/useAuth';
import ProfilePopUpCard from '../cards/ProfilePopUpCard';

export default function NavBar() {
	const [notificationHover, setNotificationHover] = useState(false);
	const [personHover, setPersonHover] = useState(false);
	const [routeToNavigate, setRouteToNavigate] = useState('');

	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const isListingsPage = location.pathname === '/listings';
	const isTutorialPage = location.pathname === '/tutorial';
	const isContactUsPage = location.pathname === '/contact';

	useEffect(() => {
		if (routeToNavigate) {
			navigate(routeToNavigate);
			setRouteToNavigate('');
		}
	}, [routeToNavigate, navigate]);

	const handleAuthenticationClick = (route) => () => {
		if (!isAuthenticated) {
			setRouteToNavigate('/onboard');
		} else {
			setRouteToNavigate(route);
		}
	};

	return (
		<div className="w-full h-[85px] flex justify-between items-start shadow-navBarShadow py-[10px] pl-[26px] pr-[34px] gap-[10px] bg-mv-white">
			<img src={logo} alt="logo" className="w-[60px] h-[60px]" />
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
					onMouseEnter={() => setNotificationHover(true)}
					onMouseLeave={() => setNotificationHover(false)}
				>
					{notificationHover ? (
						<NotificationsIcon className="w-[35px] h-[35px] text-mv-green hover:cursor-pointer" />
					) : (
						<NotificationsOutlinedIcon className="w-[35px] h-[35px] text-mv-black hover:cursor-pointer" />
					)}
				</div>
				<div
					role="presentation"
					onMouseEnter={() => setPersonHover(true)}
					onMouseLeave={() => setPersonHover(false)}
					onClick={handleAuthenticationClick('/profile')}
				>
					{personHover ? (
						<PersonIcon className="w-[35px] h-[35px] text-mv-green hover:cursor-pointer" />
					) : (
						<PersonOutlinedIcon className="w-[35px] h-[35px] text-mv-black hover:cursor-pointer" />
					)}
					{personHover && (
						<div
							style={{
								position: 'fixed',
								bottom: '230',
								right: '10px',
								zIndex: 100,
							}}
						>
							<ProfilePopUpCard />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
