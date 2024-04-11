import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FilterDropdown({ title, items, onValueChange }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(title);
	const dropdownRef = useRef(null);

	const itemsWithAll = [
		{ id: 'all', name: 'All' },
		...items.filter((item) => item.name !== 'All'),
	];

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
		<div className="relative flex flex-col gap-1.5" ref={dropdownRef}>
			<button
				type="button"
				className={`whitespace-nowrap py-[9px] pl-[18px] pr-[12px] rounded-[5px] bg-mv-white flex justify-between items-center text-left ${
					isOpen ? 'shadow-xl' : ''
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-mv-black text-base leading-normal font-normal overflow-ellipsis truncate">
					{selectedValue?.name || 'All'}
				</span>
				<KeyboardArrowDownIcon
					className="text-mv-black"
					sx={{ fontSize: 24 }}
				/>
			</button>

			{isOpen && (
				<div
					className="max-h-[200px] overflow-y-auto overflow-x-hidden absolute z-10 mt-[45px] py-5 px-5 bg-mv-white border border-mv-grey border-solid rounded-[5px] w-full"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1"
				>
					{itemsWithAll.map((value, index) => (
						<button
							type="button"
							key={value?.id || index}
							className="text-left w-full text-base text-mv-black font-normal overflow-ellipsis hover:bg-mv-lightgrey"
							style={{ marginTop: index === 0 ? 0 : '10px' }}
							role="menuitem"
							tabIndex="-1"
							onClick={() => handleValueChange(value)}
						>
							{value?.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
