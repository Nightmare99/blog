/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // System-map signal palette — shared with the main portfolio site
        void: {
          DEFAULT: "#0A0D12",
          deep: "#05070A",
          raised: "#10141C",
          line: "#1C2230",
        },
        signal: {
          teal: "#5EEAD4",
          blue: "#7C9CFF",
          amber: "#FFB454",
          rose: "#FF6B81",
          violet: "#B9A2FF",
        },
        ink: {
          DEFAULT: "#E7ECF3",
          muted: "#8B93A7",
          faint: "#586178",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.15 },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "blink": "blink 1.6s step-start infinite",
        "scan": "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
}
