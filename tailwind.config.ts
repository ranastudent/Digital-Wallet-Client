import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(1.1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ping-slow': {
          '0%': { transform: 'scale(0.9)', opacity: 0.7 },
          '50%': { transform: 'scale(1.1)', opacity: 0.4 },
          '100%': { transform: 'scale(0.9)', opacity: 0.7 },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'ping-slow': 'ping-slow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
