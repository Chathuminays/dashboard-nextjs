import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '425px',
      'md': '768px',
      'lg': '800px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    extend: {
      colors: {
        purple: 'hsla(277, 84%, 17%, 1)',
        purple_light: 'hsla(283, 16%, 92%, 0.1)',
        background: 'hsla(0, 0%, 98%, 1)',
        stroke: 'hsla(217, 16%, 84%, 1)',
        text_grey: 'hsla(0, 0%, 46%, 1)',
        text_pink: 'hsla(325, 100%, 37%, 1)',
        bg_grey: 'hsla(0, 0%, 95%, 1)',
        text_yellow: 'hsla(45, 86%, 62%, 1)',
        text_blue: 'hsla(214, 84%, 56%, 1)',
        text_red: 'hsla(0, 79%, 63%, 1)',
        bg_yellow: 'hsla(45, 86%, 62%, 0.1)',
        bg_blue: 'hsla(214, 84%, 56%, 0.1)',
        bg_red: 'hsla(0, 79%, 63%, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
