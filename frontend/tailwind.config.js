/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			'mv-green': '#236F41',
			'mv-grey': '#E9EBEA',
			'mv-cream': '#FFFAFB',
			'mv-white': '#FFFFFF',
			'mv-black': '#4B4B4B',
			'dark-grey': '#7A7A7A',
			'light-grey': '#F5F5F5',
			'progress-bar': '#EEEDED',
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			boxShadow: {
				buttonShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.10)',
			},
		},
	},
	plugins: [],
};
