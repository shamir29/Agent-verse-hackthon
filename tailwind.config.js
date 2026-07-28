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
        dark: {
          900: '#050914',
          800: '#0b1226',
          700: '#111d3d',
          600: '#1a2b54',
          500: '#253b6e',
        },
        aqua: {
          50: '#ecfeff',
          100: '#cff4fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        neon: {
          blue: '#00d2ff',
          cyan: '#00f2fe',
          emerald: '#10b981',
          amber: '#f59e0b',
          red: '#ff3b30',
          purple: '#9d4edd',
        }
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 210, 255, 0.4)',
        'neon-cyan': '0 0 15px rgba(0, 242, 254, 0.4)',
        'neon-red': '0 0 15px rgba(255, 59, 48, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'flow-water': 'flowWater 2s linear infinite',
        'rain-drop': 'rainDrop 1s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(0, 210, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 242, 254, 0.8), 0 0 30px rgba(0, 210, 255, 0.4)' },
        },
        flowWater: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      }
    },
  },
  plugins: [],
}
