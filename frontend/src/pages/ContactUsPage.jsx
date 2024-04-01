import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBars/NavBar';
import Footer from '../components/footers/Footer';
import SubmitContactFormButton from '../components/buttons/SubmitContactFormButton';
import { useUser } from '../providers/UserProvider';

export default function ContactUsPage() {
	const user = useUser();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [bidderNumber, setBidderNumber] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (user) {
			setName(`${user.given_name} ${user.family_name}`);
			setEmail(user.email);
			setPhoneNumber(user.phone_number);
			setBidderNumber(user?.['custom:bidder_number'] ?? '');
		}
	}, [user]);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
	};

	const handleBidderNumberChange = (e) => {
		setBidderNumber(e.target.value);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<div className="flex flex-col min-h-screen w-screen">
			<NavBar />

			<div className="flex-1 mt-[45.65px] w-full">
				<div className="flex flex-col px-[10%] w-full justify-center text-mv-black gap-y-[30px]">
					<h1 className="text-2xl font-semibold">Contact Us</h1>
					<div className="flex flex-col items-start w-full mt-[16px] gap-y-[13px]">
						<p className="text-lg font-normal">Name</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] pt-[15px] pb-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={name}
								onChange={handleNameChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-y-[13px]">
						<p className="text-lg font-normal">Email</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] pt-[15px] pb-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-y-[13px]">
						<p className="text-lg font-normal">Phone Number</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] pt-[15px] pb-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-y-[19px]">
						<p className="text-lg font-normal">
							Bidder Number (If you have one)
						</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] pt-[15px] pb-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={bidderNumber}
								onChange={handleBidderNumberChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-y-[13px]">
						<p className="text-lg font-normal">Message</p>
						<textarea
							className="flex w-full h-[231px] px-[23px] py-[15px] shrink-0 gap-5 rounded-[5px] shadow-searchBarShadow text-lg font-base outline-none"
							value={message}
							onChange={handleMessageChange}
						/>
					</div>
					<div className="items-center justify-center mt-[5px]">
						<SubmitContactFormButton />
					</div>
				</div>
			</div>

			<div className="mt-[48.15px]">
				<Footer />
			</div>
		</div>
	);
}
