import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/microvan_logo.svg';
import NavBar from '../components/navBars/NavBar';
import ReturnHomeButton from '../components/buttons/ReturnHomeButton';

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleContactUs = (e) => {
		e.preventDefault();
		navigate('/contact');
	};

	const handleGoHome = (e) => {
		e.preventDefault();
		navigate('/');
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-mv-white">
			<NavBar />
			<div className="flex flex-col items-center mt-[138px]">
				<img src={logo} alt="Microvan logo" className="w-[168px] h-[168px]" />
				<h1 className="mt-[20px] text-not-found-header text-[64px] font-medium">
					404
				</h1>
				<p className="text-center mt-4">
					Sorry, the page you&apos;re looking for doesn&apos;t
					<br />
					exist. Try{' '}
					<a
						href="/contact"
						onClick={handleContactUs}
						className="underline text-mv-green hover:cursor-pointer"
					>
						contacting us
					</a>{' '}
					for help and assistance.
				</p>
				<div className="mt-[20px]">
					<ReturnHomeButton onClick={handleGoHome} />
				</div>
			</div>
		</div>
	);
}
