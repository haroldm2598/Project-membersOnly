/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			bgwhite: '#ffffff',
			bgMain: '#219EBC',
			bgLight: '#F8F8F8'
		},
		extend: {}
	},
	plugins: [require('daisyui')]
};
