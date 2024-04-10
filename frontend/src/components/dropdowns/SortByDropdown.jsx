import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SortByDropdown({ title, items, onValueChange }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(title);
	const dropdownRef = useRef(null);

	const handleValueChange = (newValue) => {
		setSelectedValue(newValue);
		setIsOpen(false);
		onValueChange(newValue);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative flex flex-col min-w-[194px]" ref={dropdownRef}>
			<button
				type="button"
				className={`whitespace-nowrap py-[15px] px-[23px] rounded-[10px] bg-light-grey flex justify-between items-center text-left gap-x-[30px] ${
					isOpen ? 'shadow-xl' : ''
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-mv-black text-base leading-normal font-normal overflow-ellipsis w-[87px]">
					{selectedValue}
				</span>
				<KeyboardArrowDownIcon
					className="text-mv-black"
					sx={{ fontSize: 24 }}
				/>
			</button>

			{isOpen && (
				<div
					className="absolute z-10 mt-[60px] py-5 px-5 bg-mv-white border border-mv-grey border-solid rounded-[10px] w-full"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1"
				>
					{items.map((value, index) => (
						<button
							type="button"
							key={value}
							className="text-left w-full text-base text-mv-black font-normal overflow-ellipsis"
							style={{ marginTop: index === 0 ? 0 : 20 }}
							role="menuitem"
							tabIndex="-1"
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
