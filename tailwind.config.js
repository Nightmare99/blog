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
        sans: ['Victor Mono', 'ui-monospace', 'monospace'],
        mono: ['Victor Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Neo-brutalist system-map palette — shared with the main portfolio site
        void: {
          DEFAULT: "#0E0E10",
          deep: "#08080A",
          raised: "#1C1C1F",
          line: "#F5F1E8",
        },
        signal: {
          // Chrome/primary
          lime: "#CCFF00",
          // Category + accent set
          cyan: "#00F0FF",
          pink: "#FF2E9B",
          amber: "#FFB454",
          violet: "#B9A2FF",
        },
        ink: {
          DEFAULT: "#F5F1E8",
          muted: "#B5AFA6",
          faint: "#77726B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      boxShadow: {
        brutal: "6px 6px 0 0 #F5F1E8",
        "brutal-sm": "4px 4px 0 0 #F5F1E8",
        "brutal-lg": "8px 8px 0 0 #F5F1E8",
        "brutal-lime": "6px 6px 0 0 #CCFF00",
        "brutal-press": "2px 2px 0 0 #F5F1E8",
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
