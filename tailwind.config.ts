import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette
        primary: {
          DEFAULT: '#D4735E',    // Terracotta
          light: '#F2D0C8',
          dark: '#B85A48',
        },
        secondary: {
          DEFAULT: '#8B9D83',    // Sage Green
          light: '#D4DDCF',
          dark: '#6B7D63',
        },
        accent: {
          DEFAULT: '#E8C5A5',    // Warm Beige
          light: '#F5DEC5',
          dark: '#D4A885',
        },
        background: '#FFF9F5',   // Soft Cream
        text: {
          DEFAULT: '#3E2723',    // Rich Brown
          muted: '#7A5C58',
          light: '#8B7B78',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Lato', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
    },
  },
  plugins: [],
}

export default config
