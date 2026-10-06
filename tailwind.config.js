/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0C0A09",
        card: "#1C1917",
        border: "rgba(231,213,183,0.08)",
        stone: { 100: "#F5F5F4", 200: "#E7E5E4", 300: "#D6D3D1", 400: "#A8A29E" },
        amber: { glow: "rgba(245,158,11,0.08)", icon: "#FDBA74" },
        ivory: "#EDE8E0"
      }
    }
  },
  plugins: [],
}
