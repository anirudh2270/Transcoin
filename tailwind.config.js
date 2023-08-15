/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        body: 'var(--body)',
        primary: 'var(--primary)',
        body_secondary: 'var(--body_secondary)',
        primary_light: 'var(--primary_light)',
        secondary: 'var(--secondary)',
        text_primary: 'var(--text_primary)',
        text_secondary: 'var(--text_secondary)',
        border: 'var(--border)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        nav_link: 'var(--nav_link)',
        dropdown: 'var(--dropdown)',
        hover: 'var(--hover)',
        skeleton: 'var(--skeleton)',
        skeleton_secondary: 'var(--skeleton_secondary)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
