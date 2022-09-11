/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme');

module.exports = {
    darkMode: 'class',
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/**/*.{js,ts,jsx,tsx}',
        './public/**/*.html',
    ],
    theme: {
        extend: {
            colors: {
                ...defaultColors,
                paper: '#202A37',
            },
        },
    },
    plugins: [require('@headlessui/react')],
};
