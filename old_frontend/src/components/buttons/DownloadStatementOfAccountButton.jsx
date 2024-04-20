import React from 'react';

export default function DownloadStatementOfAccountButton({ onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="px-[49px] py-[10px] rounded-[10px] border-2 border-solid border-mv-green items-center justify-center text-mv-green text-sm font-normal"
		>
			Download Statement of Account
		</button>
	);
}
