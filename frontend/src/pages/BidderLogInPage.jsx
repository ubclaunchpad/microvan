import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../assets/microvan_logo.svg';
import OnboardingInputField from '../components/inputs/OnboardingInputField';
import LogInButton from "../components/buttons/LogInButton";

export default function BidderLogInPage() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);

	const handleLogIn = () => {
		console.log(`Email: ${email}, Password: ${password}`); // eslint-disable-line no-console
	}

	return (
		<div className="flex flex-col items-center justify-between h-screen w-screen bg-mv-white">
			<div className="self-start pl-[29px] pt-[27px]">
				<button
					type="button"
					className="text-mv-green text-base font-medium"
					onClick={() => navigate('/')}
				>
					Home
				</button>
			</div>

			<div className="flex-grow" />

			<div className="flex flex-col w-full items-center justify-center">
				<img
					src={logo}
					alt="logo"
					className="flex-shrink-0 w-[115px] h-[115px]"
				/>
				<h1 className="text-mv-green text-[50px] font-semibold">
					Microvan Inc.
				</h1>
				<h2 className="text-mv-green text-3xl font-normal">Virtual Auctions</h2>
				<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
					<p className="text-dark-grey text-xl font-normal">Email</p>
					<OnboardingInputField
						placeholder="johndoe@gmail.com"
						className="w-full h-[56px]"
						type="email"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
        <div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
					<p className="text-dark-grey text-xl font-normal">Password</p>
					<OnboardingInputField
						placeholder="**********"
						className="w-full h-[56px]"
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className="mt-[49px] w-full flex items-center justify-center">
					<LogInButton onClick={handleLogIn}/>
				</div>
				<p className="text-mv-green text-xs font-normal hover:cursor-pointer mt-[18px]">
					Forgot Password?
				</p>
			</div>

			<div className="flex-grow" />

			<div className="self-center pb-[24px]">
				<p className="text-mv-green text-lg font-normal">
					© Microvan Inc. 2024
				</p>
			</div>
		</div>
	);
}
