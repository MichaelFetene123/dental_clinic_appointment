import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			ca_pattern: 'url("/images/gggrain.svg")'
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			},
  			classic_yellow: '#dd9639',
  			classic_blue: '#104B82',
  			sidebar: {
  				DEFAULT: 'var(--sidebar)',
  				foreground: 'var(--sidebar-foreground)',
  				primary: 'var(--sidebar-primary)',
  				'primary-foreground': 'var(--sidebar-primary-foreground)',
  				accent: 'var(--sidebar-accent)',
  				'accent-foreground': 'var(--sidebar-accent-foreground)',
  				border: 'var(--sidebar-border)',
  				ring: 'var(--sidebar-ring)'
  			},
  			'primary-button-bg': '#407C82',
  			'primary-button-hover-bg': '#366A70',
  			'secondary-button-bg': '#1E6091',
  			'secondary-button-hover-bg': '#164A71',
  			'outline-button-border': '#407C82',
  			'disabled-button-bg': '#BFD5D9',
  			'button-text-color': '#FFFFFF',
  			'category-1': '#407C82',
  			'category-2': '#1E6091',
  			'category-3': '#89C2D9',
  			'category-4': '#FFC857',
  			'category-5': '#E09F3E',
  			'category-6': '#D72638',
  			'background-color': '#F0F8FF',
  			'card-bg-color': '#E3F2FD',
  			'primary-text-color': '#1B1B1B',
  			'secondary-text-color': '#5A7184',
  			'sidebar-background': '#BFD5D9',
  			'sidebar-foreground': '240 5.3% 26.1%',
  			'sidebar-border': '220 13% 91%',
  			'chart-1': 'hsl(221.2, 83.2%, 53.3%)',
  			'chart-2': 'hsl(212, 95%, 68%)',
  			'chart-3': 'hsl(216, 92%, 60%)',
  			'chart-4': 'hsl(210, 98%, 78%)',
  			'chart-5': 'hsl(212, 97%, 87%)'
  		},
  		fontFamily: {
  			heading: [
  				'var(--font-instrument-serif)',
  				'serif'
  			],
  			'instrument-serif': [
  				'var(--font-instrument-serif)',
  				'serif'
  			],
  			subheading: [
  				'var(--font-inter)',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-lato)',
  				'Lato',
  				'sans-serif'
  			],
  			lato: [
  				'var(--font-lato)',
  				'Lato',
  				'sans-serif'
  			],
  			'red-hat-text': [
  				'var(--font-red-hat-text)',
  				'Red Hat Text',
  				'sans-serif'
  			],
  			roboto: [
  				'var(--font-roboto)',
  				'Roboto',
  				'sans-serif'
  			],
  			boruna: [
  				'Boruna',
  				'serif'
  			],
  			vintage: [
  				'VintageMohai',
  				'serif'
  			],
  			lucida: [
  				'Lucida Sans',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
