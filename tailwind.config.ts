import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      body: ['var(--font-body)'],
      title: ['var(--font-title)'],
    },
    letterSpacing: {
      '72': '0.072em',
      '36': '0.036em',
    },
    borderRadius: {
      '12': '0.75rem',
      '16': '1rem',
      '24': '1.5rem',
      '32': '2rem',
      '40': '2.5rem',
      '48': '3rem',
      '56': '3.5rem',
      '64': '4rem',
      full: '9999px',
    },
    fontSize: {
      '12': [
        '0.75rem',
        {
          lineHeight: '1.5',
        },
      ],
      '14': [
        '0.875rem',
        {
          lineHeight: '1.4285',
        },
      ],
      '16': [
        '1rem',
        {
          lineHeight: '1.5',
        },
      ],
      '18': [
        '1.125rem',
        {
          lineHeight: '1.11',
        },
      ],
      '20': [
        '1.25rem',
        {
          lineHeight: '1.5',
        },
      ],
      '24': [
        '1.5rem',
        {
          lineHeight: '1.3333',
        },
      ],
      '32': [
        '2rem',
        {
          lineHeight: '1.266',
        },
      ],
      '36': [
        '2.25rem',
        {
          lineHeight: '1.111',
        },
      ],
      '40': [
        '2.5rem',
        {
          lineHeight: '1.2',
        },
      ],
      '56': [
        '3.5rem',
        {
          lineHeight: '1.0714',
        },
      ],
      '64': [
        '4rem',
        {
          lineHeight: '1.0625',
        },
      ],
      '80': [
        '5rem',
        {
          lineHeight: '1',
        },
      ],
      '90': [
        '5.625rem',
        {
          lineHeight: '1',
        },
      ],
      '100': [
        '6.25rem',
        {
          lineHeight: '1.2',
        },
      ],
      '110': [
        '6.875rem',
        {
          lineHeight: '1.0363',
        },
      ],
    },
    extend: {
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      colors: {
        bg: {
          sf: 'var(--bg-sf)',
          primary: 'var(--bg-primary)',
          dark: 'var(--bg-dark)',
          light: 'var(--bg-light)',
        },
        txt: {
          light: {
            white: 'var(--text-light-white)',
            primary: 'var(--text-light-primary)',
            secondary: 'var(--text-light-secondary)',
            label: 'var(--text-light-label)',
          },

          dark: {
            white: 'var(--text-dark-white)',
            primary: 'var(--text-dark-primary)',
            secondary: 'var(--text-dark-secondary)',
            label: 'var(--text-dark-label)',
            tertiary: 'var(--text-dark-tertiary)',
          },
        },
        bd: {
          primary: 'var(--text-light-primary)',
          secondary: 'var(--text-light-secondary)',
          'dark-strong': 'var(--bd-dark-strong)',
          'dark-soft': 'var(--bd-dark-soft)',
        },
      },
    },
    screens: {
      xs: '0px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1600px',
      xxl: '1920px',
      mobile: {
        max: '767px',
      },
      tablet: {
        max: '991px',
      },
      desktop: {
        min: '992px',
      },
      'xl-desktop': {
        min: '1200px',
      },
      '2xl-desktop': {
        min: '1400px',
      },
      'height-sm': {
        raw: '(max-height: 320px)',
      },
      'height-md': {
        raw: '(max-height: 480px)',
      },
      'height-lg': {
        raw: '(max-height: 640px)',
      },
      'height-xl': {
        raw: '(max-height: 800px)',
      },
    },
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addVariant }: any) => {
      addVariant('starting', '@starting-style');
    },
  ],
};
export default config;
