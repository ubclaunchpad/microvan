import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../../../assets/microvan_logo.svg';
import OnboardingInputField from '../../../components/inputs/OnboardingInputField';
import RegisterButton from '../../../components/buttons/RegisterButton';

export default function BidderRegisterPage() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [company, setCompany] = useState('');
	const [companyAddress, setCompanyAddress] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleFirstNameChange = (event) => setFirstName(event.target.value);
	const handleSurnameChange = (event) => setSurname(event.target.value);
	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
	const handleCompanyChange = (event) => setCompany(event.target.value);
	const handleCompanyAddressChange = (event) =>
		setCompanyAddress(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);
	const handleConfirmPasswordChange = (event) =>
		setConfirmPassword(event.target.value);

	const handleRegisterUser = () => {
		navigate('/register/email');
	};

	return (
		<div className="flex flex-col items-center justify-between min-h-screen min-w-screen bg-mv-white">
			<div className="self-start pl-[29px] pt-[27px]">
				<button
					type="button"
					className="text-mv-green text-base font-medium"
					onClick={() => navigate('/')}
				>
					Home
				</button>
			</div>

			<div className="flex flex-col w-full items-center justify-center gap-y-[40px] mt-[74px]">
				<div className="flex w-full items-center justify-center gap-x-[16px]">
					<img
						src={logo}
						alt="logo"
						className="flex-shrink-0 w-[70px] h-[70px]"
					/>
					<h1 className="text-mv-green text-[50px] font-normal">
						REGISTER AS A NEW BIDDER
					</h1>
				</div>

				<div className="flex flex-col w-[50%] items-center justify-center gap-y-[40px]">
					<div className="flex flex-col w-full gap-y-[15px] items-start">
						<h2 className="text-mv-black text-xl font-semibold mb-[5px]">
							Personal Information
						</h2>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">First Name</p>
							<OnboardingInputField
								placeholder="Paul"
								type="text"
								value={firstName}
								onChange={handleFirstNameChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">Surname</p>
							<OnboardingInputField
								placeholder="Dos Santos"
								type="text"
								value={surname}
								onChange={handleSurnameChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">Email</p>
							<OnboardingInputField
								placeholder="pauldossantos@gmail.com"
								type="email"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">
								Phone Number
							</p>
							<OnboardingInputField
								placeholder="+63 (917) 123 4567"
								type="tel"
								value={phoneNumber}
								onChange={handlePhoneNumberChange}
							/>
						</div>
					</div>

					<div className="flex flex-col w-full gap-y-[15px] items-start">
						<h2 className="text-mv-black text-xl font-semibold mb-[5px]">
							Company Information
						</h2>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">Company</p>
							<OnboardingInputField
								placeholder="Bank of Manila"
								type="text"
								value={company}
								onChange={handleCompanyChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">
								Company Address
							</p>
							<OnboardingInputField
								placeholder="1234 Manila Street, Manila, Philippines"
								type="text"
								value={companyAddress}
								onChange={handleCompanyAddressChange}
							/>
						</div>
					</div>

					<div className="flex flex-col w-full gap-y-[15px] items-start">
						<h2 className="text-mv-black text-xl font-semibold mb-[5px]">
							Set Password
						</h2>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">
								Input Password
							</p>
							<OnboardingInputField
								placeholder=""
								type="password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<p className="text-mv-black text-base font-normal">
								Confirm Password
							</p>
							<OnboardingInputField
								placeholder=""
								type="password"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
							/>
						</div>
					</div>

					<div className="flex flex-col items-start justify-start w-full text-mv-black text-xs font-normal">
						<p>
							Password can contain only letters, numbers, and the following
							special characters: *&%$@!_
						</p>
						<p>
							Password must be more than 8 characters long and must contain at
							least one capital letter.
						</p>
					</div>

					<div className="w-[70%] flex items-center justify-center">
						<RegisterButton onClick={handleRegisterUser} />
					</div>
				</div>
			</div>

			<div className="self-center pb-[35px] mt-[72px]">
				<p className="text-mv-green text-lg font-normal">
					© Microvan Inc. 2024
				</p>
			</div>
		</div>
	);
}
