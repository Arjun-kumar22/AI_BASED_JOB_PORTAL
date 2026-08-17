import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        titan: {
          navy: {
            DEFAULT: '#0b1c30',
            dark: '#071a30',
            deep: '#091728',
            mid: '#11253e',
            royal: '#1d3989',
            light: '#254778',
            accent: '#1034a6',
          },
          gold: {
            DEFAULT: '#fbbf24',
            primary: '#e6b325',
            light: '#ffdea8',
            dark: '#8c6e36',
            amber: '#f59e0b',
            accent: '#f4d681',
          },
          bg: {
            light: '#f4f6fa',
            surface: '#eff4ff',
            card: '#ffffff',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-in-up': 'fadeInUpSmooth 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'float-gentle': 'floatGentle 4.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 5.5s ease-in-out infinite',
        'glow-orb-1': 'floatGlowOrb 10s ease-in-out infinite',
        'glow-orb-2': 'floatGlowOrbReverse 12s ease-in-out infinite',
        'shimmer': 'shimmerPulse 2s infinite linear',
        'border-beam': 'motionBorderBeamRotate 3.5s linear infinite',
        'pulse-glow': 'pulseGlowRing 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUpSmooth: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(7px)' },
        },
        floatGlowOrb: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(25px, -20px) scale(1.15)' },
        },
        floatGlowOrbReverse: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-25px, 20px) scale(1.1)' },
        },
        shimmerPulse: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        motionBorderBeamRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlowRing: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(251, 191, 36, 0.2), 0 10px 30px rgba(0, 0, 0, 0.25)' },
          '50%': { boxShadow: '0 0 28px rgba(251, 191, 36, 0.45), 0 15px 40px rgba(29, 57, 137, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
