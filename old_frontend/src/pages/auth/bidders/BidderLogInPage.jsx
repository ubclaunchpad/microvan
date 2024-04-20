import React, { useState } from 'react';
import { useNavigate, ScrollRestoration } from 'react-router-dom';
import logo from '../../../assets/microvan_logo.svg';
import SignInInputField from '../../../components/inputs/SignInInputField';
import LogInButton from '../../../components/buttons/LogInButton';
import { useAuth } from '../../../providers/AuthProvider';

export default function BidderLogInPage() {
	const navigate = useNavigate();
	const { signIn } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(null);

	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);

	const handleLogIn = async () => {
		try {
			await signIn(email, password);
			navigate('/');
		} catch (err) {
			setLoginError(
				'Failed to log in. Please check your credentials and try again.'
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-between min-h-screen min-w-screen bg-mv-white">
			<ScrollRestoration />
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
				<div className="flex flex-col items-start w-[60%] mt-[22px] gap-y-[5px] max-w-[700px]">
					<p className="text-dark-grey text-xl font-normal">Email</p>
					<SignInInputField
						placeholder="Email"
						className="w-full h-[56px]"
						type="email"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className="flex flex-col items-start w-[60%] mt-[22px] gap-y-[5px] max-w-[700px]">
					<p className="text-dark-grey text-xl font-normal">Password</p>
					<SignInInputField
						placeholder="Password"
						className="w-full h-[56px]"
						type="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				{loginError && (
					<p style={{ color: 'red' }} className="text-sm mt-2">
						{loginError}
					</p>
				)}

				<div className="mt-[49px] w-full flex items-center justify-center max-w-[525px]">
					<LogInButton onClick={handleLogIn} />
				</div>
				<button
					type="button"
					className="text-mv-green text-xs font-normal focus:outline-none mt-[18px] border-none"
					onClick={() => navigate('/signin/forgotpassword')}
				>
					Forgot Password?
				</button>
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
