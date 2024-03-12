import React from 'react';
import NavBar from '../components/navBars/NavBar';
import Footer from '../components/footers/Footer';
import SubmitContactFormButton from '../components/buttons/SubmitContactFormButton';

export default function ContactUsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />

			<div className="flex-1">
				<div className="flex flex-col px-[5%] py-[5%] w-full justify-center">
					<h1 className="text-4xl pb-[1%] font-semibold text-mv-black">
						Contact Us
					</h1>
					<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
						<p className="font-poppins text-2xl font-normal leading-9 tracking-normal text-left">
							Name
						</p>
						<div className="flex items-center w-[50%] h-[56px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
							<input
								className="w-full text-base font-poppins text-gray-700 placeholder-dark-grey outline-none"
								placeholder=""
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
						<p className="font-poppins text-2xl font-normal leading-9 tracking-normal text-left">
							Email
						</p>
						<div className="flex items-center w-[50%] h-[56px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
							<input
								className="w-full text-base font-poppins text-gray-700 placeholder-dark-grey outline-none"
								placeholder=""
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
						<p className="font-poppins text-2xl font-normal leading-9 tracking-normal text-left">
							Phone Number
						</p>
						<div className="flex items-center w-[50%] h-[56px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
							<input
								className="w-full text-base font-poppins text-gray-700 placeholder-dark-grey outline-none"
								placeholder=""
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
						<p className="font-poppins text-2xl font-normal leading-9 tracking-normal text-left">
							Bidder Number (If you have one)
						</p>
						<div className="flex items-center w-[50%] h-[56px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
							<input
								className="w-full text-base font-poppins text-gray-700 placeholder-dark-grey outline-none"
								placeholder=""
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-[60%] mt-[22px] space-y-[5px]">
						<p className="font-poppins text-2xl font-normal leading-9 tracking-normal text-left">
							Message
						</p>
						<div className="flex w-[90%] h-[231px] px-5 py-4 shrink-0 gap-5 rounded-2xl bg-mv-white shadow-searchBarShadow">
							<textarea
								className="w-full text-base font-poppins text-gray-700 placeholder-dark-grey outline-none align-text-top text-left overflow-hidden"
								placeholder=""
							/>
						</div>
					</div>
					<div className="mt-[3%] w-[315px] items-center justify-center">
						<SubmitContactFormButton />
					</div>
				</div>

				<div className="flex-grow" />
			</div>

			<Footer />
		</div>
	);
}
