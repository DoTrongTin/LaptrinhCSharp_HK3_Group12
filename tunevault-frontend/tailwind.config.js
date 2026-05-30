/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tv-black":   "#121212",
        "tv-surface": "#1e1e1e",
        "tv-card":    "#282828",
        "tv-hover":   "#333333",
        "tv-green":   "#1db954",
        "tv-text":    "#ffffff",
        "tv-muted":   "#a7a7a7",
      },
    },
  },
  plugins: [],
}
