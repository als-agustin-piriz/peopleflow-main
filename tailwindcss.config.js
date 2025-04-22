/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './client/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                regola: ['"Regola Neue"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
