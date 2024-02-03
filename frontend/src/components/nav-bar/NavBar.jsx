import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import logo from '../../assets/microvan_logo.svg';

export default function NavBar() {
	const [notificationHover, setNotificationHover] = useState(false);
	const [personHover, setPersonHover] = useState(false);

	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const isListingsPage = location.pathname === '/listings';
	const isTutorialPage = location.pathname === '/tutorial';
	const isContactUsPage = location.pathname === '/contact';

	return (
		<div className="w-full h-[85px] flex justify-between items-start shadow-navBarShadow py-[10px] pl-[26px] pr-[34px] gap-[10px] bg-mv-white">
			<img src={logo} alt="logo" className="w-[60px] h-[60px]" />
			<div className="h-full flex items-center gap-[43px]">
				<NavLink
					exact
					to="/"
					className={isHomePage ? 'active-navbar-text' : 'inactive-navbar-text'}
				>
					Home
				</NavLink>
				<NavLink
					to="/listings"
					className={isListingsPage ? 'active-navbar-text' : 'inactive-navbar-text'}
				>
					Listings
				</NavLink>
				<NavLink
					to="/tutorial"
					className={isTutorialPage ? 'active-navbar-text' : 'inactive-navbar-text'}
				>
					Tutorial
				</NavLink>
				<NavLink
					to="/contact"
					className={isContactUsPage ? 'active-navbar-text' : 'inactive-navbar-text'}
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
					onMouseEnter={() => setPersonHover(true)}
					onMouseLeave={() => setPersonHover(false)}
				>
					{personHover ? (
						<PersonIcon className="w-[35px] h-[35px] text-mv-green hover:cursor-pointer" />
					) : (
						<PersonOutlinedIcon className="w-[35px] h-[35px] text-mv-black hover:cursor-pointer" />
					)}
				</div>
			</div>
		</div>
	);
}