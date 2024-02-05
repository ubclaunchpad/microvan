import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import altlogo from '../assets/alt-microvan-logo.svg';
import OnboardingInputField from '../components/inputs/OnboardingInputField';
import RegisterButton from '../components/buttons/RegisterButton';

export default function BidderRegisterPage() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [company, setCompany] = useState('');
	const [companyAddress, setCompanyAddress] = useState('');

	const handleFirstNameChange = (event) => setFirstName(event.target.value);
	const handleSurnameChange = (event) => setSurname(event.target.value);
	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
	const handleCompanyChange = (event) => setCompany(event.target.value);
	const handleCompanyAddressChange = (event) =>
		setCompanyAddress(event.target.value);

	const handleRegister = () => {
		console.log(`Email: ${email}`); // eslint-disable-line no-console
	};

	return (
		<div className="flex flex-col items-center justify-between min-h-screen min-w-screen bg-mv-green">
			<div className="self-start pl-[29px] pt-[27px]">
				<button
					type="button"
					className="text-mv-white text-base font-medium"
					onClick={() => navigate('/')}
				>
					Home
				</button>
			</div>

			<div className="flex-grow" />

			<div className="flex flex-col w-full items-center justify-center space-y-[27px]">
				<div className="flex w-full items-center justify-center space-x-[16px]">
					<img
						src={altlogo}
						alt="logo"
						className="flex-shrink-0 w-[70px] h-[70px]"
					/>
					<h1 className="text-mv-white text-[50px] font-normal">
						REGISTER AS A NEW BIDDER
					</h1>
				</div>
				<div className="flex flex-col w-[60%] space-y-[18px] items-center justify-center">
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">First Name</p>
						<OnboardingInputField
							placeholder="John"
							className="w-full h-[50px]"
							type="text"
							value={firstName}
							onChange={handleFirstNameChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Surname</p>
						<OnboardingInputField
							placeholder="Doe"
							className="w-full h-[50px]"
							type="text"
							value={surname}
							onChange={handleSurnameChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Email</p>
						<OnboardingInputField
							placeholder="johndoe@gmail.com"
							className="w-full h-[50px]"
							type="email"
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Phone Number</p>
						<OnboardingInputField
							placeholder="+1 111 111 1111"
							className="w-full h-[50px]"
							type="tel"
							value={phoneNumber}
							onChange={handlePhoneNumberChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Company</p>
						<OnboardingInputField
							placeholder="Bank of Manila"
							className="w-full h-[50px]"
							type="text"
							value={company}
							onChange={handleCompanyChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Company Address</p>
						<OnboardingInputField
							placeholder="1234 Manila Street, Manila, Philippines"
							className="w-full h-[50px]"
							type="text"
							value={companyAddress}
							onChange={handleCompanyAddressChange}
						/>
					</div>
					<div className="w-[70%] flex items-center justify-center">
						<RegisterButton onClick={handleRegister} />
					</div>
				</div>
			</div>

			<div className="flex-grow" />

			<div className="self-center pb-[24px]">
				<p className="text-mv-white text-lg font-normal">
					© Microvan Inc. 2024
				</p>
			</div>
		</div>
	);
}
