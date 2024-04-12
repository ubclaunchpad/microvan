import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../../../assets/microvan_logo.svg';
import SignInInputField from '../../../components/inputs/SignInInputField';

export default function ForgotPasswordPage() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');

	const handleEmailChange = (event) => setEmail(event.target.value);

	const handlePress = (event) => {
		event.preventDefault();
		// eslint-disable-next-line no-console
		console.log('Password reset email sent to:', email);
	};

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

			<div className="flex min-w-screen min-h-full items-start justify-center gap-x-[31px] mt-[10%] ml-[-5%]">
				<div className="flex flex-col">
					<img src={logo} alt="logo" className="w-[80px] h-[80px]" />
				</div>
				<div className="flex flex-col w-[60%] items-start">
					<div className="flex items-center w-full mb-[50px]">
						<h1 className="text-mv-green text-[50px] font-normal">
							FORGOT YOUR PASSWORD?
						</h1>
					</div>
					<p className="mb-7 text-mv-black font-normal text-xl w-full">
						Type in the email you registered to Microvan Inc. with below.
						Instructions for resetting your password will be sent to you there.
					</p>
					<div className="w-full gap-y-[5px]">
						<p className="text-mv-black text-xl font-medium">Email Address</p>
						<div className="flex flex-row items-center justify-between w-full gap-x-[27px]">
							<SignInInputField
								placeholder="johndoe@gmail.com"
								className="w-full h-full"
								type="email"
								value={email}
								onChange={handleEmailChange}
							/>
							<button
								type="button"
								className="bg-mv-white w-[15%] max-w-[150px] py-[11px] px-[33.5px] h-full rounded-[10px] border-solid border-2 border-mv-green text-mv-green font-normal text-xl"
								onClick={handlePress}
							>
								Next
							</button>
						</div>
					</div>
				</div>
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
