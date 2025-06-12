
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* Orange Palette - Paleta principal laranja */
				orange: {
					50: 'rgb(255 247 237)',    /* #fff7ed */
					100: 'rgb(255 237 213)',   /* #ffedd5 */
					200: 'rgb(254 215 170)',   /* #fed7aa */
					300: 'rgb(253 186 116)',   /* #fdba74 */
					400: 'rgb(251 146 60)',    /* #fb923c */
					500: 'rgb(249 115 22)',    /* #f97316 */
					600: 'rgb(234 88 12)',     /* #ea580c */
					700: 'rgb(194 65 12)',     /* #c2410c */
					800: 'rgb(154 52 18)',     /* #9a3412 */
					900: 'rgb(124 45 18)',     /* #7c2d12 */
					950: 'rgb(67 20 7)',       /* #431407 */
				},
				/* Neutral Palette - Cores neutras quentes */
				stone: {
					50: 'rgb(250 250 249)',    /* #fafaf9 */
					100: 'rgb(245 245 244)',   /* #f5f5f4 */
					200: 'rgb(231 229 228)',   /* #e7e5e4 */
					300: 'rgb(214 211 209)',   /* #d6d3d1 */
					400: 'rgb(168 162 158)',   /* #a8a29e */
					500: 'rgb(120 113 108)',   /* #78716c */
					600: 'rgb(87 83 78)',      /* #57534e */
					700: 'rgb(68 64 60)',      /* #44403c */
					800: 'rgb(41 37 36)',      /* #292524 */
					900: 'rgb(28 25 23)',      /* #1c1917 */
					950: 'rgb(12 10 9)',       /* #0c0a09 */
				},
				/* Design System Colors */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'sans-serif'
				],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'slide-in': {
					"0%": {
						transform: "translateX(-100%)"
					},
					"100%": {
						transform: "translateX(0)"
					}
				},
				'pulse-orange': {
					"0%, 100%": {
						boxShadow: "0 0 0 0 rgba(249, 115, 22, 0.7)"
					},
					"70%": {
						boxShadow: "0 0 0 10px rgba(249, 115, 22, 0)"
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pulse-orange': 'pulse-orange 2s infinite'
			},
			boxShadow: {
				'orange-glow': '0 0 20px rgba(249, 115, 22, 0.3)',
				'orange-glow-lg': '0 0 40px rgba(249, 115, 22, 0.2)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
