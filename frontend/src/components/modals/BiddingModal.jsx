import React from 'react';

export default function BiddingModal({ isOpen, onClose, minimumBid }) {
	if (!isOpen) return null;

	const [bidAmount, setBidAmount] = React.useState(minimumBid);

	const handleBidChange = (e) => {
		const inputValue = e.target.value.substring(1);

		if (Number.isNaN(inputValue)) {
			console.error('Invalid input: Please enter a number.');
			return;
		}

		const newBid = parseInt(inputValue, 10);

		if (Number.isNaN(newBid)) {
			console.error('Parsing error: Input is not a valid number.');
			return;
		}

		setBidAmount(newBid > 0 ? newBid : 0);
	};

	return (
		<div className="fixed z-50 inset-0 bg-mv-white bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="bg-mv-white rounded-lg p-5 shadow-xl px-16 py-8">
				<h2 className="text-2xl font-semibold text-center font-sans">
					Please insert your bid amount
				</h2>
				<p className="text-sm text-center mt-2">
					Enter your maximum possible bid
				</p>
				<div className="flex items-center justify-center my-8">
					<button
						type="button"
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
						onClick={() =>
							setBidAmount(bidAmount - 1000 >= 0 ? bidAmount - 1000 : 0)
						}
					>
						-
					</button>
					<input
						type="text"
						value={`₱${bidAmount}`}
						onChange={handleBidChange}
						className="text-center font-semibold text-2xl bg-gray-200 border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 focus:outline-none"
					/>
					<button
						type="button"
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
						onClick={() => setBidAmount(bidAmount + 1000)}
					>
						+
					</button>
				</div>
				<div className="flex items-center justify-center mt-4">
					{/* Positions buttons vertically */}
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="bg-mv-green hover:bg-green-700 text-mv-white text-xs font-semibold py-4 px-20 rounded"
						>
							Bid now
						</button>
						<button
							type="button"
							className="mt-2 bg-transparent hover:bg-gray-100 text-gray-700 py-4 px-20 text-xs font-semibold border border-gray-400 rounded shadow"
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</div>
				<p className="text-xs text-center mt-4">
					*All bids are binding and all sales are final
				</p>
			</div>
		</div>
	);
}
