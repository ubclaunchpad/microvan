import React from 'react';
import { useNavigate } from 'react-router';
import ContactUsButton from '../buttons/ContactUsButton';

export default function Footer() {
	const navigate = useNavigate();

	const handleContactUsButton = () => {
		navigate('/contact');
	};

	return (
		<div className="w-full h-[326px] bg-dark-green flex flex-col items-center">
			<div className="w-[85%] h-full text-mv-white justify-between flex items-center">
				<div className="flex flex-col">
					<div className="flex flex-col mb-8">
						<h3 className="text-[28px] font-medium">Still have questions?</h3>
						<p className="text-lg font-normal">We&apos;re here to help.</p>
					</div>
					<div className="mb-10 w-[80%]">
						<ContactUsButton onClick={handleContactUsButton} />
					</div>
					<p className="text-lg font-normal">© Microvan Inc. 2024</p>
				</div>
				<div className="flex flex-col w-[30%]">
					<h3 className="text-[19px] font-semibold">Our Hours:</h3>
					<div className="flex flex-col">
						{[
							{ day: 'Monday', hours: '8am-5pm' },
							{ day: 'Tuesday', hours: '8am-5pm' },
							{ day: 'Wednesday', hours: '8am-5pm' },
							{ day: 'Thursday', hours: '8am-5pm' },
							{ day: 'Friday', hours: '8am-5:30pm' },
							{ day: 'Saturday', hours: '8am-4pm' },
							{ day: 'Sunday', hours: 'Closed' },
						].map((schedule) => (
							<div className="flex gap-x-10">
								<p className="text-[19px] font-normal flex-1 text-left pr-4">
									{schedule.day}
								</p>
								<p className="text-[19px] font-normal flex-1">
									{schedule.hours}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
