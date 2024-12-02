import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        download: 'download 10s linear infinite',
        'loop-scroll': 'loop-scroll 13s linear infinite',
        'loop-scrollsm': 'loop-scrollsm 10s linear infinite',
      },
      keyframes: {
        download: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-990px)' },
        },
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-895px)' },
        },
        'loop-scrollsm': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-678px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        yellowQuik: '#FFCF25',
        blueQuik: '#263AFF',
      },
      flex: {
        3: '0 0 calc(33.33% - 12px)',
        2: '0 0 calc(50% - 12px)',
      },
    },
  },
  plugins: [],
};
export default config;
