import React from 'react';

export default function RegisterEarlyButton() {
	return (
		<button
			type="button"
			className="bg-[#ECECEC] rounded-[10px] inline-flex px-[24px] py-[10px] flex-start shrink-0 items-center justify-center h-[60px] hover:cursor-default"
		>
			<div className="text-dark-grey text-base font-semibold italic">
				Awaiting Deposit Approval
			</div>
		</button>
	);
}
