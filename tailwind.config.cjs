/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme');

module.exports = {
    darkMode: 'class',
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/**/*.{js,ts,jsx,tsx}',
        './public/**/*.html',
    ],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'night',
    },
    theme: {
        extend: {
            colors: {
                ...defaultColors,
                paper: '#202A37',
            },
        },
    },
    plugins: [require('daisyui')],
};
