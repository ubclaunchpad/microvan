import React, { useState } from 'react';
import NavBar from '../components/navBars/NavBar';
import Footer from '../components/footers/Footer';
import SubmitContactFormButton from '../components/buttons/SubmitContactFormButton';

export default function ContactUsPage() {
	const [name, setName] = useState('Lance Tan');
	const [email, setEmail] = useState('mail@microvaninc.com');
	const [phoneNumber, setPhoneNumber] = useState('+63 (917) 123 4567');
	const [bidderNumber, setBidderNumber] = useState('12345678');
	const [message, setMessage] = useState(
		"Hello, I'd like to speak with a Microvan employee regarding an issue I'm facing with downloading my statement of account."
	);

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

			<div className="flex-1 mt-[115px] w-full">
				<div className="flex flex-col px-[10%] w-full justify-center text-mv-black gap-y-[45px]">
					<h1 className="text-4xl font-semibold">Contact Us</h1>
					<div className="flex flex-col items-start w-full mt-[11px] gap-y-[19px]">
						<p className="text-2xl font-normal">Name</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] py-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={name}
								onChange={handleNameChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full mt-[11px] gap-y-[19px]">
						<p className="text-2xl font-normal">Email</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] py-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full mt-[11px] gap-y-[19px]">
						<p className="text-2xl font-normal">Phone Number</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] py-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full mt-[11px] gap-y-[19px]">
						<p className="text-2xl font-normal">
							Bidder Number (If you have one)
						</p>
						<div className="flex items-center w-[50%] h-[55px] px-[23px] py-[13px] shrink-0 rounded-[5px] shadow-searchBarShadow">
							<input
								className="w-full text-lg font-base outline-none"
								value={bidderNumber}
								onChange={handleBidderNumberChange}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full mt-[11px] gap-y-[19px]">
						<p className="text-2xl font-normal">Message</p>
						<textarea
							className="flex w-full h-[231px] px-[23px] py-7 shrink-0 gap-5 rounded-[5px] shadow-searchBarShadow text-lg font-base outline-none"
							value={message}
							onChange={handleMessageChange}
						/>
					</div>
					<div className="w-[315px] items-center justify-center mt-[11px]">
						<SubmitContactFormButton />
					</div>
				</div>
			</div>

			<div className="mt-[283px]">
				<Footer />
			</div>
		</div>
	);
}
