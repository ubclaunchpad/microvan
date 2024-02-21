import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Dropdown({
	title,
	items,
	onValueChange,
	width,
	height,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(title);

	const handleValueChange = (newValue) => {
		setSelectedValue(newValue);
		setIsOpen(false);
		onValueChange(newValue);
	};

	return (
		<div className="flex flex-col gap-[6px]">
			<button
				type="button"
				className={`whitespace-nowrap w-[${width}] h-[${height}] py-3 px-5 rounded-[10px] bg-light-grey flex justify-between items-center text-left ${
					isOpen ? 'shadow-xl' : ''
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="text-mv-black text-[20px] leading-normal font-normal">
					{selectedValue}
				</div>
				<KeyboardArrowDownIcon className="text-mv-black w-[30px] h-[24px]" />
			</button>

			{isOpen && (
				<div
					className={`w-[${width}] h-auto px-[20px] pt-[1px] pb-[21px] bg-mv-white border-light-grey border border-solid rounded-[10px] flex flex-col shadow-xl`}
				>
					{items.map((value) => (
						<button
							type="button"
							key={value}
							className="whitespace-nowrap text-mv-black text-[20px] leading-normal font-normal text-left mt-[20px]"
							role="menuitem"
							onClick={() => handleValueChange(value)}
						>
							{value}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
