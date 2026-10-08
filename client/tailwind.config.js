/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060911',
          900: '#0a0e1a',
          850: '#0d1322',
          800: '#111829',
          750: '#161e33',
          700: '#1c2640',
          600: '#2a3858',
          500: '#3d4f78',
          400: '#5a70a0',
          300: '#8599c2',
          200: '#b3c0dc',
          100: '#dde4f3'
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#6366f1',
          purple: '#a855f7',
          pink: '#ec4899',
          cyanBright: '#06f0ff',
          purpleBright: '#c084fc',
          pinkBright: '#f472b6'
        }
      },
      backgroundImage: {
        'grad-logo': 'linear-gradient(135deg, #22d3ee 0%, #6366f1 45%, #a855f7 75%, #ec4899 100%)',
        'grad-text': 'linear-gradient(90deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
        'grad-soft': 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(168,85,247,0.12) 50%, rgba(236,72,153,0.10) 100%)',
        'grad-panel': 'linear-gradient(180deg, #111829 0%, #0d1322 100%)',
        'radial-glow': 'radial-gradient(ellipse at top, rgba(34,211,238,0.15), transparent 50%), radial-gradient(ellipse at bottom right, rgba(168,85,247,0.15), transparent 50%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5)) drop-shadow(0 0 16px rgba(168,85,247,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(34,211,238,0.8)) drop-shadow(0 0 32px rgba(168,85,247,0.6))' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace'
        ]
      }
    },
  },
  plugins: [],
}
