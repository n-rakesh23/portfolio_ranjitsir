import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '20px', md: '32px' },
      screens: { xl: '1200px' },
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-contrast': 'var(--primary-contrast)',
        'primary-strong': 'var(--primary-strong)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warm: 'var(--warm)',
        error: 'var(--error)',
        caution: 'var(--caution)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
      boxShadow: {
        theme: 'var(--shadow)',
        'theme-hover': 'var(--shadow-hover)',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        theme: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
