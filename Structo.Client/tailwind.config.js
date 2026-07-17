/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: '#070A10',   // Pure obsidian deep background
          main: '#0B0F19',   // Premium corporate slate background
          light: '#111827',  // Elevated secondary background
        },
        surface: {
          card: '#1e293b',   // Professional dark slate surface card
          border: '#334155', // High-contrast clean border (slate-700)
          hover: '#334155',  // Subtle focus/hover surface
        },
        brand: {
          primary: '#1d4ed8',     // Authoritative Royal Navy / Deep Cobalt
          primaryHover: '#2563eb',// Lighter hover state cobalt for visual glow
          accent: '#10b981',      // Stable Emerald Green for financial growth
          accentHover: '#059669', // Sophisticated Sage/Medium Emerald
        },
        status: {
          success: '#10b981',
          danger: '#be123c',      // Sophisticated B2B burgundy/crimson
          warning: '#d97706',     // Stable dark amber
          info: '#2563eb',        // Quiet corporate info blue
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'Inter', 'sans-serif'],
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}