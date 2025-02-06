/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Onest", "serif"],
        header: ["Oswald", "serif"],
        japanese: ["Kosugi", "serif"],
      },
      colors: {
        white: "#FAF9F6",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-outline": {
          color: "#faf9f6 ",
          backgroundColor: "#faf9f6 ",
          textShadow:
            "-1px -1px 0 #262626, 1px -1px 0 #262626, -1px 1px 0 #262626, 1px 1px 0 #262626",
        },
      };

      addUtilities(newUtilities);
    },
    require("@tailwindcss/typography"),
  ],
};
