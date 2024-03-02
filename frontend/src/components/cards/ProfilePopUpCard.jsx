import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import PersonIcon from '@mui/icons-material/Person';

export default function ProfilePopUpCard({
	modelNumber,
	brand,
}) {
	return (
		<div className="flex w-[550px] h-[189px] rounded-2xl shadow-2xl m-5 overflow-hidden relative">
			<div className="w-full flex">
				<div className="w-full mx-9 my-5">
					<div className="flex flex-col text-gray-700 text-base text-xxs">
						<div className="flex flex-col justify-between">
							<div>
								<div className="flex flex-col items-center">
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Bidder ID:</span>
										<span>{brand}</span>
									</div>
								</div>
							</div>	
							<div>
								<div className="flex flex-col items-center">
									<PersonIcon
										style={{ fontSize: '13px' }}
										className="mr-2"
									/>
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Model</span>
										<span>{modelNumber}</span>
									</div>
								</div>
							</div>
							<div>
								<div className="flex flex-col items-center">
									<SellIcon style={{ fontSize: '13px' }} className="mr-2" />
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Brand</span>
										<span>{brand}</span>
									</div>
								</div>
							</div>
							<div>
								<div className="flex flex-col items-center">
									<div className="flex flex-col justify-between">
										<span className="font-medium mb-[-7px]">Log Out</span>
										<span>{brand}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}