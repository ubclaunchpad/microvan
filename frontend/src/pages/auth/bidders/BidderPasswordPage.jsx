import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import altlogo from '../../../assets/alt-microvan-logo.svg';
import OnboardingInputField from '../../../components/inputs/OnboardingInputField';
import RegisterButton from '../../../components/buttons/RegisterButton';
import BackButton from '../../../components/buttons/BackButton';
import useAxios from '../../../hooks/useAxios';

export default function BidderRegisterPage() {
	const navigate = useNavigate();
  const { fetchData } = useAxios();

  const location = useLocation();
  const { firstName, surname, email, phoneNumber, company, companyAddress } = location.state || {};

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handlePasswordChange = (event) => setPassword(event.target.value);
	const handleConfirmPasswordChange = (event) =>
		setConfirmPassword(event.target.value);

	const handleBackStep = () => {
		navigate('/register');
	};

	const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      console.error('Required fields are missing');
      return;
    }
  
    try {
      await fetchData({
        url: 'bidders/',
        method: 'POST',
        data: {
          email,
          password,
          given_name: firstName,
          family_name: surname,
          phone_number: phoneNumber,
          company_name: company,
          company_address: companyAddress,
        },
      });
      navigate('/register/email');
    } catch (err) {
      console.error(err.response ? err.response.data.error : 'An unknown error occurred');
    }
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

			<div className="flex flex-col w-full items-center justify-center space-y-[18px]">
				<div className="flex w-full items-center justify-center space-x-[16px] mb-[44px]">
					<img
						src={altlogo}
						alt="logo"
						className="flex-shrink-0 w-[70px] h-[70px]"
					/>
					<h1 className="text-mv-white text-[50px] font-normal">
						REGISTER AS A NEW BIDDER
					</h1>
				</div>
				<div className="flex flex-col w-[50%] space-y-[18px] items-center justify-center">
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">Input Password</p>
						<OnboardingInputField
							placeholder=""
							className="w-full h-[50px]"
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start space-y-[5px]">
						<p className="text-mv-white text-xl font-normal">
							Confirm Password
						</p>
						<OnboardingInputField
							placeholder=""
							className="w-full h-[50px]"
							type="password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
						/>
					</div>
					<div className="w-[70%] flex items-center justify-center">
						<RegisterButton onClick={handleRegister} />
					</div>
					<div className="w-[70%] flex items-center justify-center">
						<BackButton onClick={handleBackStep} />
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
