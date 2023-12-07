/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        snow: '#fff5f4',
        white: '#fff',
        black: '#000',
        lightgray: {
          '100': '#d5d5d5',
          '200': '#d0d0d0',
        },
        mediumvioletred: '#d4469b',
        'button-color': '#7054ff',
        gray: '#858585',
        limegreen: '#08a718',
        lavenderblush: '#ffddf1',
      },
      spacing: {},
      fontFamily: {
        inter: 'Inter',
        raleway: 'Raleway',
      },
      borderRadius: {
        '81xl': '100px',
      },
    },
    fontSize: {
      'mid-8': '17.8px',
      base: '16px',
      xl: '20px',
      '9xl': '28px',
      '5xl-1': '24.1px',
      '47xl-4': '66.4px',
      inherit: 'inherit',
    },
  },
  corePlugins: {
    preflight: false,
  },
};
export default config;
