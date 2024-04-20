/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000000',
			'mv-green': '#236F41',
			'mv-grey': '#E9EBEA',
			'mv-cream': '#FFFAFB',
			'mv-white': '#FFFFFF',
			'mv-black': '#4B4B4B',
			'mv-red': '#B63342',
			'dark-grey': '#7A7A7A',
			'light-grey': '#F5F5F5',
			'progress-bar': '#EEEDED',
			'dark-green': '#144126',
			'button-dark-grey': '#575757',
			'button-disabled': '#D1D1D1',
			'border-dark-grey': '#B7B7B7',
			'onboarding-placeholder': '#D2D2D2',
			'icon-grey': '#7B7B7B',
			'not-found-header': '#1E1E1E',
			'divider-grey': 'rgba(0, 0, 0, 0.3)',
			'mid-grey': '#A9A9A9',
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			boxShadow: {
				buttonShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.10)',
				navBarShadow: '0px 2px 4px 0px rgba(22, 22, 22, 0.10)',
				searchBarShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.10)',
				auctionCardShadow: '10px 10px 50px 0px rgba(0, 0, 0, 0.25)',
				defaultAuctionCardShadow: '10px 10px 25px 0px rgba(0, 0, 0, 0.20)',
				upcomingAuctionCountdownShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
				filterBoxShadow: 'drop-shadow(0px 2px 4px rgba(22, 22, 22, 0.10))',
				notificationModalShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
			},
			fontSize: {
				xxs: '0.5rem',
			},
			backdropFilter: {
				none: 'none',
				blur: 'blur(2px)',
			},
		},
	},
	plugins: [
		// eslint-disable-next-line import/no-extraneous-dependencies, global-require
		require('tailwindcss-filters'),
	],
};
