import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", 
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#020617",
                primary: "#38bdf8",
                secondary: "#0f172a",
                accent: "#22d3ee",
            },
        },
    },
    plugins: [],
};
export default config;
