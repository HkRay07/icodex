// TailwindCSS Configuration for iCodeX Academy
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'] 
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        },
        accent: {
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        }
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(6,182,212,0.15), 0 10px 30px rgba(6,182,212,0.12)',
        'glow-strong': '0 0 0 2px rgba(6,182,212,0.25), 0 10px 30px rgba(6,182,212,0.18)'
      }
    }
  }
};
