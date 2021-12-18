const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./app/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
